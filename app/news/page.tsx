import type { Metadata } from "next";
import { readContentFile } from "@/lib/blog";
import { parseNews } from "@/lib/lists";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "News",
  description: "Small updates, in reverse chronological order.",
};

export default function NewsPage() {
  const years = parseNews(readContentFile("news.md"));

  return (
    <div className="page-shell pt-10 pb-4">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">News</h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">
          Small updates, in reverse chronological order.
        </p>
      </Reveal>

      {years.length === 0 ? (
        <p className="mt-12 text-[var(--muted)]">
          Chưa có tin nào. Mở file <code className="font-mono">content/news.md</code> để thêm.
        </p>
      ) : (
        <div className="mt-14 space-y-14">
          {years.map((group, gi) => (
            <section
              key={group.year}
              className="rise grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[5rem_1fr]"
              style={{ animationDelay: `${0.08 * gi}s` }}
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--muted)] sm:sticky sm:top-24 sm:self-start sm:text-right">
                {group.year}
              </h2>

              <ul className="space-y-0 border-l border-[var(--line)] sm:border-l-0">
                {group.items.map((item, i) => (
                  <li
                    key={i}
                    className="group relative flex flex-col gap-1 py-3 pl-5 sm:flex-row sm:gap-4 sm:pl-0"
                  >
                    {/* chấm tròn nhỏ đầu dòng */}
                    <span className="absolute top-[1.45rem] left-[-3.5px] h-[7px] w-[7px] rounded-full bg-[var(--line)] transition-colors group-hover:bg-[var(--link)] sm:hidden" />

                    {item.date && (
                      <span className="shrink-0 font-mono text-[0.78rem] tracking-tight text-[var(--muted)] sm:w-24 sm:pt-[0.2rem]">
                        {item.date}
                      </span>
                    )}

                    <span
                      className="markdown-inline leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.html }}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
