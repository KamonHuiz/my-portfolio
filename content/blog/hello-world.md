---
title: "Hello, world"
description: "Why I finally built a place of my own on the internet, and what I plan to put here."
date: "2026-08-19"
tags: ["meta", "writing"]
cover: ""
draft: false
---

I have been meaning to build this site for about two years. Every time I sat down to
start, I got distracted by a model that wouldn't converge, and the idea quietly slid
to the bottom of the list.

So here it is, finally. A small corner of the internet that belongs to me.

## Why bother

Most of what I learn gets lost. I figure something out at 2am, feel briefly clever,
and then three months later I hit the exact same wall and have no memory of solving
it before. Writing is the only fix I have found that actually works.

The second reason is simpler: I like reading other people's notes. Half of what I
know about computer vision came from someone's messy blog post rather than a paper.
This is me paying that back.

## What goes here

Roughly three things:

1. **Notes on what I'm learning** — mostly computer vision, occasionally whatever
   rabbit hole I fell into that week.
2. **Post-mortems on projects** — including the ones that didn't work, which are
   usually more interesting.
3. **Things I think are worth sharing** — papers, tools, ideas.

> If I can't write it down clearly, I probably don't understand it yet.

## A quick technical note

This site is a static Next.js app. Every post you see is just a Markdown file in a
folder — no database, no CMS, no admin panel to log into. Writing a post looks like
this:

```bash
# tạo file mới trong content/blog/
touch content/blog/my-new-post.md
```

And the file itself starts with a small block of settings:

```yaml
---
title: "My new post"
description: "One sentence about it."
date: "2026-08-20"
tags: ["computer-vision"]
draft: false
---
```

That's the entire publishing pipeline. Write the file, push it to GitHub, and the
site rebuilds itself.

## What's next

I have a backlog of half-written notes about object detection, a long complaint about
data labelling, and a post about the club I helped found. They will show up here
eventually.

Thanks for reading. If you have thoughts, the comment box is right below.
