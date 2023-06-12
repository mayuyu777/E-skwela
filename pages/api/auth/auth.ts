import { role } from '@/constants/role';
import { prisma } from '../../../prisma/client';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function login(username: string, password: string) {
  let user;
  let userRole = role.student;
  user = await prisma.student.findFirst({
    where: {
      school_id: username,
    },
  });

  if(user === null){
    user = await prisma.faculty.findFirst({
      where: {
        school_id: username,
      },
    });
    userRole = user !== null? user.role: userRole;
  }

  if (user && bcrypt.compareSync(password, user?.password)) {
    return { auth: true, user: user, role: userRole };
  }
 
  return {
    auth: false,
    err: 'Invalid Username and/or Password Credentials',
  };
}