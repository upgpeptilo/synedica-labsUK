"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  slug: string;
  title: string;
  image: string;
  priceGbp: number;
  size: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty: number) => void;
  removeItem: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
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

  function addItem(item: Omit<CartItem, "qty">, qty: number) {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug && i.size === item.size ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
  }

  function removeItem(slug: string, size: string) {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }

  function setQty(slug: string, size: string, qty: number) {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i)));
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
