import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";
import { readingTime } from "./markdown";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** Dạng YYYY-MM-DD */
  date: string;
  tags: string[];
  /** Ảnh bìa trong public/, để trống nếu không có */
  cover: string;
  /** Kích thước thật của ảnh bìa, để hiển thị đúng tỉ lệ không bị cắt */
  coverWidth: number;
  coverHeight: number;
  /** true = ẩn khỏi danh sách (bài nháp) */
  draft: boolean;
  minutes: number;
};

export type Post = PostMeta & { content: string };

function parseFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: typeof data.date === "string" ? data.date : formatDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ?? "",
    ...measureCover(data.cover),
    draft: data.draft === true,
    minutes: readingTime(content),
    content,
  };
}

/**
 * Đo kích thước thật của ảnh bìa ngay lúc build.
 *
 * Nhờ vậy ảnh ở đầu bài viết hiện đúng tỉ lệ gốc, bạn tải ảnh vuông,
 * ảnh dọc hay ảnh ngang đều được, không bị cắt xén hay kéo méo.
 * Đọc không được thì quay về tỉ lệ 16:9 cho an toàn.
 */
function measureCover(cover?: string): { coverWidth: number; coverHeight: number } {
  const fallback = { coverWidth: 1600, coverHeight: 900 };
  if (!cover || cover.startsWith("http")) return fallback;

  try {
    const file = path.join(process.cwd(), "public", cover.replace(/^\//, ""));
    const { width, height } = imageSize(fs.readFileSync(file));
    if (!width || !height) return fallback;
    return { coverWidth: width, coverHeight: height };
  } catch {
    return fallback;
  }
}

/** gray-matter tự đổi ngày không đặt trong nháy thành Date, đưa về YYYY-MM-DD */
function formatDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

/** Tất cả bài viết, mới nhất trước. Bài draft bị ẩn khi chạy production. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parseFile)
    .filter((p) => (process.env.NODE_ENV === "production" ? !p.draft : true))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Bài trước / bài sau, dùng cho phần điều hướng cuối trang bài viết. */
export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  return {
    newer: i > 0 ? posts[i - 1] : undefined,
    older: i >= 0 && i < posts.length - 1 ? posts[i + 1] : undefined,
  };
}

/** Đọc file markdown lẻ trong content/, ví dụ "news.md" */
export function readContentFile(fileName: string): string {
  const filePath = path.join(process.cwd(), "content", fileName);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}
