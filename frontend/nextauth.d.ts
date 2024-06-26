/* eslint-disable no-unused-vars */
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { User as UserModel } from "@/types/user";
declare module "next-auth" {
  interface User {
    id: string;
    authorities: string[];
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
      authorities: string[];
      backend: {
        accessTokenExpiration: number;
        accessToken: string;
        refreshToken: string;
      };
    };
  }
}
