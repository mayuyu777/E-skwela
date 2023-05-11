import { prisma } from '../prisma/client';

export async function getAllSchoolYear() {
    const res = await prisma.school_year.findMany();
    return JSON.parse(JSON.stringify(res));
}