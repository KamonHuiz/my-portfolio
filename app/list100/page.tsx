import type { Metadata } from "next";
import { LuCheck, LuX } from "react-icons/lu";
import { readContentFile } from "@/lib/blog";
import { parseChecklist } from "@/lib/lists";
import Reveal from "@/components/Reveal";
import Comments from "@/components/Comments";

export const metadata: Metadata = {
  title: "List 100",
  description: "100 things I want to do before I die.",
};

export default function List100Page() {
  const { groups, done, total } = parseChecklist(readContentFile("list100.md"));
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="page-shell pt-10 pb-4">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">List 100</h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">
          100 things I want to do before I die. I am still working on this list. Please let me know if you have any
          recommendation — the comment box is right at the bottom.
        </p>

        {total > 0 && (
          <div className="mt-8 max-w-sm">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-[var(--muted)]">Progress</span>
              <span className="font-mono">
                {done}/{total}
                <span className="ml-2 text-[var(--muted)]">({percent}%)</span>
              </span>
            </div>
            <div
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--line)]"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-[var(--link)] transition-[width] duration-1000 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}
      </Reveal>

      {total === 0 ? (
        <p className="mt-12 text-[var(--muted)]">
          Danh sách còn trống. Mở file <code className="font-mono">content/list100.md</code> để thêm.
        </p>
      ) : (
        <div className="mt-14 space-y-12">
          {groups.map((group, gi) => (
            <section key={group.title || gi} className="rise" style={{ animationDelay: `${0.06 * gi}s` }}>
              {group.title && (
                <h2 className="mb-4 border-b border-[var(--line)] pb-2 text-sm font-semibold tracking-wider text-[var(--muted)] uppercase">
                  {group.title}
                </h2>
              )}

              <ul>
                {group.items.map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 rounded-md px-2 py-[0.4rem] transition-colors hover:bg-[var(--surface)] ${
                      item.done ? "text-[var(--muted)]" : ""
                    }`}
                  >
                    <span
                      className={`mt-[0.35rem] shrink-0 ${
                        item.done ? "text-emerald-600 dark:text-emerald-400" : "text-[var(--muted)] opacity-50"
                      }`}
                      aria-label={item.done ? "done" : "not done"}
                    >
                      {item.done ? <LuCheck className="h-4 w-4" /> : <LuX className="h-4 w-4" />}
                    </span>

                    <span
                      className={`markdown-inline leading-relaxed ${item.done ? "line-through decoration-[var(--line)]" : ""}`}
                      dangerouslySetInnerHTML={{ __html: item.html }}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <Comments />
    </div>
  );
}
