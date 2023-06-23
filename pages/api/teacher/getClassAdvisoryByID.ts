import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { section_id } = req.query;
  try {
    const classSection = await prisma.class_sections.findFirst({
      where: {
        id: section_id
      },
      include: {
        sections: true,
      }
    });

    const students = await prisma.student.findMany({
      select: {
        student_enrollment: {
          where: {
            class_section_fk: section_id
          },
          select: {
            student: true
          }
        }
      }
    })

    return res.status(200).json({section: classSection, students: students});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
