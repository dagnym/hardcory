import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const blizzardId = token?.sub;
  const pathname = req.nextUrl.pathname;
  const nextUrl = pathname.split("/")[2];
  console.log("next.url: ", pathname.split("/")[3]);
  console.log("token session info: ", token?.sub);

  if (pathname.startsWith("/user/") && nextUrl !== blizzardId) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // If no token is found and the path requires auth, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  //   console.log(token, "thats thetoken");
  return NextResponse.next();
}

export const config = {
  matcher: ["/forum/main", "/user/:userId*"], // Adjust to specify which pages are protected
};
