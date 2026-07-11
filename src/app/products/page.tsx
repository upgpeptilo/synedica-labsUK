import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";
import { getProducts } from "@/lib/products";
import { firstGbpAmount, getGbpRates } from "@/lib/currency";

export const metadata = { title: "Products – Synedica UK" };

const sortOptions = [
  { value: "default", label: "Default sorting" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title", label: "Name: A to Z" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string; category?: string; maxPrice?: string }>;
}) {
  const { q, sort = "default", category, maxPrice } = await searchParams;
  const query = q?.trim().toLowerCase();
  const [products, rates] = await Promise.all([getProducts(), getGbpRates()]);
  const categories = [...new Set(products.map((p) => p.category))].sort();
  const priceCeiling = Math.max(0, ...products.map((p) => firstGbpAmount(p.price, rates)));
  const maxPriceNum = maxPrice ? Number(maxPrice) : undefined;

  let filtered = query ? products.filter((p) => p.title.toLowerCase().includes(query)) : products;
  if (category) filtered = filtered.filter((p) => p.category === category);
  if (maxPriceNum !== undefined && !Number.isNaN(maxPriceNum)) {
    filtered = filtered.filter((p) => firstGbpAmount(p.price, rates) <= maxPriceNum);
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return firstGbpAmount(a.price, rates) - firstGbpAmount(b.price, rates);
    if (sort === "price-desc") return firstGbpAmount(b.price, rates) - firstGbpAmount(a.price, rates);
    if (sort === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs text-neutral-500">
        <Link href="/" className="hover:text-primary">Home</Link> / Shop
      </p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading mt-2 text-3xl font-bold text-dark">Shop</h1>
          <p className="mt-2 text-sm text-neutral-500">For research purposes only</p>
        </div>
        <details className="relative">
          <summary className="cursor-pointer list-none rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-600 hover:border-primary">
            {sortOptions.find((o) => o.value === sort)?.label ?? "Default sorting"}
          </summary>
          <div className="absolute right-0 z-10 mt-1 w-48 rounded border border-neutral-200 bg-white py-1 shadow-md">
            {sortOptions.map((opt) => (
              <Link
                key={opt.value}
                href={{
                  pathname: "/products",
                  query: { ...(q ? { q } : {}), ...(category ? { category } : {}), sort: opt.value },
                }}
                className={`block px-3 py-2 text-sm ${
                  sort === opt.value ? "font-semibold text-primary-dark" : "text-neutral-600 hover:text-primary"
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        </details>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-[220px_1fr]">
        <aside className="space-y-6">
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-dark">Browse</h2>
            <div className="mt-3 space-y-1">
              {categories.map((c) => (
                <Link
                  key={c}
                  href={{ pathname: "/products", query: { ...(q ? { q } : {}), ...(sort !== "default" ? { sort } : {}), category: c } }}
                  className={`block rounded px-2 py-1.5 text-sm ${
                    category === c ? "bg-primary-light font-semibold text-primary-dark" : "text-neutral-600 hover:text-primary"
                  }`}
                >
                  {c}
                </Link>
              ))}
              {category && (
                <Link
                  href={{ pathname: "/products", query: { ...(q ? { q } : {}), ...(sort !== "default" ? { sort } : {}) } }}
                  className="block px-2 py-1.5 text-xs text-neutral-400 hover:text-primary"
                >
                  Clear category
                </Link>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-dark">Filter by Price</h2>
            <form className="mt-3 space-y-2" action="/products" method="get">
              {q && <input type="hidden" name="q" value={q} />}
              {sort !== "default" && <input type="hidden" name="sort" value={sort} />}
              {category && <input type="hidden" name="category" value={category} />}
              <input
                type="range"
                name="maxPrice"
                aria-label="Maximum price"
                min={0}
                max={Math.ceil(priceCeiling)}
                defaultValue={maxPriceNum ?? Math.ceil(priceCeiling)}
                className="w-full accent-primary"
              />
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>
                  Price: £0 — £{maxPriceNum ?? Math.ceil(priceCeiling)}
                </span>
                <button
                  type="submit"
                  className="rounded bg-dark px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-primary-dark"
                >
                  Filter
                </button>
              </div>
            </form>
          </div>

          <div>
            <RecentlyViewed />
          </div>
        </aside>

        <div>
          {query && (
            <p className="mb-4 text-sm text-neutral-600">
              {sorted.length} result{sorted.length === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
            </p>
          )}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {sorted.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
