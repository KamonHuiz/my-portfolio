"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Announcements";

/**
 * Khung bình luận (Giscus — lưu vào GitHub Discussions của repo).
 * Chưa cấu hình xong thì hiện hướng dẫn thay vì lỗi trắng trang.
 */
export default function Comments() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!repoId || !categoryId) {
    return (
      <section className="mt-16 border-t border-[var(--line)] pt-10">
        <h2 className="mb-3 text-xl font-semibold">Comments</h2>
        <div className="rounded-lg border border-dashed border-[var(--line)] p-5 text-sm text-[var(--muted)]">
          <p>
            Phần bình luận chưa được bật. Vào{" "}
            <a
              href="https://giscus.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--link)] hover:underline"
            >
              giscus.app
            </a>{" "}
            nhập repo <code className="font-mono">{site.repo}</code>, copy 2 giá trị{" "}
            <code className="font-mono">repo-id</code> và{" "}
            <code className="font-mono">category-id</code> rồi dán vào file{" "}
            <code className="font-mono">.env.local</code>. Xem thêm trong{" "}
            <code className="font-mono">SETUP.md</code>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16 border-t border-[var(--line)] pt-10">
      <h2 className="mb-5 text-xl font-semibold">Comments</h2>
      {mounted && (
        <Giscus
          id="comments"
          repo={site.repo as `${string}/${string}`}
          repoId={repoId}
          category={category}
          categoryId={categoryId}
          mapping="pathname"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={resolvedTheme === "dark" ? "transparent_dark" : "light"}
          lang="en"
          loading="lazy"
        />
      )}
    </section>
  );
}
