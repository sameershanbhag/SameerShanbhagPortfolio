import type { Metadata } from "next";
import { getAllTags } from "@/lib/posts";
import TagPill from "@/components/tag-pill";

export const metadata: Metadata = { title: "Tags" };

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <div className="mx-auto max-w-3xl px-5 pt-16">
      <h1 className="text-4xl font-bold tracking-tight">Tags</h1>
      <p className="mt-3 text-lg text-muted">Browse posts by topic.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {tags.length === 0 ? (
          <p className="text-muted">No tags yet.</p>
        ) : (
          tags.map(({ tag, count }) => <TagPill key={tag} tag={tag} count={count} />)
        )}
      </div>
    </div>
  );
}
