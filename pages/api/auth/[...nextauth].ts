import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from './auth';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      /* eslint-disable */
      // @ts-ignore
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const res = await login(username, password);

        if (res.auth) {
          const user = res.user;
          return {
            name: user?.username,
            role: user?.role,
            id: user?.account_id,
          };
        } else {
          throw new Error(res.err);
        }
      },
    }),
  ],
  pages: {
    signIn: '/Signin',
    // signOut: '/signout'
  },
};

export default NextAuth(authOptions);
