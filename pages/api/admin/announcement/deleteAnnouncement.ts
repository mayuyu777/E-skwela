import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import { announcement_type } from "@/constants/announcement_type";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { announcement } = req.body;
  
  try {
     const result = await prisma.announcements.delete({
      where: {
        id: announcement.id
      }
     })
      
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
