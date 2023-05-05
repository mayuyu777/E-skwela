import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from '../../lib/auth';

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
     
        const res = await login(username,password);
        
        if(res.auth){
            return res.user
        }else{
            throw new Error(res.err)
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
//   callbacks: {
//     jwt(params) {
//       // update token
//       if (params.user?.role) {
//         params.token.role = params.user.role;
//       }
//       // return final_token
//       return params.token;
//     },
//   },
};

export default NextAuth(authOptions);