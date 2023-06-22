import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import { announcement_type } from "@/constants/announcement_type";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { school_id, announcement } = req.body;
  
  try {
      const user = await prisma.faculty.findFirst({
        where: {
          school_id: school_id
        },
        select: {
          id: true
        }
      });

      if(user !== null){
        const result = await prisma.announcements.create({
          data: {
            id: uuidv4(),
            faculty_fk: user?.id,
            title: announcement.title,
            content: announcement.content,
            type: announcement.type,
            created_at: moment().format(),
            updated_at: moment().format()
          }
        })
        return res.status(200).json(result);
      }

      return res.status(500).json({ message: "User does not exist", ok: false });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
