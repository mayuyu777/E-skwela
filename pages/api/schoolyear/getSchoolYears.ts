import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  try {

    const school_years = await prisma.school_year.findMany({
        orderBy: {
          created_at: "desc"
        },
    });

    const cur_school_year = await prisma.school_year.findFirst({
      where: {
        status: 1
      }
    });

    return res.status(200).json({school_years: school_years, cur_school_year: cur_school_year });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
