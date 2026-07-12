"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  slug: string;
  title: string;
  image: string;
  priceGbp: number;
  size: string;
  variantLabel?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty: number) => void;
  removeItem: (slug: string, size: string, variantLabel?: string) => void;
  setQty: (slug: string, size: string, qty: number, variantLabel?: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "synedica-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ponytail: corrupt/unavailable storage, start with an empty cart
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  function sameLine(i: CartItem, slug: string, size: string, variantLabel?: string) {
    return i.slug === slug && i.size === size && (i.variantLabel ?? "") === (variantLabel ?? "");
  }

  function addItem(item: Omit<CartItem, "qty">, qty: number) {
    setItems((prev) => {
      const existing = prev.find((i) => sameLine(i, item.slug, item.size, item.variantLabel));
      if (existing) {
        return prev.map((i) =>
          sameLine(i, item.slug, item.size, item.variantLabel) ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
  }

  function removeItem(slug: string, size: string, variantLabel?: string) {
    setItems((prev) => prev.filter((i) => !sameLine(i, slug, size, variantLabel)));
  }

  function setQty(slug: string, size: string, qty: number, variantLabel?: string) {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (sameLine(i, slug, size, variantLabel) ? { ...i, qty } : i)));
  }

  function clear() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, setQty, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
