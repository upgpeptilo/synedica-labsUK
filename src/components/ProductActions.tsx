"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { firstGbpAmount, formatGbpAmount } from "@/lib/currency";

export default function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [size, setSize] = useState("");
  const [variantId, setVariantId] = useState("");

  const selectedVariant = product.variants.find((v) => v.id === variantId);
  const needsVariant = product.variants.length > 0 && !selectedVariant;
  const needsSize = product.sizes.length > 0 && !size;
  const disabled = needsVariant || needsSize;

  const priceGbp = selectedVariant ? selectedVariant.priceGbp : firstGbpAmount(product.price);
  const priceDisplay = needsVariant ? product.price : formatGbpAmount(priceGbp);

  const missing = [needsSize && "a size", needsVariant && (product.variantsLabel ?? "an option")].filter(Boolean);

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
      <p className="mt-2 text-xl font-semibold text-primary-dark">{priceDisplay}</p>

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
            <option value="" disabled>
              — Select {product.variantsLabel ?? "an option"} —
            </option>
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

      {disabled && (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          Please select {missing.join(" and ")} above before continuing.
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToBasket}
          disabled={disabled}
          className={`flex-1 rounded py-3 font-semibold ${
            disabled
              ? "cursor-not-allowed bg-neutral-300 text-neutral-500"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          Add to Basket
        </button>
        <button
          type="button"
          onClick={handleCheckoutNow}
          disabled={disabled}
          className={`flex-1 rounded border-2 py-3 font-semibold ${
            disabled
              ? "cursor-not-allowed border-neutral-300 text-neutral-500"
              : "border-dark text-dark hover:bg-neutral-100"
          }`}
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
}
