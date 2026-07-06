import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/post-card";

export default function Home() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-3xl px-5">
      <section className="pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Notes from the <span className="text-accent">workbench</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted leading-relaxed">
          Writing on software engineering, AI agents, and whatever else I&apos;m
          building. New posts land here first.
        </p>
      </section>

      {posts.length === 0 ? (
        <p className="py-20 text-center text-muted">
          Nothing here yet — the first post is on its way.
        </p>
      ) : (
        <div className="flex flex-col gap-6 pb-10">
          {featured && <PostCard post={featured} featured />}
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
