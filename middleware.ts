// middleware.ts
import type { NextRequest } from "next/server";
import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client();

export async function middleware(request: NextRequest) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    // protect everything except static files and common assets
    "/((?!_next/static|_next/image|favicon.ico|robots.txt).*)",
  ],
};
