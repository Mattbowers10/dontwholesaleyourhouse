export function About() {
  return (
    <section
      id="about"
      className="py-24 lg:py-32 border-t border-umber-900/10"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="grid md:grid-cols-[auto,1fr] gap-10 md:gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-terracotta-600 mb-4">
              04 — Who we are
            </p>
            <div className="h-20 w-20 md:h-28 md:w-28 rounded-full bg-forest-500 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="h-10 w-10 md:h-14 md:w-14 text-cream-100" aria-hidden="true">
                <path
                  d="M8 22 L20 10 L32 22 L32 32 L8 32 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 32 L14 24 L26 24 L26 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight-display text-umber-900 leading-[1.1] mb-6">
              We&apos;re the cash buyer who actually closes.
            </h2>
            <div className="space-y-5 text-umber-700 leading-relaxed">
              <p>
                Don&apos;t Wholesale Your House is a Knoxville-based home-buying
                group. We buy with our own capital, do the rehab ourselves, and
                take homes to market the right way. No assignments. No
                bait-and-switch. No vanishing at closing.
              </p>
              <p>
                We started this because we watched too many sellers — people
                going through divorce, estate settlements, job relocations — get
                talked into signing contracts that didn&apos;t serve them. The
                least we can do is tell the truth about how it works.
              </p>
              <p className="text-umber-900">
                If you need speed and certainty, we&apos;ll give you a real
                number. If you&apos;d get more on the open market, we&apos;ll
                tell you to go that direction instead. Either way, you&apos;ll
                leave this conversation knowing more than you did.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
