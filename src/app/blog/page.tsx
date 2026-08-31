import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog – Synedica UK",
  description: "News, guides and updates from Synedica UK.",
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold text-dark">Blog</h1>
      <p className="mt-2 text-neutral-600">News, guides and updates from Synedica UK.</p>

      {posts.length === 0 ? (
        <p className="mt-10 text-neutral-500">No posts yet — check back soon.</p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={400}
                  height={240}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="h-44 w-full bg-neutral-100" />
              )}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                  {formatDate(post.publishedAt)}
                </p>
                <h2 className="mt-2 font-heading text-lg font-bold text-dark group-hover:text-primary">
                  {post.title}
                </h2>
                {post.excerpt && <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{post.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
