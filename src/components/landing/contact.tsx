import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 border-t border-umber-900/10 bg-cream-50"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-10 self-start">
            <p className="text-xs uppercase tracking-[0.22em] text-terracotta-600 mb-6">
              05 — Tell us about your house
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight-display text-umber-900 leading-[1.05] mb-8">
              No pressure.{" "}
              <em className="not-italic text-terracotta-600">
                No middleman.
              </em>
            </h2>
            <p className="text-lg text-umber-700 leading-relaxed mb-10">
              Fill out the form and a real person will call or text you back
              within one business day. We&apos;ll walk through your situation,
              give you a straight read on your options, and — if a cash offer
              makes sense — send you a number in writing.
            </p>

            <div className="space-y-4 pt-6 border-t border-umber-900/10">
              <InfoRow label="Service area" value="Greater Knoxville, TN" />
              <InfoRow label="Typical response" value="Under 24 business hours" />
              <InfoRow label="Our commitment" value="If listing is better, we'll say so." />
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-xs uppercase tracking-[0.18em] text-umber-500">
        {label}
      </span>
      <span className="text-sm text-umber-900 text-right">{value}</span>
    </div>
  );
}
