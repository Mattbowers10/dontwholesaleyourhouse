import { NextResponse } from "next/server";
import {
  buildSessionToken,
  verifyPassword,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/admin");

  if (!verifyPassword(password)) {
    const url = new URL(req.url);
    url.pathname = "/admin/login";
    url.searchParams.set("error", "1");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url, { status: 302 });
  }

  const token = await buildSessionToken();
  const url = new URL(req.url);
  url.pathname = next.startsWith("/admin") ? next : "/admin";
  url.search = "";
  const res = NextResponse.redirect(url, { status: 302 });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
