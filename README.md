# arthurgcrippa.github.io

My study blog, built with [Hugo](https://gohugo.io) and published to GitHub Pages on every push to `main`.

## Writing something new

| What | Command | File |
|---|---|---|
| Post | `hugo new content posts/my-post.md` | `content/posts/my-post.md` |
| Post with images | `hugo new content posts/my-post/index.md` | images go in `content/posts/my-post/` |
| Note | `hugo new content notes/my-note.md` | `content/notes/my-note.md` |
| Recipe | `hugo new content cookbook/my-recipe/index.md` | `photo.jpg` goes next to `index.md` |
| Book | `hugo new content bookshelf/book-name/index.md` | `cover.jpg` goes next to `index.md` |

You can also create the file by hand: copy the front matter from `archetypes/`.

New files start with `draft: true`. Change it to `draft: false` (or delete the line) when it's ready, then:

```bash
git add . && git commit -m "Add post: my post" && git push
```

The site updates in about a minute.

## Previewing locally

```bash
hugo server -D
```

Open http://localhost:1313. `-D` also shows drafts.

## Where things live

- `hugo.toml`: site title, Home headline, social links and menu.
- `content/about.md`: the About page.
- `layouts/`: HTML templates.
- `assets/css/main.css`: all styles (colors are at the top).
- `assets/js/main.js`: dark mode, mobile menu, filters and search.
