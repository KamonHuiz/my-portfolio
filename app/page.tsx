import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuDownload } from "react-icons/lu";
import { about, hero, whatILove } from "@/data/profile";
import { socials } from "@/data/site";
import SocialIcon from "@/components/SocialIcon";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-10 pb-4">
      {/* ---------- Ảnh câu lạc bộ ---------- */}
      <Reveal>
        <figure>
          <div className="overflow-hidden rounded-xl border border-[var(--line)]">
            <Image
              src={hero.image}
              alt={hero.alt}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          <figcaption className="mt-3 text-center text-[0.8rem] italic leading-relaxed text-[var(--muted)]">
            {hero.caption}
          </figcaption>
        </figure>
      </Reveal>

      {/* ---------- Giới thiệu ---------- */}
      <section className="mt-20 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[1fr_280px]">
        <Reveal delay={0.08}>
          <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl sm:leading-[1.15]">
            {about.headline}
          </h1>

          <div className="mt-7 space-y-5 leading-relaxed text-[var(--muted)]">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16} className="lg:order-last">
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-xl border border-[var(--line)]">
              <Image
                src={about.portrait}
                alt={about.portraitAlt}
                width={560}
                height={700}
                sizes="(max-width: 1024px) 60vw, 280px"
                className="h-[340px] w-full object-cover object-top"
              />
            </div>

            <a
              href={about.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--line)] py-2.5 text-[0.95rem] font-semibold transition-colors hover:border-[var(--muted)] hover:bg-[var(--surface)]"
            >
              <LuDownload className="h-4 w-4" />
              Résumé
            </a>

            {/* ---------- Liên hệ ---------- */}
            <ul className="mt-7 space-y-1">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-[var(--surface)]"
                  >
                    <SocialIcon name={s.icon} className="h-4 w-4 shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--link)]" />
                    <span className="truncate text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
                      {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </section>

      {/* ---------- What I love ---------- */}
      <section className="mt-24">
        <Reveal delay={0.05}>
          <h2 className="text-2xl font-semibold tracking-tight">What I love</h2>
          <p className="mt-2 text-[var(--muted)]">
            The corners of AI I keep coming back to.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
          {whatILove.map((item, i) => (
            <div
              key={item.title}
              className="rise bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--surface)]"
              style={{ animationDelay: `${0.05 * i + 0.1}s` }}
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Dẫn sang các trang khác ---------- */}
      <section className="mt-16 flex flex-wrap gap-3">
        {[
          { label: "See my projects", href: "/projects" },
          { label: "Read the blog", href: "/blog" },
          { label: "What's new", href: "/news" },
        ].map((cta) => (
          <Link
            key={cta.href}
            href={cta.href}
            className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-4 py-2 text-sm transition-colors hover:border-[var(--muted)] hover:bg-[var(--surface)]"
          >
            {cta.label}
            <LuArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        ))}
      </section>
    </div>
  );
}
