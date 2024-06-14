import { auth } from "@/auth";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/signin", "/signup", "/", "/pricing"];

// const middleware = async (req) => {
//   // check if route is protected or public
//   const path = req.nextUrl.pathname;
//   const isProtected = protectedRoutes.includes(path);
//   const isPublic = publicRoutes.includes(path);
//
//   // check if user is authenticated
//   const session = await auth();
//
//   console.log("session", session);
// };

// export default auth((req) => {
//   const path = req.nextUrl.pathname;
//   const isProtected = protectedRoutes.includes(path);
//   const isPublic = publicRoutes.includes(path);
//
//   // const session = req.auth;
//   // console.log(session);
// });

export const middleware = async (req, res) => {
  // const session = await auth();
  // console.log(session);
};

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
