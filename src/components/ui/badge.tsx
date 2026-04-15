import { cn } from "@/lib/utils";
import { STAGE_LABEL, type PropertyStage } from "@/lib/types";

export function StageBadge({
  stage,
  className,
}: {
  stage: PropertyStage;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wider",
        `stage-${stage}`,
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
      {STAGE_LABEL[stage]}
    </span>
  );
}
