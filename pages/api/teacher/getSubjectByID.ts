import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subject_id, page, take, search } = req.body;
  let studentList = [{}];
  let studentCount = 0;
  try {
    const subject = await prisma.class_subjects.findFirst({
      where: {
        id: subject_id
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

    if(subject){
      if(search === ""){
        studentList = await prisma.student_enrollment.findMany({
          take:take,
          skip: (page-1) * take,
          where: {
            class_section_fk: subject.class_section_fk
          },
          select: {
            student: {
              include: {
                grades: {
                  where: {
                    class_subject_fk: subject_id
                  }
                }
              }
            }
          }
        })

        studentCount = await prisma.student_enrollment.count({
          where: {
            class_section_fk: subject.class_section_fk
          }
        })
      }else{
        studentList = await prisma.student_enrollment.findMany({
          take:take,
          skip: (page-1) * take,
          where: {
            class_section_fk: subject.class_section_fk,
            OR: [
              {
                student: {
                 OR: [
                  {
                    school_id: {
                      contains: search
                    }
                  },
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
                  {
                    middle_name: {
                      contains: search
                    }
                  },
                  {
                    suffix: {
                      contains: search
                    }
                  }
                 ]
                },
              }
            ]
          },
          select: {
            student: {
              include: {
                grades: {
                  where: {
                    class_subject_fk: subject_id
                  }
                }
              }
            }
          }
        })

        studentCount = await prisma.student_enrollment.count({
          where: {
            class_section_fk: subject.class_section_fk,
            OR: [
              {
                student: {
                 OR: [
                  {
                    school_id: {
                      contains: search
                    }
                  },
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
                  {
                    middle_name: {
                      contains: search
                    }
                  },
                  {
                    suffix: {
                      contains: search
                    }
                  }
                 ]
                },
              }
            ]
          }
        })
      }
    }
    return res.status(200).json({subject: subject, students: studentList, count: studentCount});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
