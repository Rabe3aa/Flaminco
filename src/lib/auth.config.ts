import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoginPage = request.nextUrl.pathname === "/admin/login";
      const isAuthenticated = !!auth?.user;

      if (isLoginPage) {
        if (isAuthenticated) {
          return Response.redirect(new URL("/admin", request.nextUrl.origin));
        }
        return true;
      }

      if (!isAuthenticated) {
        return Response.redirect(
          new URL("/admin/login", request.nextUrl.origin)
        );
      }

      return true;
    },
  },
  providers: [],
};
