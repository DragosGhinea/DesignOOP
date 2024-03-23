/* eslint-disable no-unused-vars */
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { User as UserModel } from "@/prisma/dbServerActions";
declare module "next-auth" {
  interface User {
    id: string;
    backend: {
      accessTokenExpiration: number;
      accessToken: string;
      refreshToken: string;
    };
  }

  interface Session extends DefaultSession {
    user: User;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      backend: {
        accessTokenExpiration: number;
        accessToken: string;
        refreshToken: string;
      };
    };
  }
}
