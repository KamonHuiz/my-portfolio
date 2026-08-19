import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LuArrowLeft, LuArrowRight, LuChevronLeft } from "react-icons/lu";
import { getAdjacentPosts, getAllPosts, getPost } from "@/lib/blog";
import { extractToc, markdownToHtml } from "@/lib/markdown";
import { site } from "@/data/site";
import ViewCounter from "@/components/ViewCounter";
import Comments from "@/components/Comments";

type Props = { params: Promise<{ slug: string }> };

// Không gọi mạng ở đây nên bài viết được sinh sẵn thành file tĩnh, mở là hiện ngay.
// Số lượt xem do ViewCounter tự nạp và tự cộng thêm sau khi trang hiện ra.

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await markdownToHtml(post.content);
  const toc = extractToc(post.content);
  const { newer, older } = getAdjacentPosts(slug);

  return (
    <div className="page-shell pt-10 pb-4">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
      >
        <LuChevronLeft className="h-4 w-4" />
        All posts
      </Link>

      <article className="rise mt-8">
        <header className="reading-width border-b border-[var(--line)] pb-8">
          <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-[2.6rem] sm:leading-[1.15]">
            {post.title}
          </h1>

          {post.description && (
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              {post.description}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--muted)]">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden>·</span>
            <span>{post.minutes} min read</span>
            <span aria-hidden>·</span>
            <ViewCounter slug={slug} track />
          </div>

          {post.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[var(--line)] px-2.5 py-0.5 text-[0.72rem] text-[var(--muted)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        {post.cover && (
          <Image
            src={post.cover}
            alt={post.title}
            width={post.coverWidth}
            height={post.coverHeight}
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            /* Ảnh giữ đúng tỉ lệ gốc, không bị cắt cũng không bị kéo méo.
               Ảnh ngang to thì thu về vừa cột chữ, ảnh dọc thì khống chế
               chiều cao cho khỏi dài lê thê, ảnh nhỏ thì để nguyên cỡ thật. */
            className="mt-8 h-auto max-h-[34rem] w-auto max-w-full rounded-xl border border-[var(--line)] sm:max-w-[48rem]"
          />
        )}

        <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,48rem)_1fr] lg:gap-12">
          <div
            className="markdown min-w-0"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {toc.length > 1 && (
            <aside className="order-last hidden lg:block">
              <nav className="sticky top-24">
                <p className="mb-3 text-xs font-semibold tracking-wider text-[var(--muted)] uppercase">
                  On this page
                </p>
                <ul className="space-y-2 border-l border-[var(--line)] text-sm">
                  {toc.map((item) => (
                    <li key={item.id} style={{ paddingLeft: item.level === 3 ? "1.5rem" : "0.9rem" }}>
                      <a
                        href={`#${item.id}`}
                        className="block text-[var(--muted)] transition-colors hover:text-[var(--link)]"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>
      </article>

      {/* Bài trước / bài sau */}
      {(newer || older) && (
        <nav className="reading-width mt-16 grid gap-4 border-t border-[var(--line)] pt-8 sm:grid-cols-2">
          {newer ? (
            <Link
              href={`/blog/${newer.slug}`}
              className="group rounded-lg border border-[var(--line)] p-4 transition-colors hover:bg-[var(--surface)]"
            >
              <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                <LuArrowLeft className="h-3 w-3" /> Newer
              </span>
              <span className="mt-1 block font-semibold transition-colors group-hover:text-[var(--link)]">
                {newer.title}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {older && (
            <Link
              href={`/blog/${older.slug}`}
              className="group rounded-lg border border-[var(--line)] p-4 text-right transition-colors hover:bg-[var(--surface)] sm:col-start-2"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-[var(--muted)]">
                Older <LuArrowRight className="h-3 w-3" />
              </span>
              <span className="mt-1 block font-semibold transition-colors group-hover:text-[var(--link)]">
                {older.title}
              </span>
            </Link>
          )}
        </nav>
      )}

      <Comments />
    </div>
  );
}
