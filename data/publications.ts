/* ==========================================================================
   DANH SÁCH PUBLICATIONS
   Thêm bài mới: copy một khối { ... } rồi sửa nội dung bên trong.
   Bài mới nhất để lên trên cùng.
   ========================================================================== */

export type Publication = {
  title: string;
  /** Danh sách tác giả. Bọc tên bạn trong **hai dấu sao** để in đậm. */
  authors: string;
  /** Nơi đăng: "CVPR 2026", "arXiv preprint", "Journal of ..." */
  venue: string;
  year: string;
  /** Nhãn nhỏ hiện bên trái. Để trống thì không hiện gì. */
  badge?: "Conference" | "Journal" | "Preprint" | "Workshop" | "Article" | "";
  /** Một hai câu tóm tắt. Không có thì xoá dòng này đi. */
  summary?: string;
  /** Các nút link. Xoá bớt hoặc thêm tuỳ ý. */
  links: { label: string; href: string }[];
};

export const publications: Publication[] = [
  {
    title: "RAPID: Retrieval-Augmented Parallel Inference Drafting for Text-Based Video Event Retrieval",
    authors: "Long S. T. Nguyen, **Huy G. Nguyen**, Bao G. Khuu, Huy A. T. Luu, Huy Q. Le, Tuan T. Nguyen & Tho T. Quan",
    venue: " International Symposium on Information and Communication Technology - SOICT 2024",
    year: "2024",
    links: [
      { label: "Paper", href: "https://link.springer.com/chapter/10.1007/978-981-96-4291-5_15" },
    ],
  },

];
