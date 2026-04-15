import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group ${className}`}
      aria-label="Don't Wholesale Your House — home"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
          <path
            d="M6 16 L16 6 L26 16 L26 26 L6 26 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
            className="text-umber-900"
          />
          <path
            d="M11 26 L11 19 L21 19 L21 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
            className="text-terracotta-500"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[13px] tracking-tight-display text-umber-900">
          Don&apos;t Wholesale
        </span>
        <span className="font-display text-[13px] tracking-tight-display text-terracotta-600">
          Your House.
        </span>
      </span>
    </Link>
  );
}
