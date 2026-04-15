export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 pb-8 border-b border-umber-900/10">
      <div>
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.22em] text-terracotta-600 mb-2">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl md:text-5xl tracking-tight-display text-umber-900 leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-umber-700 max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
