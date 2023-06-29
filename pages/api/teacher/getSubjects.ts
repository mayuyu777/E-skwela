import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { school_id, page, take, search } = req.body;

  try {
    let result = [{}];
    let count = 0;

    if(search === ""){
      result = await prisma.class_subjects.findMany({
        take:take,
        skip: (page-1) * take,
        orderBy: {
          class_sections: {
            school_year: {
              start: 'desc'
            }
          }
        },
        where: {
          faculty: {
            school_id: school_id
          }
        },
        include: {
          subjects: true,
          class_sections: {
            select: {
              sections: true,
              school_year: true
            }
          }
        }
      });

      count = await prisma.class_subjects.count({
        where: {
          faculty: {
            school_id: school_id
          }
        }
      })
    }else{
      result = await prisma.class_subjects.findMany({
        take:take,
        skip: (page-1) * take,
        orderBy: {
          class_sections: {
            school_year: {
              start: 'desc'
            }
          }
        },
        where: {
          faculty: {
            school_id: school_id
          },
          OR: [
            {
              subjects: {
                OR: [
                  {
                    name: {
                      contains: search
                    }
                  },
                  {
                    academic_level: {
                      equals: Number(search) || 0
                    }
                  }
                ]
              },
            },
            {
              class_sections: {
                OR: [
                  {
                    sections: {
                      name: {
                        contains: search
                      }
                    },
                  },
                  {
                    school_year: {
                      start: {
                        equals: Number(search) || 0
                      }
                    }
                  }
                ]
              }
            }
          ]
        },
        include: {
          subjects: true,
          class_sections: {
            select: {
              sections: true,
              school_year: true
            }
          }
        }
      });

      count = await prisma.class_subjects.count({
        where: {
          faculty: {
            school_id: school_id
          },
          OR: [
            {
              subjects: {
                OR: [
                  {
                    name: {
                      contains: search
                    }
                  },
                  {
                    academic_level: {
                      equals: Number(search) || 0
                    }
                  }
                ]
              },
            },
            {
              class_sections: {
                OR: [
                  {
                    sections: {
                      name: {
                        contains: search
                      }
                    },
                  },
                  {
                    school_year: {
                      start: {
                        equals: Number(search) || 0
                      }
                    }
                  }
                ]
              }
            }
          ]
        },
      });;
    }

    return res.status(200).json({subjects: result, count: count});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
