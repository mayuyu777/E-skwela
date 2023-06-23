import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { school_id, page, take, search } = req.body;

  try {
    let result = [{}];
    let count = 0;

    if(search === ""){
      result = await prisma.class_sections.findMany({
        take:take,
        skip: (page-1) * take,
        where: {
          faculty: {
            school_id: school_id
          }
        },
        include: {
          school_year: true,
          sections: true,
          _count: {
            select: {
              student_enrollment: true
            }
          }
        }
      });

      count = await prisma.class_sections.count({
        where: {
          faculty: {
            school_id: school_id
          }
        }
      })
    }else{
      result = await prisma.class_sections.findMany({
        take:take,
        skip: (page-1) * take,
        where: {
          OR: [
            {
              school_year: {
                start: {
                  equals: Number(search) || 0
                }
              }
            },
            {
              sections: {
                name: {
                  contains: search
                }
              }
            },
            {
              sections: {
                academic_level: {
                  equals: Number(search) || 0
                }
              }
            }
          ]
        },
        include: {
          school_year: true,
          sections: true,
          _count: {
            select: {
              student_enrollment: true
            }
          }
        }
      });

      count = await prisma.class_sections.count({
        where: {
          OR: [
            {
              school_year: {
                start: {
                  equals: Number(search) || 0
                }
              }
            },
            {
              sections: {
                name: {
                  contains: search
                }
              }
            },
            {
              sections: {
                academic_level: {
                  equals: Number(search) || 0
                }
              }
            }
          ]
        }
      });;
    }

    return res.status(200).json({sections: result, count: count});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
