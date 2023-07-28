import { withAuth } from "next-auth/middleware";
import { rateLimiter } from "./lib/rate-limiter";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req: NextRequest) {
    // get the relative path
    const pathname = req.nextUrl.pathname;

    // manage rate limiting
    if (pathname.startsWith("/api")) {
      const ip = req.ip ?? "127.0.0.1";

      try {
        const { success } = await rateLimiter.limit(ip);

        if (!success) {
          return new NextResponse("Too many requests");
        }

        return NextResponse.next();
      } catch (error) {
        return new NextResponse("Internal Server Error");
      }
    }

    // manage route protection
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    const isAuthPage = pathname.startsWith("/login");

    const sensitiveRoutes = ["/dashboard"];

    if (isAuthPage) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return null;
    }

    if (
      !isAuthenticated &&
      sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages
        // We return true here so that the middleware function above is always called
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"],
};
