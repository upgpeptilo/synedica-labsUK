import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function CategoryTabs({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 text-center">
      <h2 className="font-heading text-2xl font-bold text-text-heading">
        Explore the full range of Synedica weight loss solutions
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-sm text-text-body">
        Synedica Laboratories specialise in manufacturing the world&apos;s most advanced appetite
        suppressant injection pen kits for research and development.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
