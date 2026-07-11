"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { RECENTLY_VIEWED_KEY, type RecentlyViewedItem } from "@/lib/recentlyViewed";

const EMPTY: RecentlyViewedItem[] = [];
const noSubscription = () => () => {};

let cachedRaw: string | null = null;
let cachedItems: RecentlyViewedItem[] = EMPTY;

function readStored(): RecentlyViewedItem[] {
  const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
  if (raw === cachedRaw) return cachedItems;
  try {
    cachedItems = raw ? JSON.parse(raw) : EMPTY;
  } catch {
    // ponytail: corrupt/blocked localStorage, just show nothing
    cachedItems = EMPTY;
  }
  cachedRaw = raw;
  return cachedItems;
}

export default function RecentlyViewed() {
  const items = useSyncExternalStore(noSubscription, readStored, () => EMPTY);

  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-dark">Recently Viewed</h2>
      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={`/product/${item.slug}`} className="group flex gap-3">
              <Image
                src={item.image}
                alt={item.title}
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 rounded border border-neutral-200 bg-white object-contain p-1"
              />
              <div>
                <p className="text-sm text-neutral-700 group-hover:text-primary">{item.title}</p>
                <p className="text-sm font-semibold text-primary-dark">{item.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
