import { options } from "@/modules/users/next_auth/auth.config";
import NextAuth from "next-auth/next";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
