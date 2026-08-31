import { notFound } from "next/navigation";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { getPostByIdForAdmin } from "@/lib/blog";
import { updateBlogPost } from "../../../../actions";

export const metadata = { title: "Edit Blog Post – Admin" };

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostByIdForAdmin(id);
  if (!post) notFound();

  return (
    <div className="max-w-2xl">
      <BlogPostForm
        post={post}
        action={updateBlogPost.bind(null, id)}
        submitLabel="Save Changes"
        cancelHref="/admin/blog"
      />
    </div>
  );
}
