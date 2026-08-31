"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";
import type { BlogPost } from "@/lib/blog";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus:border-[#1b6b80] focus:outline-none";

export default function BlogPostForm({
  post,
  action,
  submitLabel,
  cancelHref = "/admin/blog",
}: {
  post?: BlogPost;
  action: (formData: FormData) => void;
  submitLabel: string;
  cancelHref?: string;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");

  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-start gap-3 border-b border-neutral-200 p-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef7f9] text-[#1b6b80]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path d="M4 5h16v14H4z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 9h8M8 13h8M8 17h4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <h2 className="font-semibold text-neutral-900">{post ? "Edit Blog Post" : "New Blog Post"}</h2>
          <p className="text-sm text-neutral-500">
            {post ? "Update this post, then save your changes." : "Write a new post for the Synedica UK blog."}
          </p>
        </div>
      </div>

      <form action={action} className="space-y-5 p-6">
        <div>
          <label className="text-sm font-medium text-neutral-700" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="e.g. 5 Tips for Storing Peptides Safely"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-neutral-700" htmlFor="excerpt">
            Short summary
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className={inputClass}
            placeholder="A sentence or two shown in the blog list and search results."
          />
        </div>

        <div>
          <span className="text-sm font-medium text-neutral-700">Cover image</span>
          <div className="mt-1.5">
            <ImageUploader initialUrl={post?.coverImage} bucket="product-images" fieldName="coverImageUrl" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-neutral-700" htmlFor="content">
            Post content
          </label>
          <textarea
            id="content"
            name="content"
            rows={16}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`${inputClass} font-mono text-sm`}
            placeholder="Write your post here. Leave a blank line between paragraphs."
          />
          <p className="mt-1 text-xs text-neutral-500">
            Plain text is fine — leave a blank line between paragraphs and they&apos;ll be formatted automatically.
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? false}
            className="h-4 w-4 rounded border-neutral-300"
          />
          Published (visible on the site)
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-[#1b6b80] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#155464]"
          >
            {submitLabel}
          </button>
          <a href={cancelHref} className="text-sm text-neutral-500 hover:text-neutral-700">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
