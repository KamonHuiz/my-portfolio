import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { getManyViews } from "@/lib/views";
import { getCommentCounts } from "@/lib/comments";
import BlogList, { type BlogListItem } from "@/components/BlogList";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on AI, computer vision, and things I figured out the hard way.",
};

// Đọc lại số view mỗi 60 giây thay vì đóng băng lúc build
export const revalidate = 60;

export default async function BlogPage() {
  const posts = getAllPosts();
  const [views, commentCounts] = await Promise.all([
    getManyViews(posts.map((p) => p.slug)),
    getCommentCounts(),
  ]);

  // Chỉ gửi sang trình duyệt những gì cần hiện, không gửi cả nội dung bài
  const items: BlogListItem[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    cover: post.cover,
    minutes: post.minutes,
    draft: post.draft,
    views: views[post.slug] ?? 0,
    comments: commentCounts[`/blog/${post.slug}`] ?? 0,
  }));

  return (
    <div className="page-shell pt-10 pb-4">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">
          Notes on AI, computer vision, and things I figured out the hard way.
        </p>
      </Reveal>

      <BlogList posts={items} />
    </div>
  );
}
