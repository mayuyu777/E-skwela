import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import SchoolYearInterface from "@/interfaces/SchoolYearInterface";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { action, curSY, upSY } = req.body;
  let result;
  try {
    if(action === 0){
      if(curSY){
        curSY.status = 0;
        curSY.date_ended = moment().format();
        result = await prisma.school_year.update({
          where: {
            id: curSY?.id
          },
          data: curSY
        });
      }
      result = await prisma.school_year.upsert({
        where: {
          id: upSY?.id || "-1"
        },
        create: {
          id: uuidv4(),
          start: new Date().getFullYear(),
          enrollment_open: 0,
          status: 1,
          date_started: moment().format(),
          date_ended: null
        },
        update: {
          id: undefined,
          start: undefined,
          enrollment_open: undefined,
          status: 1,
          date_started: moment().format(),
          date_ended: undefined
        }
      })
      result  = await prisma.school_year.create({
        data: {
          id: uuidv4(),
          start: new Date().getFullYear()+1,
          enrollment_open: 0,
          status: 0,
          date_started: null,
          date_ended: null
        }
      })
      
    }else if(action === 1){
      curSY.status = 0;
      curSY.date_ended = moment().format();
      result = await prisma.school_year.update({
        where: {
          id: curSY?.id
        },
        data: curSY
      })
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
