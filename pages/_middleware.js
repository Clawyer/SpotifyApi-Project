import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Get the token from the header
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname, origin } = req.nextUrl;
  //Allow the request if the token is valid

  // 1) Its a request for next-auth session & provider fetching
  // 2) The token exists and is valid
  if (token || pathname.includes("/api/auth")) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(`${origin}/login`);
  }
}
