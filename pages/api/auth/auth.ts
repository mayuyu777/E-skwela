import { role } from '@/constants/role';
import { prisma } from '../../../prisma/client';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function login(username: string, password: string, userRole: number) {

  if(userRole == role.student){
    const user = await prisma.student.findFirst({
      where: {
        school_id: username,
      },
    });
  
    console.log(user)
  
    if (user && bcrypt.compareSync(password, user.password)) {
      return { auth: true, user: user, role: userRole };
    }
  }else{
    const user = await prisma.faculty.findFirst({
      where: {
        school_id: username,
      },
    });
  
    console.log(user)
  
    if (user && bcrypt.compareSync(password, user.password)) {
      return { auth: true, user: user, role: userRole };
    }
  }
 
  return {
    auth: false,
    err: 'Invalid Username and/or Password Credentials',
  };
}