---
title: "How I read a computer vision paper"
description: "A three-pass system that stopped me from drowning in arXiv, plus the questions I ask at each pass."
date: "2026-08-10"
tags: ["computer-vision", "research", "notes"]
cover: ""
draft: false
---

For a long time my approach to reading papers was to open the PDF, start at the
abstract, and grind forward until I gave up somewhere around the related-work
section. I got through maybe one paper a week, and remembered almost none of it.

What follows is the system I use now. It is not original — the three-pass idea comes
from S. Keshav's classic note — but the questions are mine, sharpened by a lot of
wasted evenings.

## Pass one: five minutes

The goal here is not to understand the paper. It is to decide whether to keep reading.

I look at exactly four things:

- The **title and abstract**, once.
- Every **figure**, especially the architecture diagram and the qualitative results.
- The **results table**, specifically the baseline row.
- The **conclusion**, first and last sentence.

Then I answer one question: *what does this paper claim it can do that the previous
one couldn't?* If I can't answer that in a sentence, I close the tab.

## Pass two: one hour

Now I read properly, but I skip all proofs and most of the related work. What I'm
after is the mechanism.

The questions I write down:

| Question | Why it matters |
| --- | --- |
| What is the input and output, exactly? | Half of confusion comes from wrong assumptions about shapes |
| What is the loss? | The loss is the paper's real thesis |
| What did they compare against, and was it tuned fairly? | Baselines are often quietly under-trained |
| What would break this? | If I can't think of a failure case, I haven't understood it |

That last question is the important one. A method I can't break is a method I don't
understand.

## Pass three: the afternoon

Only for papers I want to build on. Here I try to reimplement the core idea — not the
whole system, just the piece that makes it new. Usually thirty to eighty lines.

```python
# Không phải toàn bộ bài báo — chỉ cái ý tưởng cốt lõi.
def focal_loss(logits, targets, gamma=2.0, alpha=0.25):
    p = logits.sigmoid()
    ce = F.binary_cross_entropy_with_logits(logits, targets, reduction="none")
    p_t = p * targets + (1 - p) * (1 - targets)
    loss = ce * ((1 - p_t) ** gamma)
    if alpha >= 0:
        loss = (alpha * targets + (1 - alpha) * (1 - targets)) * loss
    return loss.mean()
```

Writing those lines almost always reveals something the paper glossed over. In this
case: what happens to the gradient when `p_t` is already near one? The paper says
"down-weights easy examples." Implementing it tells you *by how much*, and that number
turns out to matter a lot.

## The part nobody mentions

Most papers are not worth pass two. That is fine. The skill being trained in pass one
is not comprehension, it is **triage** — and triage is what turns an unreadable
firehose into a manageable stream.

I now get through around twenty papers a week at pass one, three or four at pass two,
and maybe one a month at pass three. That is far more than I managed when I tried to
read everything properly, and I actually remember it.
