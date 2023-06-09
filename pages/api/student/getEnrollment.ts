import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import { school_year_status } from "@/constants/school_year_status";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { school_id } = req.body;

    try {
      const studentEnrollment = await prisma.student_enrollment.findFirst({
          where: {
              student: {
                  school_id: school_id
              },
              status: 1
          }
      })

      const latestSchoolYear = await prisma.school_year.findFirst({
        where: {
          status: school_year_status.active
        }
      })
  
      return res.status(200).json({studentEnrollment: studentEnrollment, latestSchoolYear: latestSchoolYear});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error, ok: false });
    }
}
