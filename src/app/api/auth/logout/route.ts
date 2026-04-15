import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  const url = new URL(req.url);
  url.pathname = "/admin/login";
  url.search = "";
  const res = NextResponse.redirect(url, { status: 302 });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
