import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session && pathname === "/") {
    const url = new URL(req.url);
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return res;

  /*  if (pathname == "/" || pathname.startsWith("/dashboard")) {
    if (session?.user == undefined) {
      const url = new URL(req.url);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  } */

  /*  if (!session && pathname != "/register") {
    const url = new URL(req.url);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  } */
  /* if (!session && pathname === "/dashboard") {
    const url = new URL(req.url);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  } */
}

/* export const config = {
  matcher: "/dashboard/:path*",
}; */
