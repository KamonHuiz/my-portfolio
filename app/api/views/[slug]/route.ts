import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { getViews, incrementViewsOnce, viewsEnabled } from "@/lib/views";

type Ctx = { params: Promise<{ slug: string }> };

/** Chỉ cho phép đếm view của bài viết có thật, tránh bị tạo key rác. */
function isKnownSlug(slug: string) {
  return getAllPosts().some((p) => p.slug === slug);
}

/** Băm IP + trình duyệt thành một mã ẩn danh, không lưu IP thật. */
function visitorKey(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const ua = request.headers.get("user-agent") ?? "";
  return createHash("sha256").update(`${ip}|${ua}`).digest("hex").slice(0, 24);
}

export async function GET(_request: Request, { params }: Ctx) {
  const { slug } = await params;
  if (!isKnownSlug(slug)) {
    return NextResponse.json({ error: "Unknown post" }, { status: 404 });
  }
  return NextResponse.json({ views: await getViews(slug), enabled: viewsEnabled });
}

export async function POST(request: Request, { params }: Ctx) {
  const { slug } = await params;
  if (!isKnownSlug(slug)) {
    return NextResponse.json({ error: "Unknown post" }, { status: 404 });
  }

  const views = await incrementViewsOnce(slug, visitorKey(request));
  return NextResponse.json({ views, enabled: viewsEnabled });
}
