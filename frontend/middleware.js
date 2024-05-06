import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { headers } from "next/headers";

const middleware = async (req) => {
  const cookie = cookies().get("session");
  console.log("hello from middleware.js", "hello");
  // return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  return NextResponse.next();
};

export const config = {
  // The above middleware would only run for the "/" path
  matcher: "/",
};

export default middleware;
