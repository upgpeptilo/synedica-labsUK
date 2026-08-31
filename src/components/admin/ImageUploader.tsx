"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function ImageUploader({
  initialUrl,
  bucket = "product-images",
  fieldName = "imageUrl",
}: {
  initialUrl?: string;
  bucket?: string;
  fieldName?: string;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const path = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file);

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    setUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <input type="hidden" name={fieldName} value={url} />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        title="Product image"
        aria-label="Product image"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
        }}
      />
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) uploadFile(file);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition ${
          dragOver ? "border-[#1b6b80] bg-[#eef7f9]" : "border-neutral-300 bg-neutral-50"
        }`}
      >
        {url ? (
          <Image
            src={url}
            alt="Product preview"
            width={120}
            height={120}
            className="rounded border border-neutral-200 object-contain"
          />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-neutral-400">
            <path d="M12 16V4m0 0 4 4m-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <p className="mt-3 text-sm font-medium text-neutral-700">
          {uploading ? "Uploading…" : "Choose a file or drag & drop it here."}
        </p>
        <p className="mt-1 text-xs text-neutral-400">PNG, JPG, WEBP</p>
        <span className="mt-3 rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700">
          Browse files
        </span>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
