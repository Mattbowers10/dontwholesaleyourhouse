import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { createProperty, listProperties } from "@/lib/db";
import { parseFormToPropertyInput } from "@/lib/form";

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await listProperties();
  return NextResponse.json({ properties: rows });
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await req.formData();
  const parsed = parseFormToPropertyInput(form);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const prop = await createProperty(parsed.input);
  return NextResponse.json({ property: prop }, { status: 201 });
}
