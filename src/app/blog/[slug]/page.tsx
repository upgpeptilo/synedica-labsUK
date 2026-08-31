import { notFound } from "next/navigation";
import Image from "next/image";
import { getPublishedPostBySlug } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Blog – Synedica UK" };

  return {
    title: `${post.title} – Synedica UK Blog`,
    description: post.excerpt || undefined,
  };
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">{formatDate(post.publishedAt)}</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-dark">{post.title}</h1>

      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          width={800}
          height={450}
          className="mt-6 w-full rounded-xl border border-neutral-200 object-cover"
        />
      )}

      <div className="mt-8 space-y-4 text-neutral-700">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
