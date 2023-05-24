import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { announcement } = req.body;
  try {
    const result = await prisma.announcements.create({
      data: announcement,
    });

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, ok: false });
  }
}
