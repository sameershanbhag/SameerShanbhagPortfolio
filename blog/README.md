# blog.sameershanbhag.com

Static, database-free blog. Posts are plain **HTML fragments stored in git**; a
small design engine sanitizes each post and renders it inside a themed reading
shell that matches [sameershanbhag.com](https://sameershanbhag.com)'s purple
palette and Google Sans / Agustina type.

## How posts work

```
content/posts/<slug>/
├── index.html   # the post body — any sane HTML
└── meta.json    # { title, description, date, tags, draft }
```

At build time each post is sanitized (scripts, inline styles, and foreign
classes stripped) so the site's `.prose-engine` stylesheet fully controls the
look — headings, links, lists, quotes, code blocks, tables, images, embeds.

Set `"draft": true` in `meta.json` to keep a post out of the build.

## Writing

**Option A — files:** drop `index.html` + `meta.json` into `content/posts/<slug>/`,
commit, push. Post order comes from `date`.

**Option B — studio (local UI):**

```bash
npm run studio        # starts next dev :3300 + studio server :3399
open http://localhost:3300/studio
```

The studio is a rich-text editor that saves posts as HTML files into
`content/posts/` and can publish with a real `git commit + push` from the UI.
It only exists locally — the deployed site is a pure static export with no
backend.

## Develop / build

```bash
npm install
npm run dev           # http://localhost:3300
npm run build         # static export to out/
```

## Deploy

Pushing to `master` triggers `.github/workflows/deploy-blog.yml`, which builds
this folder and publishes `out/` to GitHub Pages under the custom domain
`blog.sameershanbhag.com` (CNAME is in `public/`).
