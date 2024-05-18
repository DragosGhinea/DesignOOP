import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";
import { options } from "@/modules/users/next_auth/auth.config";

const publicRoutes = [
  /^\/$/, // matching "/"
  /^\/courses(\/.*)?$/, // matching "/courses" and "/courses/**"
  /^\/test$/, // matching "/test"
];
const adminRoutes = ["/admin"];

export default withAuth(
  (req: NextRequestWithAuth) => {
    const isAdminRoute = adminRoutes.includes(req.nextUrl.pathname);
    if (isAdminRoute) {
      const isAdmin =
        req.nextauth?.token!.user.authorities.includes("ROLE_ADMIN");
      if (isAdmin) return null;

      return Response.redirect(req.nextUrl.origin);
    }
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
