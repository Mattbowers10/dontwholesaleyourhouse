import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-umber-900/10 bg-cream-100 py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-md">
            <Logo />
            <p className="mt-5 text-sm text-umber-700 leading-relaxed">
              A Knoxville, TN home-buying group helping homeowners sell the
              right way — whether that&apos;s with us or without us.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 text-sm">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-umber-500 mb-2">
                Get in touch
              </div>
              <a
                href="mailto:hello@dontwholesaleyourhouse.com"
                className="link-inline text-umber-900"
              >
                hello@dontwholesaleyourhouse.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-umber-900/10 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-umber-500">
          <div>
            © {new Date().getFullYear()} Don&apos;t Wholesale Your House, LLC.
            All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Knoxville, Tennessee</span>
            <span aria-hidden="true">·</span>
            <a
              href="/admin/login"
              className="hover:text-umber-900 transition-colors"
            >
              Team login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
