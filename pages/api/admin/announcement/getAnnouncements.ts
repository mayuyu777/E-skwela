import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {  page, take, search } = req.body;
  let result = {};
  let count = 0;
  try {

    if(search){
      result = await prisma.announcements.findMany({
        take:take,
        skip: (page-1) * take,
        orderBy: {
          updated_at: "desc"
        },
        where: {
          OR: [
            {
              faculty: {
                OR: [
                  {
                    first_name: {
                      contains: search
                    }
                  },
                  {
                    last_name: {
                      contains: search
                    }
                  },
                ]
              }
            },
            {
              title: {
                contains: search
              }
            },
            {
              content: {
                contains: search
              }
            }
          ]
        },
        include: {
          faculty: true
        }
      });

      count = await prisma.announcements.count({
        where: {
          OR: [
            {
              faculty: {
                OR: [
                  {
                    first_name: {
                      contains: search
                    }
                  },
                  {
                    last_name: {
                      contains: search
                    }
                  },
                ]
              }
            },
            {
              title: {
                contains: search
              }
            },
            {
              content: {
                contains: search
              }
            }
          ]
        },
      })
    }else{
      result = await prisma.announcements.findMany({
        take:take,
        skip: (page-1) * take,
        orderBy: {
          updated_at: "desc"
        },
        include: {
          faculty: true
        }
      });

      count = await prisma.announcements.count({})

    }

    return res.status(200).json({announcements: result, count: count});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
