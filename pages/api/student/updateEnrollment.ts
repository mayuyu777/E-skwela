import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import { enrollment_status } from "@/constants/enrollment_status";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.body.id;

    try {
      const result = await prisma.student_enrollment.update({
        where: {
            id: id
        },
        data: {
            status: enrollment_status.inactive
        }
      });

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error, ok: false });
    }
}
