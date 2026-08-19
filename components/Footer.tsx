import { site, socials } from "@/data/site";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[var(--line)]">
      <div className="page-shell flex flex-col items-center gap-4 py-7 text-xs text-[var(--muted)] sm:flex-row sm:justify-between">
        <p>
          &copy; {year} {site.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-1">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-[var(--surface)] hover:text-[var(--fg)]"
            >
              <SocialIcon name={s.icon} className="h-[0.9rem] w-[0.9rem]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
