import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { notif_id } = req.body;
  
    try {
      const result = await prisma.notifications.update({
        where: {
            id: notif_id
        },
        data: {
            mark_as_read: true
        }
      })

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error, ok: false });
    }
}
