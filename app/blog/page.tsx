import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { getManyViews } from "@/lib/views";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on AI, computer vision, and things I figured out the hard way.",
};

// Đọc lại số view mỗi 60 giây thay vì đóng băng lúc build
export const revalidate = 60;

export default async function BlogPage() {
  const posts = getAllPosts();
  const views = await getManyViews(posts.map((p) => p.slug));

  return (
    <div className="mx-auto max-w-4xl px-6 pt-10 pb-4">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">
          Notes on AI, computer vision, and things I figured out the hard way.
        </p>
      </Reveal>

      {posts.length === 0 ? (
        <p className="mt-12 text-[var(--muted)]">
          Chưa có bài viết nào. Thêm file <code className="font-mono">.md</code> vào
          thư mục <code className="font-mono">content/blog/</code> là bài sẽ hiện ở đây.
        </p>
      ) : (
        <ul className="mt-12 divide-y divide-[var(--line)] border-t border-[var(--line)]">
          {posts.map((post, i) => (
            <li key={post.slug} className="rise" style={{ animationDelay: `${0.05 * i}s` }}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex gap-5 py-7 transition-opacity"
              >
                {post.cover && (
                  <div className="relative hidden h-24 w-36 shrink-0 overflow-hidden rounded-lg border border-[var(--line)] sm:block">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      sizes="144px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-[var(--link)]">
                    {post.title}
                  </h2>

                  {post.description && (
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
                      {post.description}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--muted)]">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{post.minutes} min read</span>
                    <span aria-hidden>·</span>
                    <span>{(views[post.slug] ?? 0).toLocaleString("en-US")} views</span>
                    {post.draft && (
                      <span className="rounded-full border border-[var(--line)] px-2 py-0.5">
                        draft
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
