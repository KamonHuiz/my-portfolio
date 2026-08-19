"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hiện số lượt xem. Nếu track = true thì gọi API để +1 (mỗi lần mở trang một lần).
 * Số ban đầu do server truyền xuống nên không bị nháy "0" lúc mới vào.
 */
export default function ViewCounter({
  slug,
  initial = 0,
  track = false,
}: {
  slug: string;
  initial?: number;
  track?: boolean;
}) {
  const [views, setViews] = useState(initial);
  const counted = useRef(false);

  useEffect(() => {
    if (!track || counted.current) return;
    counted.current = true;

    fetch(`/api/views/${encodeURIComponent(slug)}`, { method: "POST" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.views === "number") setViews(data.views);
      })
      .catch(() => {});
  }, [slug, track]);

  return (
    <span title={`${views.toLocaleString("en-US")} views`}>
      {views.toLocaleString("en-US")} {views === 1 ? "view" : "views"}
    </span>
  );
}
