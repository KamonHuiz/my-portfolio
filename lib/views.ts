import { Redis } from "@upstash/redis";

/**
 * Bộ đếm lượt xem.
 *
 * Chưa khai báo biến môi trường Upstash thì site vẫn chạy bình thường,
 * chỉ là số view luôn bằng 0. Khi nào tạo xong Upstash và dán 2 biến
 * UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN vào Vercel là tự chạy.
 */
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const viewsEnabled = Boolean(url && token);

const redis = viewsEnabled ? new Redis({ url: url!, token: token! }) : null;

const key = (slug: string) => `views:${slug}`;

/** Đọc số view, không tăng. */
export async function getViews(slug: string): Promise<number> {
  if (!redis) return 0;
  try {
    return (await redis.get<number>(key(slug))) ?? 0;
  } catch {
    return 0;
  }
}

/** Tăng 1 view rồi trả về số mới. */
export async function incrementViews(slug: string): Promise<number> {
  if (!redis) return 0;
  try {
    return await redis.incr(key(slug));
  } catch {
    return 0;
  }
}

/** Đọc view của nhiều bài cùng lúc, dùng cho trang danh sách blog. */
export async function getManyViews(slugs: string[]): Promise<Record<string, number>> {
  const empty = Object.fromEntries(slugs.map((s) => [s, 0]));
  if (!redis || slugs.length === 0) return empty;

  try {
    const values = await redis.mget<(number | null)[]>(...slugs.map(key));
    return Object.fromEntries(slugs.map((s, i) => [s, values[i] ?? 0]));
  } catch {
    return empty;
  }
}

/**
 * Tăng view nhưng chỉ tính 1 lần cho mỗi người đọc trong 24 giờ.
 * visitorKey là chuỗi đã băm từ IP + user-agent (xem app/api/views/[slug]/route.ts).
 */
export async function incrementViewsOnce(
  slug: string,
  visitorKey: string
): Promise<number> {
  if (!redis) return 0;

  try {
    const firstVisit = await redis.set(`seen:${slug}:${visitorKey}`, 1, {
      nx: true,
      ex: 60 * 60 * 24,
    });

    // set trả về null khi key đã tồn tại => đã xem rồi, chỉ đọc số hiện tại
    if (firstVisit === null) return await getViews(slug);

    return await redis.incr(key(slug));
  } catch {
    return 0;
  }
}
