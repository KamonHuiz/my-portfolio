/* ==========================================================================
   THÔNG TIN CHUNG CỦA WEBSITE
   Sửa file này để đổi tên, mô tả, link mạng xã hội, menu điều hướng.
   ========================================================================== */

/**
 * Địa chỉ website, dùng cho SEO / RSS / link chia sẻ.
 *
 * Thứ tự ưu tiên:
 *   1. Biến NEXT_PUBLIC_SITE_URL bạn tự đặt (khi đã có tên miền riêng)
 *   2. Địa chỉ Vercel tự cấp cho bản deploy hiện tại
 *   3. localhost, dùng khi chạy ở máy
 *
 * Biến để trống, thiếu https://, hay lỡ dính dấu nháy đều được xử lý ở đây
 * nên trang không bao giờ vỡ vì một địa chỉ viết sai.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    // Vercel tự đặt sẵn 2 biến này, không cần bạn khai báo gì:
    process.env.VERCEL_PROJECT_PRODUCTION_URL, // tên miền chính, không đổi
    process.env.VERCEL_URL, // địa chỉ riêng của lần deploy này
  ];

  for (const candidate of candidates) {
    const cleaned = candidate?.trim().replace(/^["']|["']$/g, "").replace(/\/+$/, "");
    if (!cleaned) continue;

    const withProtocol = /^https?:\/\//.test(cleaned) ? cleaned : `https://${cleaned}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      // địa chỉ này hỏng, thử cái tiếp theo
    }
  }

  return "http://localhost:3000";
}

export const site = {
  handle: "@kamontheguy",
  name: "Kamon Nguyen",
  url: resolveSiteUrl(),
  description:
    "Personal site of Kamon Nguyen — AI, computer vision, and things I build along the way.",
  /**
   * Repo GitHub dùng để lưu bình luận (Giscus).
   *
   * Đây KHÔNG phải repo chứa code website. Giscus bắt buộc repo phải
   * public thì người lạ mới đọc và viết bình luận được, nên ta tách
   * riêng một repo rỗng cho việc này để repo code được để private.
   */
  repo: "KamonHuiz/giscus-placeholder",
} as const;

export const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blog" },
  { label: "News", href: "/news" },
  { label: "List100", href: "/list100" },
] as const;

export type SocialLink = {
  label: string;
  /** Tên hiển thị bên cạnh icon */
  handle: string;
  href: string;
  /** Khớp với danh sách icon trong components/SocialIcon.tsx */
  icon: "mail" | "github" | "facebook" | "linkedin" | "threads";
};

export const socials: SocialLink[] = [
  {
    label: "Email",
    handle: "giahuynguyen72.work@gmail.com",
    href: "mailto:giahuynguyen72.work@gmail.com",
    icon: "mail",
  },
  {
    label: "GitHub",
    handle: "KamonHuiz",
    href: "https://github.com/KamonHuiz",
    icon: "github",
  },
  {
    label: "Facebook",
    handle: "kinkinlover",
    href: "https://www.facebook.com/kinkinlover/",
    icon: "facebook",
  },
  {
    label: "LinkedIn",
    handle: "kamonnguyen",
    href: "https://www.linkedin.com/in/kamonnguyen/",
    icon: "linkedin",
  },
  {
    label: "Threads",
    handle: "@kamontheguy",
    href: "https://www.threads.net/@kamontheguy",
    icon: "threads",
  },
];
