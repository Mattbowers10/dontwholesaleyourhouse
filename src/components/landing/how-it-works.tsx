const steps = [
  {
    n: "01",
    title: "They lock you up.",
    body: "You sign a purchase contract for, say, $150,000. Sounds like a deal — until you read the fine print. That contract is assignable. It never has to close with them.",
  },
  {
    n: "02",
    title: "They shop your house.",
    body: "For the next 2–4 weeks, they quietly market your house to investors on Facebook groups, cash-buyer lists, and Telegram channels — with you still living in it.",
  },
  {
    n: "03",
    title: "They pocket the spread.",
    body: "An investor agrees to pay $180,000. The wholesaler assigns the contract, collects $30,000, and disappears. You sold for $150,000 when a buyer was there all along paying $180,000.",
  },
  {
    n: "04",
    title: "Or they walk away.",
    body: "If they can't find an end buyer, they use an inspection contingency to back out — days before closing. You've lost a month, and you're back to square one.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-they-work"
      className="relative bg-umber-900 text-cream-100 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 -z-0 opacity-40" aria-hidden="true">
        <div
          className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(194,99,63,0.35) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl mb-20">
          <p className="text-xs uppercase tracking-[0.22em] text-terracotta-300 mb-6">
            02 — How wholesalers actually work
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight-display leading-[1.05]">
            The playbook they don&apos;t want you to see.
          </h2>
        </div>

        <ol className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {steps.map((s) => (
            <li key={s.n}>
              <div className="flex items-baseline gap-6 mb-4">
                <span className="font-display text-5xl tracking-tight-display text-terracotta-300">
                  {s.n}
                </span>
                <div className="h-px flex-1 bg-cream-100/20" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl tracking-tight-display mb-3 text-cream-50">
                {s.title}
              </h3>
              <p className="text-cream-100/70 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
