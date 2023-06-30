import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import GradesInterface from "@/interfaces/GradesInterface";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const grade  = req.body.grade;

  try {
    const result = await prisma.grades.upsert({
      where: {
        id: grade.id
      },
      update: grade,
      create: grade,
      include: {
        class_subjects: {
          select: {
            subjects: true,
            faculty: true
          }
        }
      }
    })

    if(result){
      const res = await prisma.notifications.create({
        data: {
          id: uuidv4(),
          faculty_fk: result.class_subjects?.faculty.id,
          student_fk: result.student_fk,
          content: "Your " + result.class_subjects?.subjects.name + 
          " grade have been updated by " + result.class_subjects?.faculty.first_name +
          " " + result.class_subjects?.faculty.last_name + ".",
          mark_as_read: false,
          created_at:  moment().format()
        }
      })
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
