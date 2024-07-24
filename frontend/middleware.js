import { getToken, encode } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/token";

const tokenName =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

const protectedRoutes = ["/subscribe"]; // these wil be protected routes that we should redirect to signin
const publicRoutes = ["/signin", "/signup"]; // these will be public routes that we should redirect from

export const middleware = async (req) => {
  // check if the route is public
  const path = req.nextUrl.pathname;
  const isProtected =
    protectedRoutes.includes(path) || path.startsWith("/dashboard");
  const isPublic = publicRoutes.includes(path);
  if (!isProtected && !isPublic) return NextResponse.next(); // continue
  let response = NextResponse.next();

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    salt: tokenName,
    secureCookie: process.env.NODE_ENV === "production",
  });

  // redirect to signin page if user is not signed in on a protected route
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  if (token) {
    // check if route is a public route that we should redirect from
    if (isPublic) {
      // redirect to dashboard if user is already signed in
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    // check if access token is still valid
    if (Date.now() < token.expires_at) {
      // token is still valid
      return response;
    }

    console.log("token expired, refreshing it");
    // token is expired, try to refresh it
    const newToken = await refreshAccessToken(token);
    if (newToken) {
      // update the session token
      const encodedToken = await encode({
        secret: process.env.AUTH_SECRET,
        salt: tokenName,
        token: newToken,
      });

      // set the new headers so the client can use the new token
      req.cookies.set(tokenName, encodedToken);
      response = NextResponse.next({ request: { headers: req.headers } });

      // set the new cookie
      response.cookies.set(tokenName, encodedToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    } else {
      // destroy the session
      const res = NextResponse.redirect(new URL("/signin", req.nextUrl));
      res.cookies.delete(tokenName);
      return res;
    }
  }

  return response;
};

// Routes Middleware should not run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.webp$).*)",
  ],
};
