"use client";

import { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

const STUDIO_API = "http://127.0.0.1:3399";

type PostSummary = { slug: string; title: string; date: string; draft?: boolean };

export default function StudioPage() {
  const [serverUp, setServerUp] = useState<boolean | null>(null);
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [slug, setSlug] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [draft, setDraft] = useState(false);
  const [status, setStatus] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write your post…" }),
    ],
    immediatelyRender: false,
  });

  const refreshPosts = useCallback(async () => {
    try {
      const res = await fetch(`${STUDIO_API}/api/posts`);
      const data = await res.json();
      setPosts(data.posts ?? []);
      setServerUp(true);
    } catch {
      setServerUp(false);
    }
  }, []);

  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  const loadPost = async (s: string) => {
    const res = await fetch(`${STUDIO_API}/api/posts/${s}`);
    const data = await res.json();
    setSlug(s);
    setTitle(data.meta.title);
    setDescription(data.meta.description ?? "");
    setTags((data.meta.tags ?? []).join(", "));
    setDraft(Boolean(data.meta.draft));
    editor?.commands.setContent(data.html);
    setStatus(`Loaded “${data.meta.title}”`);
  };

  const newPost = () => {
    setSlug(null);
    setTitle("");
    setDescription("");
    setTags("");
    setDraft(false);
    editor?.commands.clearContent();
    setStatus("");
  };

  const save = async () => {
    if (!editor) return;
    setStatus("Saving…");
    const res = await fetch(`${STUDIO_API}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        title,
        description,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        draft,
        html: editor.getHTML(),
      }),
    });
    const data = await res.json();
    if (data.ok) {
      setSlug(data.slug);
      setStatus(`Saved to content/posts/${data.slug}/`);
      refreshPosts();
    } else {
      setStatus(`Save failed: ${data.error}`);
    }
  };

  const publish = async () => {
    setStatus("Publishing (git commit + push)…");
    const res = await fetch(`${STUDIO_API}/api/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const data = await res.json();
    setStatus(
      data.ok
        ? data.note ?? `Pushed ${data.committed?.length ?? 0} file(s) — deploy will pick it up.`
        : `Publish failed: ${data.error}`,
    );
  };

  if (serverUp === false) {
    return (
      <div className="mx-auto max-w-xl px-5 pt-24 text-center">
        <h1 className="text-3xl font-bold">Studio runs locally</h1>
        <p className="mt-4 text-muted leading-relaxed">
          The studio needs its local companion server to read and write posts.
          From <code className="rounded bg-highlight px-1.5 py-0.5 text-accent">blog/</code>, run:
        </p>
        <pre className="mt-6 rounded-xl bg-dark p-4 text-left text-sm text-white overflow-x-auto">
          npm run studio
        </pre>
        <button
          onClick={refreshPosts}
          className="mt-6 cursor-pointer rounded-lg bg-accent px-5 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-ink"
        >
          Retry connection
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pt-10 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Studio</h1>
          <p className="text-sm text-muted">Local-only editor — saves HTML to content/posts/, publishes via git.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={newPost}
            className="cursor-pointer rounded-lg border border-accent-mid px-4 py-2 text-sm font-medium text-accent transition-colors duration-200 hover:bg-highlight"
          >
            New post
          </button>
          <button
            onClick={save}
            className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-ink"
          >
            Save
          </button>
          <button
            onClick={publish}
            className="cursor-pointer rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent"
          >
            Publish ↗
          </button>
        </div>
      </div>

      {status && (
        <p role="status" className="mt-3 rounded-lg bg-highlight px-4 py-2 text-sm text-accent">
          {status}
        </p>
      )}

      <div className="mt-6 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside>
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Posts</h2>
          <ul className="mt-3 flex flex-col gap-1">
            {posts.map((p) => (
              <li key={p.slug}>
                <button
                  onClick={() => loadPost(p.slug)}
                  className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 hover:bg-highlight ${
                    p.slug === slug ? "bg-highlight font-medium text-accent" : "text-ink"
                  }`}
                >
                  {p.title}
                  {p.draft && <span className="ml-2 text-xs text-accent-mid">draft</span>}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <label className="block">
            <span className="sr-only">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="w-full rounded-xl border border-accent-soft/60 bg-surface px-4 py-3 text-2xl font-bold text-ink placeholder:text-accent-mid focus:border-accent focus:outline-none"
            />
          </label>
          <label className="mt-3 block">
            <span className="sr-only">Description</span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="One-line description (shown in the feed + SEO)"
              className="w-full rounded-xl border border-accent-soft/60 bg-surface px-4 py-2.5 text-ink placeholder:text-accent-mid focus:border-accent focus:outline-none"
            />
          </label>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label className="flex-1 min-w-48">
              <span className="sr-only">Tags</span>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tags, comma, separated"
                className="w-full rounded-xl border border-accent-soft/60 bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-accent-mid focus:border-accent focus:outline-none"
              />
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={draft}
                onChange={(e) => setDraft(e.target.checked)}
                className="h-4 w-4 accent-[#5e548e]"
              />
              Draft (hidden from the site)
            </label>
          </div>

          <div className="prose-engine mt-6 rounded-2xl border border-accent-soft/60 bg-surface p-6 sm:p-8">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}
