import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, storageText, disclaimerText } from "@/lib/products";
import ProductActions from "@/components/ProductActions";
import RecordRecentlyViewed from "@/components/RecordRecentlyViewed";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <RecordRecentlyViewed
        item={{ slug: product.slug, title: product.title, price: product.price, image: product.image300 }}
      />
      <p className="text-xs text-neutral-500">
        <Link href="/" className="hover:text-primary">Home</Link> /{" "}
        <Link href="/products" className="hover:text-primary">Shop</Link> / {product.title}
      </p>
      <div className="mt-6 grid gap-12 sm:grid-cols-2">
        <Image
          src={product.image600}
          alt={product.title}
          width={600}
          height={600}
          className="w-full rounded-lg border border-neutral-200 bg-neutral-50 object-contain p-6"
        />
        <div>
          <h1 className="font-heading text-3xl font-bold text-dark">{product.title}</h1>

          <ProductActions product={product} />

          <div className="mt-10 space-y-2 border-t border-neutral-200 pt-6">
            {product.specs.map((spec) => (
              <p key={spec.label} className="text-sm">
                <span className="font-semibold text-neutral-900">{spec.label}: </span>
                <span className="text-neutral-600">{spec.value}</span>
              </p>
            ))}
          </div>

          <div className="mt-8 border-t border-neutral-200 pt-6">
            <h2 className="text-sm font-semibold text-neutral-900">Storage &amp; Handling</h2>
            <p className="mt-2 text-sm text-neutral-600">{storageText}</p>
          </div>

          <p className="mt-6 text-xs text-neutral-500">
            ⚠️ {disclaimerText}{" "}
            <Link href="/termsconditions" className="text-primary-dark underline">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
