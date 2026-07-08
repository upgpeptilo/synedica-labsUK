import Image from "next/image";
import type { Product } from "@/lib/products";

export default function AdminProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white">
      {product.bestSeller && (
        <span className="m-2 w-fit rounded bg-emerald-600 px-2 py-0.5 text-xs font-semibold uppercase text-white">
          Best Seller
        </span>
      )}
      <Image
        src={product.image300}
        alt={product.title}
        width={300}
        height={300}
        className="aspect-square w-full object-contain p-4"
      />
      <div className="border-t border-neutral-100 p-3 text-center">
        <p className="font-semibold text-neutral-900">{product.title}</p>
        <p className="text-sm text-neutral-500">{product.price}</p>
      </div>
    </div>
  );
}
