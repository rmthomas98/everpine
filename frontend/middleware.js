import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { updateSession } from "@/lib/session";

const protectedRoutes = ["/dashboard", "/welcome", "/subscribe"];
const publicRoutes = ["/login", "/accountSetup", "/signup"];

const middleware = async (req) => {
  // check if route is protected or public
  const path = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);
  const isPublic = publicRoutes.includes(path);

  // decrypt the session from the cookie
  let session;
  const cookie = cookies().get("session")?.value;
  if (cookie) session = await decrypt(cookie);
  let res;
  if (session?.id) {
    res = await updateSession(req);
  }

  // redirect to /login if the user is on a protected route and not logged in
  if (isProtected && !session?.id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // redirect to /dashboard if the user is on a public route and logged on
  if (
    isPublic &&
    session?.id &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return res;
};

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export default middleware;
