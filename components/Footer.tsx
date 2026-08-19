import Link from "next/link";
import { navLinks, site, socials } from "@/data/site";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--line)]">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <p className="text-lg font-semibold tracking-tight">{site.handle}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Notes on AI, computer vision, and whatever I happen to be building.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--muted)] hover:text-[var(--fg)]"
                >
                  <SocialIcon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav className="text-sm">
            <p className="mb-3 font-semibold">Pages</p>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                  Home
                </Link>
              </li>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/feed.xml" className="text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                  RSS
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--line)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--fg)]"
            >
              Next.js
            </a>
            , caffeine, and an unreasonable number of retrains.
          </p>
        </div>
      </div>
    </footer>
  );
}
