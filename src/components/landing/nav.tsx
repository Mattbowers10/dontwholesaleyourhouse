import Link from "next/link";
import { Logo } from "./logo";

export function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-6 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-umber-900/80">
          <a href="#the-problem" className="link-inline">
            The problem
          </a>
          <a href="#how-they-work" className="link-inline">
            How they work
          </a>
          <a href="#better-way" className="link-inline">
            A better way
          </a>
          <a href="#about" className="link-inline">
            About us
          </a>
        </nav>
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-umber-900 px-4 py-2 text-xs font-medium uppercase tracking-wider text-cream-50 hover:bg-umber-700 transition-colors"
        >
          Get a real offer
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
