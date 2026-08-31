import BlogPostForm from "@/components/admin/BlogPostForm";
import { createBlogPost } from "../../../actions";

export const metadata = { title: "New Blog Post – Admin" };

export default function NewBlogPostPage() {
  return (
    <div className="max-w-2xl">
      <BlogPostForm action={createBlogPost} submitLabel="Create Post" cancelHref="/admin/blog" />
    </div>
  );
}
