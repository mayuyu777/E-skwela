import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { student_id } = req.body;
  try {
    // const yearId = await prisma.subject_assignment.findMany()
    // const result = await prisma.grades.groupBy({
    //   by:['subject_assignment_id']
    // });

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, ok: false });
  }
}
