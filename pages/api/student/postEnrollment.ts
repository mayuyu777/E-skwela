import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body;

    try {
      const result = await prisma.student_enrollment.create({data: data});

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error, ok: false });
    }
}
