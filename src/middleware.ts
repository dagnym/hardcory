import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token is found and the path requires auth, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  //   console.log(token, "thats thetoken");
  return NextResponse.next();
}

export const config = {
  matcher: ["/forum/main"], // Adjust to specify which pages are protected
};
