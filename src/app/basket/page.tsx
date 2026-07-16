"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatGbpAmount } from "@/lib/currency";

export default function BasketPage() {
  const { items, removeItem, setQty } = useCart();

  const subtotal = items.reduce((sum, i) => sum + i.priceGbp * i.qty, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-primary-dark">Your Basket</h1>
        <p className="mt-3 text-neutral-600">Your basket is empty.</p>
        <Link href="/products" className="mt-6 inline-block rounded bg-primary px-5 py-2.5 font-semibold text-white hover:bg-primary-dark">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold text-primary-dark">Your Basket</h1>

      <div className="mt-6 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {items.map((item) => (
          <div key={`${item.slug}-${item.size}-${item.variantLabel ?? ""}`} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
            <Image src={item.image} alt={item.title} width={64} height={64} className="rounded border border-neutral-200 object-contain" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-neutral-900">{item.title}</p>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-neutral-500">
                {item.variantLabel && <span>Option: {item.variantLabel}</span>}
                {item.size && <span>Size: {item.size}</span>}
                <span>{formatGbpAmount(item.priceGbp)} each</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setQty(item.slug, item.size, item.qty - 1, item.variantLabel)} className="h-8 w-8 rounded border border-neutral-300 text-neutral-700 hover:bg-neutral-50">
                  −
                </button>
                <span className="w-6 text-center">{item.qty}</span>
                <button type="button" onClick={() => setQty(item.slug, item.size, item.qty + 1, item.variantLabel)} className="h-8 w-8 rounded border border-neutral-300 text-neutral-700 hover:bg-neutral-50">
                  +
                </button>
              </div>
              <p className="w-20 text-right font-semibold text-neutral-900">{formatGbpAmount(item.priceGbp * item.qty)}</p>
              <button type="button" onClick={() => removeItem(item.slug, item.size, item.variantLabel)} className="text-sm text-red-600 underline">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4">
        <p className="font-semibold text-neutral-900">Subtotal</p>
        <p className="font-semibold text-primary-dark">{formatGbpAmount(subtotal)}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/products"
          className="flex-1 rounded border-2 border-primary py-3 text-center font-semibold text-primary-dark hover:bg-primary-light"
        >
          Continue Shopping
        </Link>
        <Link
          href="/checkout"
          className="flex-1 rounded bg-dark py-3 text-center font-semibold text-white hover:bg-neutral-800"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
