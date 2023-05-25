import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { section_name } = req.query;
  try {
    const section = await prisma.sections.findFirst({
      where: {
        section_name: section_name?.toString(),
      },
    });

    const result = await prisma.section_assignment.findMany({
      include: {
        sectioning: {
          include: {
            students: {
              include: {
                learner_info: true,
              },
            },
          },
        },
      },
      where: {
        section_id: section?.section_id,
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, ok: false });
  }
}
