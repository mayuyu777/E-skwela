export enum Role {
  student = 1,
  teacher = 2,
  admin = 3,
}

declare module "next-auth" {
  interface User {
    role?: Role;
    school_id: Number;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    school_id: Number;
  }
}
