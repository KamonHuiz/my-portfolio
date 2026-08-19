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
  /** Năm thực hiện. Không hiện ra ngoài, chỉ dùng để xếp thứ tự (mới nhất trước). */
  year: string;
  /** true = ghim lên đầu danh sách */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Multi-Agent for Digital Verification",
    description:
      "This project is a work for a company named NanoChip. The goal is to use multi-agent to help planning and verifying the microchip design. The project is still in progress.",
    image: "/images/nanochip.jpg",
    href: "https://github.com/KamonHuiz/VLSI-MultiAgent-Verification",
    tags: ["LangChain", "LangGraph", "LangSmith", "Multi-Agent", "RAG"],
    year: "2026",
    featured: true,
  },


];
