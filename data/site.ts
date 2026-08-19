/* ==========================================================================
   THÔNG TIN CHUNG CỦA WEBSITE
   Sửa file này để đổi tên, mô tả, link mạng xã hội, menu điều hướng.
   ========================================================================== */

export const site = {
  handle: "@kamontheguy",
  name: "Kamon Nguyen",
  /** Dùng cho SEO + link chia sẻ. Sau khi deploy nhớ đổi thành domain thật. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-portfolio-kamon.vercel.app",
  description:
    "Personal site of Kamon Nguyen — AI, computer vision, and things I build along the way.",
  /** Repo GitHub chứa chính website này (Giscus dùng để lưu comment). */
  repo: "KamonHuiz/my-portfolio",
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
