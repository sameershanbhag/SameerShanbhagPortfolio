import Link from "next/link";

export default function TagPill({ tag, count }: { tag: string; count?: number }) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}/`}
      className="inline-flex items-center gap-1.5 rounded-full bg-highlight px-3 py-1 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent hover:text-white"
    >
      {tag}
      {count !== undefined && <span className="opacity-70">{count}</span>}
    </Link>
  );
}
