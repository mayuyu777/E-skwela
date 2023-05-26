import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { section_name } = req.query;
  try {
    // const section = await prisma.sections.findFirst({
    //   where: {
    //     section_name: section_name?.toString(),
    //   },
    // });

    // const sectionAssigned = await prisma.section_assignment.findFirst({
    //   where: {
    //     section_id: section?.section_id,
    //   },
    // });

    // const subjectAssigned = await prisma.subject_assignment.findFirst({
    //   where: {
    //     section_assigned_id: sectionAssigned?.section_id,
    //   },
    // });

    // const result = await prisma.grades.findMany({
    //   include: {
    //     students: true,
    //   },
    //   where: {
    //     subject_assignment_id: subjectAssigned?.subject_assignment_id,
    //   },
    // });

    const result2 = await prisma.grades.findMany({
      include: {
        students: true,
        subject_assignment:{
          include:{
            subjects:true
          }
        }
      },
      where: {
        subject_assignment: {
          section_assignment: {
            sections: {
              section_name: section_name?.toString(),
            },
          },
        },
      },
    });

    return res.status(200).json(result2);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
