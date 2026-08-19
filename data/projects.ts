/* ==========================================================================
   DANH SÁCH PROJECTS
   Thêm project mới: copy một khối { ... } rồi sửa nội dung bên trong.
   Ảnh: bỏ file vào public/images/projects/ rồi ghi đường dẫn "/images/projects/ten-file.jpg"
   ========================================================================== */

export type Project = {
  title: string;
  description: string;
  /** Đường dẫn ảnh trong public/, ví dụ "/images/projects/abc.jpg". Để "" nếu chưa có ảnh. */
  image: string;
  /** Bấm vào card sẽ mở link này (GitHub, demo, paper...) */
  href: string;
  /** Vài từ khoá hiện dưới mô tả */
  tags: string[];
  /** Năm thực hiện, hiện ở góc card */
  year: string;
  /** true = ghim lên đầu danh sách */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Watt'up Debuggers",
    description:
      "The club I co-founded in 2023 — a place for high school students to learn programming and electronics by taking things apart together.",
    image: "/images/wud.jpg",
    href: "https://github.com/KamonHuiz",
    tags: ["Community", "Education"],
    year: "2023",
    featured: true,
  },
  {
    title: "Project Two",
    description:
      "Thay đoạn này bằng mô tả ngắn về project của bạn. Một tới hai câu là đủ.",
    image: "",
    href: "https://github.com/KamonHuiz",
    tags: ["PyTorch", "Computer Vision"],
    year: "2025",
  },
  {
    title: "Project Three",
    description:
      "Thay đoạn này bằng mô tả ngắn về project của bạn. Một tới hai câu là đủ.",
    image: "",
    href: "https://github.com/KamonHuiz",
    tags: ["Python"],
    year: "2024",
  },
];
