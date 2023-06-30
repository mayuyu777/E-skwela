import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import { announcement_type } from "@/constants/announcement_type";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { school_id, isMyAnnoucements, page, take } = req.body
  try {

    if(!isMyAnnoucements){
      const result = await prisma.announcements.findMany({
        take:take,
        skip: (page-1) * take,
        orderBy: {
          updated_at: "desc"
        },
        where: {
            OR: [
              {
                type: announcement_type.everyone
              },
              {
                type: announcement_type.teacher
              }
            ]
        },
        include: {
          faculty: true
        }
      });

      const count = await prisma.announcements.count({
        where: {
          OR: [
            {
              type: announcement_type.everyone
            },
            {
              type: announcement_type.teacher
            }
          ]
      }
      })

      return res.status(200).json({announcements: result, count: count});
    }else{
      const result = await prisma.announcements.findMany({
        take:take,
        skip: (page-1) * take,
        orderBy: {
          updated_at: "desc"
        },
        where: {
            faculty: {
              school_id: school_id
            }
        },
        include: {
          faculty: true
        }
      });

      const count = await prisma.announcements.count({
        where: {
          faculty: {
            school_id: school_id
          }
        },
      })

      return res.status(200).json({announcements: result, count: count});
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
