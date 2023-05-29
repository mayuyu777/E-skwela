import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import GradesInterface from "@/interfaces/GradesInterface";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { grade_id, grades } = req.body;

  try {
    const result = await prisma.grades.update({
        data : grades,
        where:{
            grade_id : grades.grade_id
        }
    })

    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
