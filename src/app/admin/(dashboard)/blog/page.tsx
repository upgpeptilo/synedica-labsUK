import Link from "next/link";
import { getAllPostsForAdmin } from "@/lib/blog";
import { deleteBlogPost } from "../../actions";

export const metadata = { title: "Blog Posts – Admin" };

function formatStatus(published: boolean, publishedAt: string | null) {
  if (!published) return "Draft";
  return publishedAt ? `Published ${new Date(publishedAt).toLocaleDateString()}` : "Published";
}

export default async function AdminBlogPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#1b6b80]">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-lg bg-[#1b6b80] px-4 py-2 text-sm font-semibold text-white hover:bg-[#155464]"
        >
          New Post
        </Link>
      </div>

      <div className="mt-6 max-w-3xl divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center gap-4 p-4">
            <div className="flex-1">
              <p className="font-semibold text-neutral-900">{post.title}</p>
              <p className="text-sm text-neutral-500">{formatStatus(post.published, post.publishedAt)}</p>
            </div>
            <Link href={`/admin/blog/${post.id}/edit`} className="text-sm text-[#1b6b80] underline">
              Edit
            </Link>
            <form action={deleteBlogPost.bind(null, post.id)}>
              <button type="submit" className="text-sm text-red-600 underline">
                Delete
              </button>
            </form>
          </div>
        ))}
        {posts.length === 0 && <p className="p-4 text-sm text-neutral-500">No blog posts yet.</p>}
      </div>
    </div>
  );
}
