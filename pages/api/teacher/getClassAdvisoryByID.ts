import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { section_id, page, take, search } = req.body;
  let studentList = [{}];
  let studentCount = 0;
  try {
    const classSection = await prisma.class_sections.findFirst({
      where: {
        id: section_id
      },
      include: {
        sections: true,
        school_year: true,
      }
    });

    if(classSection){
      if(search === ""){
        studentList = await prisma.student_enrollment.findMany({
          take:take,
          skip: (page-1) * take,
          where: {
            class_section_fk: classSection.id
          },
          select: {
            student: true
          }
        })

        studentCount = await prisma.student_enrollment.count({
          where: {
            class_section_fk: classSection.id
          }
        })
      }else{
        studentList = await prisma.student_enrollment.findMany({
          take:take,
          skip: (page-1) * take,
          where: {
            class_section_fk: classSection.id,
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
            student: true
          }
        })

        studentCount = await prisma.student_enrollment.count({
          where: {
            class_section_fk: classSection.id,
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
    return res.status(200).json({section: classSection, students: studentList, count: studentCount});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
