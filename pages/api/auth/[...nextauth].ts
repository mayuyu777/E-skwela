import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "./auth";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      /* eslint-disable */
      // @ts-ignore
      async authorize(credentials) {
        const { username, password, role } = credentials as {
          username: string;
          password: string;
          role: number
        };
        
        const res = await login(username, password, role);
        console.log(res,username,password, role)
        
        if (res.auth) {
          const user = res.user;
          return {
            name: user?.first_name + ' ' + user?.last_name,
            role: res.role,
            school_id: user?.school_id,
          };
        } else {
          throw new Error(res.err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/Signin",
    // signOut: '/signout'
  },
  callbacks: {
    async jwt({ token, user }) {
      /* Step 1: update the token based on the user object */
      if (user) {
        token.role = user.role;
        token.school_id = user.school_id;
      }
      return token;
    },
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object */
      if (token && session.user) {
        session.user.role = token.role;
        session.user.school_id = token.school_id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
