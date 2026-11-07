---
title: "Writing guide: everything a post can do"
date: 2026-11-04
draft: true   # keep as draft: this is a reference for you, not for readers
description: "A reference of the Markdown features this blog supports."
tags: [meta, markdown]
series: ["Blog setup"]
---

This post is a cheat sheet. Run `hugo server -D` to see it, since it's a draft.

## Text

Regular paragraphs, **bold**, *italic*, `inline code`, [links](https://gohugo.io) and <mark>highlighted text</mark> (write `<mark>text</mark>`).

> Blockquotes look like this. Good for quoting a book or a paper.

## Lists

- Unordered item
- Another item
  - Nested item

1. First step
2. Second step

## Code

```python
def fib(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

```c
#include <stdio.h>

int main(void) {
    printf("hello, world\n");
    return 0;
}
```

## Tables

| Structure | Lookup   | Insert   |
|-----------|----------|----------|
| B-tree    | O(log n) | O(log n) |
| Hash map  | O(1)     | O(1)     |

## Images

Put the image in the same folder as the post (`content/posts/my-post/diagram.png`) and reference it by name:

```markdown
![A short description](diagram.png)
```

A file named in `cover:` in the front matter becomes the card thumbnail and the image at the top of the post.

## Series

Add `series: ["Name"]` to the front matter of every post in a series. The Posts page then shows a filter for it.
