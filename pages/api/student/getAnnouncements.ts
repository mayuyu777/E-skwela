import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import { announcement_type } from "@/constants/announcement_type";
import { aW } from "@fullcalendar/core/internal-common";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, take } = req.body;
  try {
    const result = await prisma.announcements.findMany({
      take:take,
      skip: (page-1) * take,
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

    const count = await prisma.announcements.count({
      where: {
        type: announcement_type.everyone
      },
    })

    return res.status(200).json({announcements: result, count: count});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
