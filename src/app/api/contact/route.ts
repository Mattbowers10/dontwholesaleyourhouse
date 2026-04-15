import { NextResponse } from "next/server";
import { createLead } from "@/lib/db";

function str(v: FormDataEntryValue | null): string {
  return v == null ? "" : String(v).trim();
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid submission." },
      { status: 400 }
    );
  }

  const name = str(form.get("name"));
  const email = str(form.get("email"));
  const phone = str(form.get("phone"));
  const address = str(form.get("address")) || null;
  const situation = str(form.get("situation")) || null;
  const timeline = str(form.get("timeline")) || null;
  const message = str(form.get("message")) || null;

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Please enter your name." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 }
    );
  }
  if (!phone || phone.length < 7) {
    return NextResponse.json(
      { error: "Please enter a phone number we can reach you at." },
      { status: 400 }
    );
  }

  const lead = await createLead({
    name,
    email,
    phone,
    address,
    situation,
    timeline,
    message,
  });

  return NextResponse.json({ ok: true, id: lead.id });
}
