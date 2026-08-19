import { inlineMarkdown } from "./markdown";

/* ==========================================================================
   NEWS — đọc content/news.md
   Định dạng:
     ## 2026
     - Sept. 12: Nội dung tin, có thể chèn [link](https://...)
   ========================================================================== */

export type NewsItem = { date: string; html: string };
export type NewsYear = { year: string; items: NewsItem[] };

export function parseNews(markdown: string): NewsYear[] {
  const years: NewsYear[] = [];
  let current: NewsYear | null = null;

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();

    const yearMatch = /^##\s+(.+)$/.exec(line);
    if (yearMatch) {
      current = { year: yearMatch[1].trim(), items: [] };
      years.push(current);
      continue;
    }

    const itemMatch = /^[-*]\s+(.+)$/.exec(line);
    if (!itemMatch || !current) continue;

    const body = itemMatch[1];
    const colon = body.indexOf(":");

    if (colon === -1) {
      current.items.push({ date: "", html: inlineMarkdown(body) });
    } else {
      current.items.push({
        date: body.slice(0, colon).replace(/\*\*/g, "").trim(),
        html: inlineMarkdown(body.slice(colon + 1).trim()),
      });
    }
  }

  return years.filter((y) => y.items.length > 0);
}

/* ==========================================================================
   LIST 100 — đọc content/list100.md
   Định dạng:
     ## Tên nhóm            (không bắt buộc)
     - [x] Việc đã làm xong
     - [ ] Việc chưa làm
   ========================================================================== */

export type ListItem = { done: boolean; html: string };
export type ListGroup = { title: string; items: ListItem[] };

export function parseChecklist(markdown: string): {
  groups: ListGroup[];
  done: number;
  total: number;
} {
  const groups: ListGroup[] = [];
  let current: ListGroup | null = null;
  let done = 0;
  let total = 0;

  const push = (group: ListGroup) => {
    groups.push(group);
    return group;
  };

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();

    const titleMatch = /^##\s+(.+)$/.exec(line);
    if (titleMatch) {
      current = push({ title: titleMatch[1].trim(), items: [] });
      continue;
    }

    const itemMatch = /^[-*]\s+\[([ xX])\]\s*(.*)$/.exec(line);
    if (!itemMatch) continue;

    if (!current) current = push({ title: "", items: [] });

    const isDone = itemMatch[1].toLowerCase() === "x";
    total += 1;
    if (isDone) done += 1;

    current.items.push({ done: isDone, html: inlineMarkdown(itemMatch[2]) });
  }

  return { groups: groups.filter((g) => g.items.length > 0), done, total };
}
