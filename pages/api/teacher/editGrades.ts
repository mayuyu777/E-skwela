import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import GradesInterface from "@/interfaces/GradesInterface";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const grade  = req.body.grade as GradesInterface;

  try {
    const result = await prisma.grades.upsert({
      where: {
        id: grade.id
      },
      update: grade,
      create: grade
    })

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
