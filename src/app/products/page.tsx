import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
import { firstGbpAmount } from "@/lib/currency";

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
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q, sort = "default" } = await searchParams;
  const query = q?.trim().toLowerCase();
  const products = await getProducts();
  const filtered = query ? products.filter((p) => p.title.toLowerCase().includes(query)) : products;

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return firstGbpAmount(a.price) - firstGbpAmount(b.price);
    if (sort === "price-desc") return firstGbpAmount(b.price) - firstGbpAmount(a.price);
    if (sort === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs text-neutral-500">
        <Link href="/" className="hover:text-primary">Home</Link> / Shop
      </p>
      <h1 className="font-heading mt-2 text-3xl font-bold text-dark">Shop</h1>
      <p className="mt-2 text-sm text-neutral-500">For research purposes only</p>

      <div className="mt-8 grid gap-8 sm:grid-cols-[220px_1fr]">
        <aside className="space-y-6">
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-dark">Sort By</h2>
            <form className="mt-3 space-y-1">
              {sortOptions.map((opt) => (
                <Link
                  key={opt.value}
                  href={{ pathname: "/products", query: { ...(q ? { q } : {}), sort: opt.value } }}
                  className={`block rounded px-2 py-1.5 text-sm ${
                    sort === opt.value ? "bg-primary-light font-semibold text-primary-dark" : "text-neutral-600 hover:text-primary"
                  }`}
                >
                  {opt.label}
                </Link>
              ))}
            </form>
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
