export const RECENTLY_VIEWED_KEY = "recentlyViewed";
const MAX_ITEMS = 5;

export type RecentlyViewedItem = {
  slug: string;
  title: string;
  price: string;
  image: string;
};

export function recordRecentlyViewed(item: RecentlyViewedItem) {
  try {
    const existing: RecentlyViewedItem[] = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) ?? "[]");
    const next = [item, ...existing.filter((p) => p.slug !== item.slug)].slice(0, MAX_ITEMS);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
  } catch {
    // ponytail: localStorage unavailable (private mode/blocked), skip silently
  }
}
