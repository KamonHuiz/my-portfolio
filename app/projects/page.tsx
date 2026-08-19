import Image from "next/image";
import type { Metadata } from "next";
import { LuImage } from "react-icons/lu";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { inlineMarkdown } from "@/lib/inline";
import Reveal from "@/components/Reveal";
import Comments from "@/components/Comments";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I have built, and papers I have written.",
};

export default function ProjectsPage() {
  // Bài ghim lên đầu, còn lại xếp theo năm mới nhất trước
  const sortedProjects = [...projects].sort(
    (a, b) =>
      Number(b.featured ?? false) - Number(a.featured ?? false) ||
      b.year.localeCompare(a.year)
  );

  return (
    <div className="page-shell pt-10 pb-4">
      {/* ====================================================================
          PHẦN 1 — PROJECTS
          ==================================================================== */}
      <section id="projects" className="scroll-mt-24">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h1>
          <p className="mt-3 max-w-xl text-[var(--muted)]">
            Things I have built. Click any card to
            see the code or the live thing.
          </p>
        </Reveal>

        {sortedProjects.length === 0 ? (
          <p className="mt-12 text-[var(--muted)]">
            Chưa có project nào. Mở file <code className="font-mono">data/projects.ts</code> để thêm.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {sortedProjects.map((project, i) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rise block"
                style={{ animationDelay: `${0.06 * i}s` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded border border-[var(--line)] bg-[var(--surface)]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 420px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-[var(--muted)]">
                      <LuImage className="h-7 w-7" />
                    </div>
                  )}
                </div>

                <h2 className="mt-4 font-semibold">{project.title}</h2>

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
        )}
      </section>

      {/* ====================================================================
          PHẦN 2 — PUBLICATIONS
          ==================================================================== */}
      <section id="publications" className="mt-24 scroll-mt-24  border-[var(--line)] pt-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Publications</h2>
          <p className="mt-3 max-w-xl text-[var(--muted)]">
            Papers and articles I have written or contributed to.
          </p>
        </Reveal>

        {publications.length === 0 ? (
          <p className="mt-12 text-[var(--muted)]">
            Chưa có publication nào. Mở file{" "}
            <code className="font-mono">data/publications.ts</code> để thêm.
          </p>
        ) : (
          <ol className="mt-12 divide-y divide-[var(--line)] border-t border-[var(--line)]">
            {publications.map((pub, i) => (
              <li
                key={pub.title}
                className="rise grid grid-cols-1 gap-x-8 gap-y-2 py-7 sm:grid-cols-[5rem_1fr]"
                style={{ animationDelay: `${0.06 * i}s` }}
              >
                <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1 sm:pt-0.5">
                  <span className="font-mono text-sm text-[var(--muted)]">{pub.year}</span>
                  {pub.badge && (
                    <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[0.65rem] text-[var(--muted)]">
                      {pub.badge}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg leading-snug font-semibold tracking-tight">
                    {pub.title}
                  </h3>

                  <p
                    className="markdown-inline mt-1.5 text-sm text-[var(--muted)]"
                    dangerouslySetInnerHTML={{ __html: inlineMarkdown(pub.authors) }}
                  />

                  <p className="mt-0.5 text-sm italic text-[var(--muted)]">{pub.venue}</p>

                  {pub.summary && (
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {pub.summary}
                    </p>
                  )}

                  {pub.links.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {pub.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-full border border-[var(--line)] px-3 py-1 text-xs transition-colors hover:border-[var(--muted)] hover:bg-[var(--surface)]"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <Comments />
    </div>
  );
}
