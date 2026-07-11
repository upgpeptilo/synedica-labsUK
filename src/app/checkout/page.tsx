"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart, type CartItem } from "@/lib/cart";
import { createClient } from "@/lib/supabase/client";
import { firstGbpAmount, formatGbpAmount, getGbpRates, type GbpRates } from "@/lib/currency";
import AddressFields from "@/components/AddressFields";
import { PAYMENT_METHODS, BANK_OPTIONS, OTHER_BANK_ID } from "@/lib/paymentMethods";

const WHATSAPP_URL = "https://wa.me/447853104088";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary focus:outline-none";

function Breadcrumb({ step }: { step: "details" | "complete" }) {
  const steps = [
    { key: "cart", label: "Shopping Cart" },
    { key: "details", label: "Checkout Details" },
    { key: "complete", label: "Order Complete" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold uppercase tracking-wide text-neutral-400 sm:text-base">
      {steps.map((s, i) => (
        <span key={s.key} className="flex items-center gap-3">
          {i > 0 && <span className="text-neutral-300">›</span>}
          <span className={s.key === step ? "text-dark" : ""}>{s.label}</span>
        </span>
      ))}
    </div>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const buySlug = searchParams.get("buy");
  const buySize = searchParams.get("size") ?? "";
  const { items: cartItems, clear } = useCart();

  const [buyNowRow, setBuyNowRow] = useState<{ slug: string; title: string; price: string; image300: string } | null>(null);
  const [loading, setLoading] = useState(!!buySlug);
  const [rates, setRates] = useState<GbpRates | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].id);
  const [bankOption, setBankOption] = useState("");
  const [bankName, setBankName] = useState("");

  function paymentSummary() {
    if (paymentMethod === "bank") {
      const bank = BANK_OPTIONS.find((b) => b.id === bankOption);
      if (!bank) return "Bank";
      return bank.id === OTHER_BANK_ID ? `Bank — ${bankName || "Other Bank"}` : `Bank — ${bank.label}`;
    }
    return PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label ?? paymentMethod;
  }

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
        setBuyNowRow(data ?? null);
        setLoading(false);
      });
  }, [buySlug]);

  const buyNowItem: CartItem | null =
    buyNowRow && rates
      ? {
          slug: buyNowRow.slug,
          title: buyNowRow.title,
          image: buyNowRow.image300,
          priceGbp: firstGbpAmount(buyNowRow.price, rates),
          size: buySize,
          qty: 1,
        }
      : null;

  const items = buySlug ? (buyNowItem ? [buyNowItem] : []) : cartItems;
  const subtotal = items.reduce((sum, i) => sum + i.priceGbp * i.qty, 0);
  const fmt = (n: number) => (rates ? formatGbpAmount(n, rates) : `£${n.toFixed(2)}`);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const address = [
      [get("billingStreet1"), get("billingStreet2")].filter(Boolean).join(", "),
      get("billingCity"),
      [get("billingState"), get("billingZip")].filter(Boolean).join(" "),
      get("billingCountry"),
    ]
      .filter(Boolean)
      .join(", ");

    const message = [
      "New order from Synedica UK website:",
      "",
      `Name: ${get("billingFirstName")} ${get("billingLastName")}`,
      `Email: ${get("email")}`,
      get("phone") && `Phone: ${get("phone")}`,
      `Address: ${address}`,
      "",
      "Items:",
      ...items.map((i) => `- ${i.title}${i.size ? ` (${i.size})` : ""} x${i.qty} — ${fmt(i.priceGbp * i.qty)}`),
      `Total: ${fmt(subtotal)}`,
      `Payment method: ${paymentSummary()}`,
      get("notes") && `Notes: ${get("notes")}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, "_blank");
    setSubmitted(true);
    if (!buySlug) clear();
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Breadcrumb step="complete" />
        <h1 className="mt-8 text-2xl font-bold text-primary-dark">Order Received</h1>
        <p className="mt-3 text-neutral-600">
          We&apos;ve opened WhatsApp with your order details — hit send there to confirm with our team.
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          Payment method: {paymentSummary()} — see{" "}
          <Link href="/how-to-pay" className="underline hover:text-primary">How to Pay</Link> for next steps.
        </p>
        <Link href="/products" className="mt-6 inline-block rounded bg-dark px-5 py-2.5 font-semibold text-white hover:bg-neutral-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (loading || (buySlug && !rates)) {
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
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Breadcrumb step="details" />

      <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-dark">Billing Details</h2>
          <div className="mt-4">
            <AddressFields idPrefix="billing" fieldPrefix="billing" />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-neutral-700" htmlFor="phone">Phone (optional)</label>
            <input id="phone" name="phone" type="tel" className={inputClass} />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-neutral-700" htmlFor="email">Email address *</label>
            <input id="email" name="email" type="email" required className={inputClass} />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-neutral-700" htmlFor="notes">Order notes (optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Notes about your order, e.g. special notes for delivery."
              className={inputClass}
            />
          </div>
        </div>

        <div className="h-fit rounded-lg border-2 border-primary bg-white p-5">
          <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-dark">Your Order</h2>

          <div className="mt-4 border-b border-neutral-200 pb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            <div className="flex justify-between">
              <span>Product</span>
              <span>Subtotal</span>
            </div>
          </div>
          <div className="divide-y divide-neutral-100">
            {items.map((item) => (
              <div key={`${item.slug}-${item.size}`} className="flex items-center gap-3 py-3 text-sm">
                <Image src={item.image} alt={item.title} width={40} height={40} className="rounded border border-neutral-200 object-contain" />
                <span className="flex-1 text-neutral-700">
                  {item.title}
                  {item.size && ` (${item.size})`} × {item.qty}
                </span>
                <span className="font-semibold text-neutral-900">{fmt(item.priceGbp * item.qty)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-neutral-200 pt-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-semibold text-neutral-900">{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Shipment</span>
              <span className="text-neutral-700">Free shipping [3 – 10 Days]</span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-2 text-base">
              <span className="font-semibold text-dark">Total</span>
              <span className="font-semibold text-primary-dark">{fmt(subtotal)}</span>
            </div>
          </div>

          <fieldset className="mt-5 border-t border-neutral-200 pt-4">
            <legend className="text-sm font-semibold uppercase tracking-wide text-dark">Payment Method</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className="flex flex-col items-center gap-1 rounded-lg border border-neutral-300 p-2 text-center has-checked:border-primary has-checked:bg-primary-light"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m.id}
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                    className="sr-only"
                  />
                  <Image src={m.image} alt={m.label} width={32} height={32} className="h-8 w-8 object-contain" />
                  <span className="text-[11px] leading-tight text-neutral-700">{m.label}</span>
                </label>
              ))}
            </div>

            {paymentMethod === "bank" && (
              <div className="mt-4 border-t border-neutral-200 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Choose your bank</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {BANK_OPTIONS.map((b) => (
                    <label
                      key={b.id}
                      className="flex flex-col items-center gap-1 rounded-lg border border-neutral-300 p-2 text-center has-checked:border-primary has-checked:bg-primary-light"
                    >
                      <input
                        type="radio"
                        name="bankOption"
                        value={b.id}
                        checked={bankOption === b.id}
                        onChange={() => setBankOption(b.id)}
                        className="sr-only"
                      />
                      <Image src={b.image} alt={b.label} width={32} height={32} className="h-8 w-8 object-contain" />
                      <span className="text-[11px] leading-tight text-neutral-700">{b.label}</span>
                    </label>
                  ))}
                </div>

                {bankOption === OTHER_BANK_ID && (
                  <input
                    type="text"
                    name="bankName"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Enter your bank name"
                    className={`${inputClass} mt-3`}
                  />
                )}
              </div>
            )}
          </fieldset>

          <button type="submit" className="mt-5 w-full rounded bg-dark py-3 font-semibold text-white hover:bg-neutral-800">
            Place Order
          </button>

          <p className="mt-3 text-xs text-neutral-500">
            Your personal data will be used to process your order, support your experience throughout
            this website, and for other purposes described in our{" "}
            <Link href="/privacy-policy" className="underline hover:text-primary">privacy policy</Link>.
          </p>
        </div>
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
