import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import TagPill from "@/components/tag-pill";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.draft) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 pt-14 pb-10">
      <header>
        <div className="flex items-center gap-3 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden className="w-1 h-1 rounded-full bg-accent-mid" />
          <span>{post.readingMinutes} min read</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-[2.75rem] font-bold leading-tight tracking-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-xl text-muted leading-relaxed">{post.description}</p>
        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        )}
        <div className="mt-8 h-px bg-gradient-to-r from-accent-soft via-accent-mid to-transparent" />
      </header>

      {post.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover}
          alt=""
          className="mt-10 w-full rounded-2xl border border-accent-soft/40"
        />
      )}

      <div
        className="prose-engine mt-10"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <footer className="mt-16 rounded-2xl bg-surface border border-accent-soft/40 p-8 text-center">
        <p className="font-logo text-2xl text-accent">Sameer Shanbhag</p>
        <p className="mt-2 text-muted">
          Thanks for reading. Find more of my work on{" "}
          <a
            href="https://sameershanbhag.com"
            className="font-medium text-accent underline underline-offset-4 transition-colors duration-200 hover:text-ink"
          >
            sameershanbhag.com
          </a>
          .
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-accent px-5 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-ink"
        >
          ← All posts
        </Link>
      </footer>
    </article>
  );
}
