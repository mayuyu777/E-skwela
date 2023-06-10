import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import { announcement_type } from "@/constants/announcement_type";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const result = await prisma.announcements.findMany({
        orderBy: {
          created_at: "desc"
        },
        where: {
            type: announcement_type.everyone
        },
        include: {
          faculty: true
        }
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
