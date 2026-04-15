import Link from "next/link";
import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export const metadata = { title: "Team login — DWYH" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const hasError = sp.error === "1";
  const next = sp.next ?? "/admin";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-10">
          <Logo />
        </div>

        <div className="rounded-xl border border-umber-900/10 bg-cream-50 p-8 shadow-warm">
          <div className="mb-7">
            <h1 className="font-display text-3xl tracking-tight-display text-umber-900">
              Team login
            </h1>
            <p className="mt-1.5 text-sm text-umber-700">
              DWYH operations dashboard.
            </p>
          </div>

          <form action="/api/auth/login" method="POST" className="space-y-5">
            <input type="hidden" name="next" value={next} />
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
              />
            </div>

            {hasError && (
              <div className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
                Incorrect password.
              </div>
            )}

            <Button type="submit" size="lg" className="w-full">
              Sign in
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.18em] text-umber-500 hover:text-umber-900 transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
