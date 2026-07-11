"use client";

import { useEffect } from "react";
import { recordRecentlyViewed, type RecentlyViewedItem } from "@/lib/recentlyViewed";

export default function RecordRecentlyViewed({ item }: { item: RecentlyViewedItem }) {
  useEffect(() => {
    recordRecentlyViewed(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.slug]);

  return null;
}
