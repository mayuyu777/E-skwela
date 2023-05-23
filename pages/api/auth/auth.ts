import { role } from '@/constants/role';
import { prisma } from '../../../prisma/client';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function login(username: string, password: string) {
  const user = await prisma.accounts.findFirst({
    where: {
      username: username,
    },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    return { auth: true, user: user };

    // let userRole =
    //   user.role === role.admin
    //     ? 'admins'
    //     : user.role === role.teacher
    //     ? 'teachers'
    //     : 'students';

    // if (user.role === role.admin) {
    //   const userData = await prisma.admins.findFirst({
    //     where: {
    //       account_id: user.account_id,
    //     },
    //   });
    // }
  }
  return {
    auth: false,
    err: 'Invalid Username and/or Password Credentials',
  };
}
