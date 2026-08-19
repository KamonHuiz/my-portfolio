/**
 * Markdown "rút gọn" cho một dòng ngắn (mục News, List100, tên tác giả).
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
