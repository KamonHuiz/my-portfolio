import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { getManyViews } from "@/lib/views";
import { getCommentCounts } from "@/lib/comments";

/**
 * Số lượt xem + số bình luận của tất cả bài viết, gộp trong một lần gọi.
 *
 * Tách riêng ra đây để trang /blog được sinh sẵn thành file tĩnh và hiện
 * ra ngay lập tức. Số liệu nạp sau, người đọc không phải chờ.
 */
export async function GET() {
  const slugs = getAllPosts().map((post) => post.slug);

  const [views, comments] = await Promise.all([
    getManyViews(slugs),
    getCommentCounts(),
  ]);

  const stats = Object.fromEntries(
    slugs.map((slug) => [
      slug,
      {
        views: views[slug] ?? 0,
        comments: comments[`/blog/${slug}`] ?? 0,
      },
    ])
  );

  return NextResponse.json(stats, {
    headers: {
      // CDN giữ lại 60 giây, và vẫn trả bản cũ trong lúc đi lấy bản mới
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
