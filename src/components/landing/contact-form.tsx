"use client";

import { useState } from "react";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ kind: "submitting" });
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setState({ kind: "success" });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  if (state.kind === "success") {
    return (
      <div className="rounded-lg border border-forest-500/30 bg-forest-500/5 p-10 text-center">
        <div className="font-display text-3xl md:text-4xl tracking-tight-display text-forest-500 mb-3">
          Got it. We&apos;ll be in touch.
        </div>
        <p className="text-umber-700 leading-relaxed max-w-md mx-auto">
          A real person will call or text you within one business day. No
          automated follow-ups, no drip emails, no pressure.
        </p>
        <button
          onClick={() => setState({ kind: "idle" })}
          className="mt-6 text-sm text-terracotta-600 hover:text-terracotta-700 underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" required placeholder="Jane Smith" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="(865) 555-0100"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <Label htmlFor="address">Property address</Label>
        <Input
          id="address"
          name="address"
          placeholder="123 Main St, Knoxville, TN"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="situation">What&apos;s going on?</Label>
          <Select id="situation" name="situation" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option value="tired_landlord">Tired of being a landlord</option>
            <option value="inherited">Inherited property</option>
            <option value="divorce">Divorce or separation</option>
            <option value="relocation">Relocating</option>
            <option value="behind_on_payments">Behind on payments</option>
            <option value="needs_repairs">Needs major repairs</option>
            <option value="just_exploring">Just exploring options</option>
            <option value="other">Other</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="timeline">Timeline</Label>
          <Select id="timeline" name="timeline" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option value="asap">ASAP (within 2 weeks)</option>
            <option value="30d">Within 30 days</option>
            <option value="60d">Within 60 days</option>
            <option value="flexible">Flexible</option>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">Anything we should know? (optional)</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Condition, tenants, liens, repairs, anything else…"
        />
      </div>

      {state.kind === "error" && (
        <div className="rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {state.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={state.kind === "submitting"}
          className="w-full sm:w-auto"
        >
          {state.kind === "submitting" ? "Sending…" : "Get an honest offer"}
          {state.kind !== "submitting" && (
            <span aria-hidden="true">→</span>
          )}
        </Button>
        <p className="text-xs text-umber-500">
          We&apos;ll never sell your info. No hard sell. A real person calls
          you back.
        </p>
      </div>
    </form>
  );
}
