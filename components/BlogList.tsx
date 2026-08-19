"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuClock, LuEye, LuLayoutGrid, LuList, LuMessageCircle } from "react-icons/lu";

export type BlogListItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover: string;
  minutes: number;
  draft: boolean;
  views: number;
  /** Số bình luận lấy từ GitHub Discussions. Chưa có token thì luôn là 0. */
  comments: number;
};

/** "cards" = kiểu medium.com (có ảnh) · "compact" = kiểu huyenchip (danh sách gọn) */
type Mode = "cards" | "compact";

const STORAGE_KEY = "blog-view-mode";
const DEFAULT_MODE: Mode = "cards";

export default function BlogList({ posts }: { posts: BlogListItem[] }) {
  const [mode, setMode] = useState<Mode>(DEFAULT_MODE);

  // Nhớ lựa chọn của người đọc cho những lần sau
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "cards" || saved === "compact") setMode(saved);
  }, []);

  const choose = (next: Mode) => {
    setMode(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  if (posts.length === 0) {
    return (
      <p className="mt-12 text-[var(--muted)]">
        Chưa có bài viết nào. Thêm file <code className="font-mono">.md</code> vào thư
        mục <code className="font-mono">content/blog/</code> là bài sẽ hiện ở đây.
      </p>
    );
  }

  return (
    <>
      {/* ---------- Nút chuyển chế độ xem ---------- */}
      <div className="mt-10 flex items-center justify-between border-b border-[var(--line)] pb-4">
        <p className="text-sm text-[var(--muted)]">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>

        <div
          role="group"
          aria-label="Change layout"
          className="flex items-center gap-0.5 rounded-full border border-[var(--line)] p-0.5"
        >
          <ModeButton active={mode === "cards"} onClick={() => choose("cards")} label="Card view">
            <LuLayoutGrid className="h-[0.95rem] w-[0.95rem]" />
          </ModeButton>
          <ModeButton active={mode === "compact"} onClick={() => choose("compact")} label="Compact view">
            <LuList className="h-[0.95rem] w-[0.95rem]" />
          </ModeButton>
        </div>
      </div>

      {mode === "cards" ? <CardView posts={posts} /> : <CompactView posts={posts} />}
    </>
  );
}

/* ==========================================================================
   Chế độ 1 — dòng có ảnh bên phải, kiểu medium.com
   Không viền, không nền, các bài ngăn nhau bằng một đường kẻ mảnh.
   ========================================================================== */

function CardView({ posts }: { posts: BlogListItem[] }) {
  return (
    <div className="divide-y divide-[var(--line)]">
      {posts.map((post, i) => (
        <article key={post.slug} className="rise" style={{ animationDelay: `${0.06 * i}s` }}>
          <Link href={`/blog/${post.slug}`} className="group flex items-start gap-6 py-8 sm:gap-10">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-[var(--muted)]">
                {formatDate(post.date)}
                {post.draft && (
                  <span className="ml-2 rounded-full border border-[var(--line)] px-2 py-0.5 text-[0.65rem]">
                    draft
                  </span>
                )}
              </p>

              <h2 className="mt-2 text-xl leading-snug font-bold tracking-tight transition-colors group-hover:text-[var(--link)] sm:text-2xl">
                {post.title}
              </h2>

              {post.description && (
                <p className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-[var(--muted)]">
                  {post.description}
                </p>
              )}

              <Meta post={post} className="mt-4" />
            </div>

            <div className="relative h-24 w-24 shrink-0 overflow-hidden sm:h-[8.5rem] sm:w-[13rem]">
              <Cover post={post} />
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

/* ==========================================================================
   Chế độ 2 — danh sách gọn, giống huyenchip.com
   ========================================================================== */

function CompactView({ posts }: { posts: BlogListItem[] }) {
  return (
    <ul className="divide-y divide-[var(--line)]">
      {posts.map((post, i) => (
        <li key={post.slug} className="rise" style={{ animationDelay: `${0.04 * i}s` }}>
          <Link href={`/blog/${post.slug}`} className="group flex gap-5 py-7">
            {post.cover && (
              <div className="relative hidden h-24 w-36 shrink-0 overflow-hidden rounded border border-[var(--line)] sm:block">
                <Image src={post.cover} alt={post.title} fill sizes="144px" className="object-cover" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-[var(--link)]">
                {post.title}
                {post.draft && (
                  <span className="ml-2 rounded-full border border-[var(--line)] px-2 py-0.5 align-middle text-[0.65rem] font-normal text-[var(--muted)]">
                    draft
                  </span>
                )}
              </h2>

              {post.description && (
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
                  {post.description}
                </p>
              )}

              <Meta post={post} className="mt-3" plain />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ==========================================================================
   Mảnh dùng chung
   ========================================================================== */

function ModeButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
        active ? "bg-[var(--bg)] text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]"
      }`}
    >
      {children}
    </button>
  );
}

/** Hàng thông tin dưới mỗi bài: thời gian đọc · lượt xem · lượt bình luận */
function Meta({
  post,
  className = "",
  plain = false,
}: {
  post: BlogListItem;
  className?: string;
  plain?: boolean;
}) {
  const items = [
    { icon: <LuClock />, text: `${post.minutes} min read` },
    { icon: <LuEye />, text: compact(post.views) },
    // Không có bình luận nào thì ẩn luôn cho gọn
    ...(post.comments > 0
      ? [{ icon: <LuMessageCircle />, text: compact(post.comments) }]
      : []),
  ];

  // Chế độ compact thì hiện chữ đầy đủ, không dùng icon
  if (plain) {
    return (
      <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--muted)] ${className}`}>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.minutes} min read</span>
        <span aria-hidden>·</span>
        <span>{compact(post.views)} views</span>
        {post.comments > 0 && (
          <>
            <span aria-hidden>·</span>
            <span>{compact(post.comments)} comments</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[var(--muted)] ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-[1.05em]">{item.icon}</span>
          {item.text}
        </span>
      ))}
    </div>
  );
}

/** Ảnh bìa. Bài chưa có ảnh thì tự sinh một mảng màu riêng theo tên bài. */
function Cover({ post }: { post: BlogListItem }) {
  if (post.cover) {
    return (
      <Image
        src={post.cover}
        alt={post.title}
        fill
        sizes="(max-width: 640px) 96px, 208px"
        className="object-cover"
      />
    );
  }

  const hue = hashHue(post.slug);

  return (
    <div
      className="grid h-full w-full place-items-center"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 42% 52%), hsl(${(hue + 55) % 360} 46% 38%))`,
      }}
      aria-hidden
    >
      <span className="font-serif text-4xl font-semibold text-white/85">
        {post.title.trim().charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

function hashHue(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) % 360;
  return hash;
}

/** 1234 -> "1.2K", giống cách medium hiển thị */
function compact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
