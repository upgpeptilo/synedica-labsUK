"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart, type CartItem } from "@/lib/cart";
import { createClient } from "@/lib/supabase/client";
import { firstGbpAmount, formatGbpAmount, getGbpRates, type GbpRates } from "@/lib/currency";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const buySlug = searchParams.get("buy");
  const buySize = searchParams.get("size") ?? "";
  const { items: cartItems, removeItem, clear } = useCart();

  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);
  const [loading, setLoading] = useState(!!buySlug);
  const [rates, setRates] = useState<GbpRates | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getGbpRates().then(setRates);
  }, []);

  useEffect(() => {
    if (!buySlug) return;
    const supabase = createClient();
    supabase
      .from("products")
      .select("slug, title, price, image300")
      .eq("slug", buySlug)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setBuyNowItem({
            slug: data.slug,
            title: data.title,
            image: data.image300,
            priceGbp: firstGbpAmount(data.price),
            size: buySize,
            qty: 1,
          });
        }
        setLoading(false);
      });
  }, [buySlug, buySize]);

  const items = buySlug ? (buyNowItem ? [buyNowItem] : []) : cartItems;
  const subtotal = items.reduce((sum, i) => sum + i.priceGbp * i.qty, 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!buySlug) clear();
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-primary-dark">Order Received</h1>
        <p className="mt-3 text-neutral-600">
          Thanks for your order. We&apos;ll be in touch by email to confirm payment and shipping details.
        </p>
        <Link href="/products" className="mt-6 inline-block rounded bg-primary px-5 py-2.5 font-semibold text-white hover:bg-primary-dark">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="mx-auto max-w-2xl px-4 py-16 text-center text-neutral-500">Loading…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-primary-dark">Checkout</h1>
        <p className="mt-3 text-neutral-600">There&apos;s nothing to check out yet.</p>
        <Link href="/products" className="mt-6 inline-block rounded bg-primary px-5 py-2.5 font-semibold text-white hover:bg-primary-dark">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold text-primary-dark">Checkout</h1>

      <div className="mt-6 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {items.map((item) => (
          <div key={`${item.slug}-${item.size}`} className="flex items-center gap-4 p-4">
            <Image src={item.image} alt={item.title} width={56} height={56} className="rounded border border-neutral-200 object-contain" />
            <div className="flex-1">
              <p className="font-semibold text-neutral-900">{item.title}</p>
              <p className="text-sm text-neutral-500">
                {item.size && `Size: ${item.size} · `}Qty: {item.qty}
              </p>
            </div>
            <p className="text-sm font-semibold text-neutral-700">
              {rates ? formatGbpAmount(item.priceGbp * item.qty, rates) : `£${(item.priceGbp * item.qty).toFixed(2)}`}
            </p>
            <button
              type="button"
              onClick={() => (buySlug ? router.push("/products") : removeItem(item.slug, item.size))}
              className="text-sm text-red-600 underline"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4">
        <p className="font-semibold text-neutral-900">Total</p>
        <p className="font-semibold text-primary-dark">{rates ? formatGbpAmount(subtotal, rates) : `£${subtotal.toFixed(2)}`}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="font-semibold text-neutral-900">Your Details</h2>
        <div>
          <label className="text-sm font-medium text-neutral-700" htmlFor="name">Full Name</label>
          <input id="name" name="name" type="text" required className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700" htmlFor="address">Shipping Address</label>
          <textarea id="address" name="address" required rows={3} className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary focus:outline-none" />
        </div>
        <p className="text-xs text-neutral-500">Payment isn&apos;t collected here yet — we&apos;ll follow up by email to arrange it.</p>
        <button type="submit" className="w-full rounded bg-dark py-3 font-semibold text-white hover:bg-neutral-800">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl px-4 py-16 text-center text-neutral-500">Loading…</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
