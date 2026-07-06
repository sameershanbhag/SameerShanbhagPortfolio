import fs from "node:fs";
import path from "node:path";
import sanitizeHtml from "sanitize-html";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  cover?: string;
  draft?: boolean;
};

export type Post = PostMeta & {
  html: string;
  readingMinutes: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "posts");

/**
 * The sanitizing half of the design engine: strip scripts, inline styles and
 * foreign classes so the themed stylesheet (.prose-engine) fully controls how
 * a post renders, no matter where the HTML came from.
 */
function cleanHtml(raw: string): string {
  const clean = sanitizeHtml(raw, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "p", "a", "ul", "ol", "li", "blockquote",
      "pre", "code", "img", "figure", "figcaption", "table", "thead",
      "tbody", "tr", "th", "td", "hr", "br", "strong", "em", "u", "s",
      "sub", "sup", "iframe", "div", "span",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      code: ["class"], // keep language-* hints
      iframe: ["src", "title", "allow", "allowfullscreen"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedClasses: { code: [/^language-/] },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
      img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }, true),
    },
  });
  // Tables scroll inside their own container instead of breaking the column.
  return clean.replace(/<table/g, '<div class="table-wrap"><table').replace(/<\/table>/g, "</table></div>");
}

function readingMinutes(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

function loadPost(slug: string): Post | null {
  const dir = path.join(CONTENT_DIR, slug);
  const metaPath = path.join(dir, "meta.json");
  const htmlPath = path.join(dir, "index.html");
  if (!fs.existsSync(metaPath) || !fs.existsSync(htmlPath)) return null;
  const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as Omit<PostMeta, "slug">;
  const html = cleanHtml(fs.readFileSync(htmlPath, "utf8"));
  return { ...meta, slug, html, readingMinutes: readingMinutes(html) };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => loadPost(e.name))
    .filter((p): p is Post => p !== null && !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  return loadPost(slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
