import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/posts";
import TagPill from "./tag-pill";

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article
      className={`group relative rounded-2xl bg-surface border border-accent-soft/40 transition-all duration-200 hover:border-accent-mid hover:shadow-[0_8px_30px_rgba(94,84,142,0.12)] ${
        featured ? "p-8 sm:p-10" : "p-6 sm:p-8"
      }`}
    >
      <div className="flex items-center gap-3 text-sm text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden className="w-1 h-1 rounded-full bg-accent-mid" />
        <span>{post.readingMinutes} min read</span>
      </div>
      <h2 className={`mt-3 font-bold leading-snug ${featured ? "text-3xl" : "text-xl"}`}>
        <Link
          href={`/posts/${post.slug}/`}
          className="text-ink transition-colors duration-200 group-hover:text-accent after:absolute after:inset-0"
        >
          {post.title}
        </Link>
      </h2>
      <p className={`mt-3 text-muted leading-relaxed ${featured ? "text-lg" : ""}`}>
        {post.description}
      </p>
      {post.tags.length > 0 && (
        <div className="relative z-10 mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
