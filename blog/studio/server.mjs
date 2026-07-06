/**
 * Studio server — local-only companion for the /studio editor.
 *
 * Runs alongside `next dev` (npm run studio) and gives the editor UI a way to
 * read/write posts in content/posts/ and publish them with a git commit+push.
 * This never ships to production: the deployed site is a pure static export.
 */
import { exec } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { promisify } from "node:util";

const execAsync = promisify(exec);
const PORT = 3399;
const BLOG_DIR = path.resolve(import.meta.dirname, "..");
const CONTENT_DIR = path.join(BLOG_DIR, "content", "posts");

const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80) || "untitled";

const json = (res, status, body) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3300",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(body));
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 10_000_000) reject(new Error("payload too large"));
    });
    req.on("end", () => resolve(data ? JSON.parse(data) : {}));
    req.on("error", reject);
  });

function listPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => {
      const metaPath = path.join(CONTENT_DIR, e.name, "meta.json");
      if (!fs.existsSync(metaPath)) return null;
      return { slug: e.name, ...JSON.parse(fs.readFileSync(metaPath, "utf8")) };
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

async function handle(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === "OPTIONS") return json(res, 204, {});

  if (req.method === "GET" && url.pathname === "/api/health") {
    return json(res, 200, { ok: true });
  }

  if (req.method === "GET" && url.pathname === "/api/posts") {
    return json(res, 200, { posts: listPosts() });
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/posts/")) {
    const slug = path.basename(url.pathname);
    const dir = path.join(CONTENT_DIR, slug);
    if (!dir.startsWith(CONTENT_DIR) || !fs.existsSync(path.join(dir, "meta.json"))) {
      return json(res, 404, { error: "not found" });
    }
    return json(res, 200, {
      slug,
      meta: JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8")),
      html: fs.readFileSync(path.join(dir, "index.html"), "utf8"),
    });
  }

  if (req.method === "POST" && url.pathname === "/api/posts") {
    const { title, description, date, tags, html, slug: existingSlug, draft } = await readBody(req);
    if (!title || !html) return json(res, 400, { error: "title and html are required" });
    const slug = existingSlug || slugify(title);
    const dir = path.join(CONTENT_DIR, slug);
    if (!path.resolve(dir).startsWith(CONTENT_DIR)) return json(res, 400, { error: "bad slug" });
    fs.mkdirSync(dir, { recursive: true });
    const meta = {
      title,
      description: description || "",
      date: date || new Date().toISOString().slice(0, 10),
      tags: Array.isArray(tags) ? tags : [],
      draft: Boolean(draft),
    };
    fs.writeFileSync(path.join(dir, "meta.json"), `${JSON.stringify(meta, null, 2)}\n`);
    fs.writeFileSync(path.join(dir, "index.html"), `${html.trim()}\n`);
    return json(res, 200, { ok: true, slug });
  }

  if (req.method === "POST" && url.pathname === "/api/publish") {
    const { slug, message } = await readBody(req);
    const commitMessage = message || (slug ? `blog: publish ${slug}` : "blog: publish posts");
    try {
      await execAsync("git add content/posts", { cwd: BLOG_DIR });
      const { stdout: staged } = await execAsync("git diff --cached --name-only", { cwd: BLOG_DIR });
      if (!staged.trim()) return json(res, 200, { ok: true, note: "nothing to publish" });
      await execAsync(`git commit -m ${JSON.stringify(commitMessage)}`, { cwd: BLOG_DIR });
      await execAsync("git push", { cwd: BLOG_DIR });
      return json(res, 200, { ok: true, committed: staged.trim().split("\n") });
    } catch (err) {
      return json(res, 500, { error: String(err.stderr || err.message || err) });
    }
  }

  return json(res, 404, { error: "not found" });
}

http
  .createServer((req, res) => {
    handle(req, res).catch((err) => json(res, 500, { error: String(err.message || err) }));
  })
  .listen(PORT, "127.0.0.1", () => {
    console.log(`studio server listening on http://127.0.0.1:${PORT}`);
  });
