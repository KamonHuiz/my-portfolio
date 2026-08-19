import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogList, { type BlogListItem } from "@/components/BlogList";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on AI, computer vision, and things I figured out the hard way.",
};

export default function BlogPage() {
  // Trang này không gọi mạng gì cả nên được sinh sẵn thành file tĩnh,
  // bấm vào là hiện ngay. Số view và số bình luận do BlogList nạp sau.
  const items: BlogListItem[] = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    cover: post.cover,
    minutes: post.minutes,
    draft: post.draft,
  }));

  return (
    <div className="page-shell pt-10 pb-4">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">
          Notes on everything I have experienced in my life.
        </p>
      </Reveal>

      <BlogList posts={items} />
    </div>
  );
}
