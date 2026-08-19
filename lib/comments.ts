import { site } from "@/data/site";

/**
 * Đếm số bình luận của mỗi bài, lấy từ GitHub Discussions (nơi Giscus lưu).
 *
 * GitHub bắt buộc phải có token mới cho hỏi, nên chưa khai báo GITHUB_TOKEN
 * thì hàm này trả về rỗng và trang chỉ đơn giản không hiện số bình luận.
 * Không có token site vẫn chạy bình thường.
 *
 * Giscus đang đặt mapping="pathname", nghĩa là tiêu đề của discussion
 * chính là đường dẫn trang, ví dụ "/blog/hello-world".
 */

const QUERY = `
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      discussions(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          title
          comments { totalCount }
        }
      }
    }
  }
`;

type Response = {
  data?: {
    repository?: {
      discussions?: { nodes?: { title: string; comments: { totalCount: number } }[] };
    };
  };
};

/** Trả về map dạng { "/blog/ten-bai": 12 }. Lỗi hoặc thiếu token thì trả về {}. */
export async function getCommentCounts(): Promise<Record<string, number>> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return {};

  const [owner, name] = site.repo.split("/");
  if (!owner || !name) return {};

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { owner, name } }),
      // Hỏi lại GitHub tối đa 5 phút một lần, tránh chạm giới hạn số lần gọi
      next: { revalidate: 300 },
    });

    if (!res.ok) return {};

    const json = (await res.json()) as Response;
    const nodes = json.data?.repository?.discussions?.nodes ?? [];

    return Object.fromEntries(
      nodes.map((node) => [node.title, node.comments.totalCount])
    );
  } catch {
    return {};
  }
}
