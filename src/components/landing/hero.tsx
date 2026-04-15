export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Decorative architectural lines */}
      <svg
        aria-hidden="true"
        className="absolute right-0 top-24 -z-10 h-[520px] w-[520px] opacity-[0.08] text-umber-900"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M80 320 L80 180 L200 80 L320 180 L320 320 Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M140 320 L140 240 L260 240 L260 320"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M80 180 L320 180" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="155" r="6" fill="currentColor" opacity="0.6" />
      </svg>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-umber-900/15 bg-cream-50/60 backdrop-blur-sm px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-umber-700 mb-10">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
            Straight talk for homeowners
          </div>

          <h1 className="display-tight text-[clamp(2.75rem,7vw,6rem)] text-umber-900">
            Your house is worth{" "}
            <em className="not-italic">
              <span className="text-terracotta-600">more</span>
            </em>{" "}
            than a wholesaler will tell you.
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-umber-700 font-light">
            Wholesalers aren&apos;t your buyer. They&apos;re a middleman trying
            to lock up your home for pennies on the dollar, then flip the
            contract to whoever pays them most — while you walk away with less
            than you deserve.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-terracotta-500 px-6 h-14 text-base font-medium text-cream-50 hover:bg-terracotta-600 shadow-warm hover:shadow-warm-lg transition-all"
            >
              Talk to us first
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#how-they-work"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-umber-900/25 bg-transparent px-6 h-14 text-base font-medium text-umber-900 hover:border-umber-900/50 hover:bg-umber-900/5 transition-all"
            >
              See how wholesalers work
            </a>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 text-xs uppercase tracking-[0.18em] text-umber-500">
            <div className="flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-umber-500" />
              Knoxville-based
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-umber-500" />
              Cash when you need it
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-umber-500" />
              No assignment fees
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
