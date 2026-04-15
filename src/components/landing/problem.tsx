const stats = [
  {
    value: "30–60%",
    label: "Below market",
    body: "Typical wholesaler offers fall 30–60% under fair market value so they can assign the contract at a profit.",
  },
  {
    value: "$0",
    label: "Skin in the game",
    body: "Most wholesalers never intend to buy. They're tying up your home while they shop it to actual investors.",
  },
  {
    value: "7–30d",
    label: "Lost to a contract",
    body: "During their inspection window, you can't legally sell to anyone else — even if a better offer shows up.",
  },
];

export function Problem() {
  return (
    <section
      id="the-problem"
      className="relative border-t border-umber-900/10 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.22em] text-terracotta-600 mb-6">
              01 — The problem
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight-display text-umber-900 leading-[1.05]">
              A wholesaler&apos;s{" "}
              <em className="text-terracotta-600 not-italic">job</em> is to pay
              you as little as possible.
            </h2>
            <p className="mt-8 text-lg text-umber-700 leading-relaxed">
              They knock on your door, cold-call you, send yellow letters — all
              saying the same thing: <em>&ldquo;We buy houses, any condition,
              fast cash.&rdquo;</em> What they don&apos;t say is that every dollar below
              market is a dollar in their pocket when they assign the contract
              to someone else.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-px bg-umber-900/10 rounded-lg overflow-hidden">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-cream-100 p-8 md:p-10 grid md:grid-cols-[auto,1fr] gap-6 md:gap-10 items-baseline"
              >
                <div>
                  <div className="font-display text-5xl md:text-6xl tracking-tight-display text-umber-900">
                    {s.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-umber-500">
                    {s.label}
                  </div>
                </div>
                <p className="text-umber-700 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
