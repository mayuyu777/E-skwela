import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { announcement } = req.body;
  try {
    const result = await prisma.accounts.findMany({});
    const admins = await prisma.admins.findMany({});
    const students = await prisma.students.findMany({});
    const teachers = await prisma.teachers.findMany({});

    return res
      .status(200)
      .json({ accounts: result, admins: admins, students: students, teachers: teachers });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
