import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import PostCard from "@/components/post-card";

type Props = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Posts tagged “${decodeURIComponent(tag)}”` };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getAllPosts().filter((p) => p.tags.includes(decoded));

  return (
    <div className="mx-auto max-w-3xl px-5 pt-16">
      <p className="text-sm font-medium uppercase tracking-wide text-accent">Tag</p>
      <h1 className="mt-1 text-4xl font-bold tracking-tight">{decoded}</h1>
      <p className="mt-3 text-muted">
        {posts.length} post{posts.length === 1 ? "" : "s"}
      </p>
      <div className="mt-8 flex flex-col gap-6 pb-10">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
