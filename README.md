# my-portfolio

Personal website of Kamon Nguyen — [@kamontheguy](https://www.threads.net/@kamontheguy).

Pages: **About** (home) · **Projects** · **Blog** · **News** · **List 100**

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 |
| Styling | Tailwind CSS v4, class-based dark mode via `next-themes` |
| Typeface | Lora (body) + JetBrains Mono (code) |
| Content | Markdown files in `content/` — no CMS, no database |
| Markdown | remark / rehype + Shiki (dual light/dark code themes) |
| Comments | Giscus (GitHub Discussions) |
| View counts | Upstash Redis, deduplicated per visitor for 24h |
| Hosting | Vercel |

## Commands

```bash
npm install     # cài lần đầu
npm run dev     # chạy thử ở localhost:3000
npm run build   # build kiểm tra lỗi trước khi push
```

## Editing

Everything you'd normally want to change lives in two folders:

- `content/` — blog posts (`.md`), `news.md`, `list100.md`
- `data/` — site config, homepage copy, project list

Hướng dẫn chi tiết bằng tiếng Việt: xem [SETUP.md](SETUP.md).

## Environment variables

Copy `.env.example` → `.env.local` and fill in. The site runs fine without them —
comments show a setup hint and view counts stay at 0.
