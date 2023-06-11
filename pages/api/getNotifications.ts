import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { school_id } = req.body;
  
    try {
      const result = await prisma.notifications.findMany({
        where: {
            OR: [
                {
                    student: {
                        school_id: school_id,
                    },
                },
                { 
                    faculty: { 
                        school_id: school_id
                    } 
                },
            ],
            AND: {
                mark_as_read: false
            }
        }
      });

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error, ok: false });
    }
}
