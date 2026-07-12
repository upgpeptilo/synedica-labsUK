"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { firstGbpAmount, formatGbpAmount } from "@/lib/currency";

export default function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");

  const selectedVariant = product.variants.find((v) => v.id === variantId);
  const priceGbp = selectedVariant ? selectedVariant.priceGbp : firstGbpAmount(product.price);

  function cartItem() {
    return {
      slug: product.slug,
      title: product.title,
      image: product.image300,
      priceGbp,
      size,
      variantLabel: selectedVariant?.label,
    };
  }

  function handleAddToBasket() {
    addItem(cartItem(), 1);
    router.push("/basket");
  }

  function handleCheckoutNow() {
    const params = new URLSearchParams({ buy: product.slug, size });
    if (selectedVariant) params.set("variant", selectedVariant.id);
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <>
      <p className="mt-2 text-xl font-semibold text-primary-dark">{formatGbpAmount(priceGbp)}</p>

      {product.variants.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold uppercase text-neutral-500">
            {product.variantsLabel ?? "Options"}
          </p>
          <select
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="mt-2 w-full max-w-xs rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-primary focus:outline-none"
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold uppercase text-neutral-500">Size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded border px-3 py-1 text-sm ${
                  s === size
                    ? "border-primary bg-primary-light text-primary-dark"
                    : "border-neutral-300 text-neutral-700 hover:border-neutral-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 text-sm text-neutral-500">Form: {product.form}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToBasket}
          className="flex-1 rounded bg-primary py-3 font-semibold text-white hover:bg-primary-dark"
        >
          Add to Basket
        </button>
        <button
          type="button"
          onClick={handleCheckoutNow}
          className="flex-1 rounded border-2 border-dark py-3 font-semibold text-dark hover:bg-neutral-100"
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
}
