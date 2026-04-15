"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { STAGE_LABEL, STAGE_ORDER, type PropertyStage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StageSwitcher({
  propertyId,
  stage,
}: {
  propertyId: string;
  stage: PropertyStage;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(stage);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function change(next: PropertyStage) {
    if (next === current) return;
    if (
      next === "sold" &&
      !confirm("Mark this property as sold? You can still edit it afterward.")
    )
      return;

    setError(null);
    const prev = current;
    setCurrent(next);

    const fd = new FormData();
    fd.set("stage", next);
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "PATCH",
        body: fd,
      });
      if (!res.ok) throw new Error("Couldn't update stage.");
      startTransition(() => router.refresh());
    } catch (err) {
      setCurrent(prev);
      setError(err instanceof Error ? err.message : "Couldn't update stage.");
    }
  }

  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-umber-500 mb-3">
        Advance stage
      </div>
      <div className="inline-flex rounded-lg border border-umber-900/15 bg-cream-50 p-1">
        {STAGE_ORDER.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => change(s)}
            disabled={pending}
            className={cn(
              "px-4 py-2 text-sm rounded-md transition-all",
              current === s
                ? "bg-umber-900 text-cream-50 shadow-warm"
                : "text-umber-700 hover:bg-umber-900/5"
            )}
          >
            {STAGE_LABEL[s]}
          </button>
        ))}
      </div>
      {error && (
        <div className="mt-2 text-xs text-danger">{error}</div>
      )}
    </div>
  );
}
