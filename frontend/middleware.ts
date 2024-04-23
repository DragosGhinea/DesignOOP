import { NextAuthMiddlewareOptions, withAuth } from "next-auth/middleware";
import { computeCallbackURL } from "@/utils/common";
import { options } from "@/modules/users/next_auth/auth.config";
import { NextRequest } from "next/server";

const DEFAULT_LOGIN_REDIRECT = "/";
const apiAuthPrefix = "/api/auth";
const authRoutes = ["/login"];
const publicRoutes = [
  /^\/$/, // matching "/"
  /^\/courses(\/.*)?$/, // matching "/courses" and "/courses/**"
  /^\/profile$/, // matching "/profile"
];

export default withAuth(
  (req: NextRequest) => {
    // const { nextUrl } = req;
    // const isLoggedIn = !!req.nextauth.token;
    // console.log("TEST");
    // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    // if (isApiAuthRoute) {
    //   return null;
    // }
    // console.log("TEST ", isPublicRoute)
    // if (isPublicRoute) {
    //   return null;
    // }
    // // if (isAuthRoute) {
    // //   if (isLoggedIn) {
    // //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    // //   }
    // //   return null;
    // // }
    // // if (!isLoggedIn && !isPublicRoute) {
    // //   const encodedCallbackUrl = computeCallbackURL(nextUrl.pathname, nextUrl.search);
    // //   return Response.redirect(new URL(
    // //     `/login?callbackUrl=${encodedCallbackUrl}`,
    // //     nextUrl
    // //   ));
    // // }
    // return null;
  },
  {
    pages: options.pages,
    callbacks: {
      authorized: ({ token, req }) => {
        const { nextUrl } = req;
        const isPublicRoute = publicRoutes.some((regex) =>
          regex.test(nextUrl.pathname)
        );

        if (isPublicRoute) {
          return true;
        }
      },
    },
  } as NextAuthMiddlewareOptions
);

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
