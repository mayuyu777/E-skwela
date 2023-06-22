import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import { announcement_type } from "@/constants/announcement_type";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { school_id, isMyAnnoucements } = req.body
  try {

    if(!isMyAnnoucements){
      const result = await prisma.announcements.findMany({
        orderBy: {
          created_at: "desc"
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

      return res.status(200).json(result);
    }else{
      const result = await prisma.announcements.findMany({
        orderBy: {
          created_at: "desc"
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

      return res.status(200).json(result);
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
