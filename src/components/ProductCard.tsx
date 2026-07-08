import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 transition hover:border-primary hover:shadow-md"
    >
      <Image
        src={product.image300}
        alt={product.title}
        width={300}
        height={300}
        className="aspect-square w-full bg-white object-contain p-4 transition group-hover:scale-105"
      />
      <div className="flex flex-1 flex-col gap-1 border-t border-neutral-200 bg-white px-4 py-4 text-center">
        <h3 className="font-heading text-sm font-semibold text-dark group-hover:text-primary">{product.title}</h3>
        <p className="text-sm font-semibold text-primary-dark">{product.price}</p>
        <span className="mt-2 rounded border border-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary group-hover:bg-primary group-hover:text-white">
          Select Options
        </span>
      </div>
    </Link>
  );
}
