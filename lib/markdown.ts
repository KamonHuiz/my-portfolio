import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import GithubSlugger from "github-slugger";

/**
 * Biến chuỗi Markdown thành HTML.
 * Có sẵn: bảng, checklist, tô màu code (sáng/tối), id + neo cho tiêu đề.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaHidden: "true", tabIndex: -1 },
      content: { type: "text", value: "#" },
    })
    .use(rehypePrettyCode, {
      theme: { light: "github-light", dark: "github-dark-dimmed" },
      keepBackground: false,
      defaultLang: "text",
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(file);
}

export type TocItem = { id: string; text: string; level: number };

/**
 * Lấy danh sách tiêu đề (##, ###) để dựng mục lục.
 * Bỏ qua tiêu đề nằm trong khối code.
 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let insideCodeBlock = false;

  for (const line of markdown.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      insideCodeBlock = !insideCodeBlock;
      continue;
    }
    if (insideCodeBlock) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    // bỏ cú pháp markdown trong tiêu đề: **đậm**, `code`, [link](url)
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();

    items.push({ id: slugger.slug(text), text, level: match[1].length });
  }

  return items;
}

/** Ước lượng thời gian đọc, dùng 200 từ/phút. */
export function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Markdown "rút gọn" cho một dòng ngắn (mục News, List100).
 * Chỉ hỗ trợ: [chữ](link), **đậm**, *nghiêng*, `code`.
 * Mọi ký tự HTML trong nội dung đều được escape trước nên an toàn.
 */
export function inlineMarkdown(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}
