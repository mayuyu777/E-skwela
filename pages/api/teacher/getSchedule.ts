import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { school_id } = req.body;

  try {

    const classSchedule = await prisma.class_subjects.findMany({
        where: {
            faculty: {
                school_id: school_id
            },
            class_sections: {
                school_year: {
                    status: 1
                }
            }
        },
        select: {
            subjects: true,
            class_schedules: true
        }
    })
    return res.status(200).json(classSchedule);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, ok: false });
  }
}
