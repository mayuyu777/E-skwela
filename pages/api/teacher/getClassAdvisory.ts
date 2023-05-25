import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { teacher_id } = req.query;
  try {
    const teacher = await prisma.teachers.findFirst({
      where: {
        account_id: Number(teacher_id),
      },
    });

    const result = await prisma.section_assignment.findMany({
      include: {
        sections: true,
        school_year: true,
      },
      where: {
        teacher_id: teacher?.teacher_id,
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
