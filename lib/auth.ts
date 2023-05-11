import { prisma } from '../prisma/client';
import  bcrypt  from 'bcrypt';

const saltRounds = 10;

export async function login(username:string,password:string) {
    const user = await prisma.accounts.findFirst({
        where:{
            username: username
        }
    });
    
    if(user){
        if(bcrypt.compareSync(password,user.password)){
            return { auth:true, user:user }
        }
    }
    return { auth:false, err:'Invalid Username and/or Password Credentials' }
}