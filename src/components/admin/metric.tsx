export function Metric({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "terracotta" | "forest" | "umber";
}) {
  const valueColor =
    accent === "terracotta"
      ? "text-terracotta-600"
      : accent === "forest"
      ? "text-forest-500"
      : "text-umber-900";
  return (
    <div className="rounded-xl border border-umber-900/10 bg-cream-50 p-6">
      <div className="text-xs uppercase tracking-[0.18em] text-umber-500 mb-2">
        {label}
      </div>
      <div className={`font-display text-4xl tracking-tight-display ${valueColor}`}>
        {value}
      </div>
      {sub && (
        <div className="mt-1.5 text-xs text-umber-500">{sub}</div>
      )}
    </div>
  );
}
