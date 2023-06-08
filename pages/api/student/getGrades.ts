import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import GradesInterface from "@/interfaces/GradesInterface";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { school_id } = req.body;
  var gradesArray: GradesInterface[][] = [];

  try {
    const school_years = await prisma.school_year.findMany({});
    
    await Promise.all(school_years.map(  async (data) => {
      const result = await prisma.grades.findMany({
        where: {
          student: {
            school_id: school_id
          },
          school_year: {
            id: data.id
          }
        },
        include: {
          class_subjects: {
            select: { 
              subjects: true,
              class_sections: {
                select: {
                  sections: true
                }
              }
            }
          }
        }
      });
      gradesArray.push(result);
    }))
  
    return res.status(200).json(gradesArray);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, ok: false });
  }
}
