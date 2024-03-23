/* eslint-disable no-unused-vars */
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { User as UserModel } from "@/prisma/dbServerActions";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: UserModel;
    error?: string;
  }

  interface User extends UserModel {
    backend: {
      accessTokenExpiration: number;
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: UserModel & {
      backend: {
        accessTokenExpiration: number;
        accessToken: string;
        refreshToken: string;
      };
    };
  }
}
