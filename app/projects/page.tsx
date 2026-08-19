import Image from "next/image";
import type { Metadata } from "next";
import { LuArrowUpRight, LuImage } from "react-icons/lu";
import { projects } from "@/data/projects";
import Reveal from "@/components/Reveal";
import Comments from "@/components/Comments";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I have built, broken, and occasionally finished.",
};

export default function ProjectsPage() {
  const sorted = [...projects].sort(
    (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false)
  );

  return (
    <div className="mx-auto max-w-4xl px-6 pt-10 pb-4">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">
          Things I have built, broken, and occasionally finished. Click any card to
          see the code or the live thing.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {sorted.map((project, i) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rise group block"
            style={{ animationDelay: `${0.06 * i}s` }}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="grid h-full place-items-center text-[var(--muted)]">
                  <LuImage className="h-7 w-7" />
                </div>
              )}
              <span className="absolute top-3 right-3 rounded-full bg-[var(--bg)]/90 px-2.5 py-1 text-[0.7rem] text-[var(--muted)] backdrop-blur">
                {project.year}
              </span>
            </div>

            <h2 className="mt-4 flex items-center gap-1.5 font-semibold">
              {project.title}
              <LuArrowUpRight className="h-4 w-4 text-[var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--link)]" />
            </h2>

            <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
              {project.description}
            </p>

            {project.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[var(--line)] px-2.5 py-0.5 text-[0.7rem] text-[var(--muted)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </a>
        ))}
      </div>

      <Comments />
    </div>
  );
}
