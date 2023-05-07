import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from '../../../lib/auth';

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
     
        const res = await login(username,password);
        
        if(res.auth){
            const user = res.user;
            return {
              name: user,
            }
        }else{
            throw new Error(res.err)
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    // signOut: '/signout'
  }
};

export default NextAuth(authOptions);