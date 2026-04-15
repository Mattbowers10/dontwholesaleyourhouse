const options = [
  {
    tag: "Option A",
    title: "List with a realtor.",
    sub: "Maximum price. Some patience required.",
    body: "If the house is in reasonable condition and you have 30–60 days, a good agent will market it, run showings, and get you fair market value. You pay commission, but you keep the spread a wholesaler would've pocketed.",
    bullets: [
      "Best for homes in livable condition",
      "Open market = highest sale price",
      "6% commission on avg. — still beats a 30% wholesale haircut",
    ],
  },
  {
    tag: "Option B",
    title: "Sell to a real cash buyer.",
    sub: "Close fast. No middleman. Honest number.",
    body: "If you need speed — estate sale, behind on payments, inherited property, major repairs — a cash buyer who actually closes with their own money gives you a straight offer. That's what we do.",
    bullets: [
      "We use our own capital, not an assignment",
      "Close in 7–21 days",
      "No showings, no repairs, no commission",
    ],
    featured: true,
  },
];

export function BetterWay() {
  return (
    <section
      id="better-way"
      className="py-24 lg:py-32 border-t border-umber-900/10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.22em] text-terracotta-600 mb-6">
            03 — A better way
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight-display text-umber-900 leading-[1.05]">
            Two honest options.{" "}
            <em className="not-italic text-umber-500">
              Neither is wholesaling.
            </em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {options.map((o) => (
            <article
              key={o.tag}
              className={`relative p-8 md:p-10 rounded-xl border ${
                o.featured
                  ? "bg-umber-900 text-cream-100 border-umber-900 shadow-warm-lg"
                  : "bg-cream-50 border-umber-900/12"
              }`}
            >
              <div
                className={`text-xs uppercase tracking-[0.22em] mb-5 ${
                  o.featured ? "text-terracotta-300" : "text-terracotta-600"
                }`}
              >
                {o.tag}
              </div>
              <h3
                className={`font-display text-3xl md:text-4xl tracking-tight-display leading-tight mb-2 ${
                  o.featured ? "text-cream-50" : "text-umber-900"
                }`}
              >
                {o.title}
              </h3>
              <p
                className={`text-base italic mb-6 ${
                  o.featured ? "text-cream-100/60" : "text-umber-500"
                }`}
              >
                {o.sub}
              </p>
              <p
                className={`leading-relaxed mb-8 ${
                  o.featured ? "text-cream-100/80" : "text-umber-700"
                }`}
              >
                {o.body}
              </p>
              <ul className="space-y-3">
                {o.bullets.map((b) => (
                  <li
                    key={b}
                    className={`flex items-start gap-3 text-sm ${
                      o.featured ? "text-cream-100/90" : "text-umber-700"
                    }`}
                  >
                    <span
                      className={`mt-[7px] inline-block h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                        o.featured ? "bg-terracotta-300" : "bg-terracotta-500"
                      }`}
                    />
                    {b}
                  </li>
                ))}
              </ul>

              {o.featured && (
                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-terracotta-500 px-5 h-12 text-sm font-medium text-cream-50 hover:bg-terracotta-600 transition-all"
                >
                  Get our offer
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
