import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, storageText, disclaimerText } from "@/lib/products";
import { firstGbpAmount } from "@/lib/currency";
import ProductActions from "@/components/ProductActions";
import RecordRecentlyViewed from "@/components/RecordRecentlyViewed";

// Production domain, confirmed by the site owner. Falls back here if
// NEXT_PUBLIC_SITE_URL isn't set in the deployment environment.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://synedicalabs-uk.com";
const SITE_NAME = "Synedica UK";

export async function generateMetadata({
      params,
}: {
      params: Promise<{ slug: string }>;
}): Promise<Metadata> {
      const { slug } = await params;
      const product = await getProduct(slug);
      if (!product) return {};

  const title = `${product.title} | ${SITE_NAME}`;
      const description = product.metaDescription || product.description;
      const url = `${SITE_URL}/product/${product.slug}`;

  return {
          title,
          description,
          alternates: { canonical: url },
          openGraph: {
                    title,
                    description,
                    url,
                    siteName: SITE_NAME,
                    images: [{ url: product.image600 }],
                    type: "website",
          },
          twitter: {
                    card: "summary_large_image",
                    title,
                    description,
                    images: [product.image600],
          },
  };
}

export default async function ProductPage({
      params,
}: {
      params: Promise<{ slug: string }>;
}) {
      const { slug } = await params;
      const product = await getProduct(slug);
      if (!product) notFound();

  const jsonLd = {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.metaDescription || product.description,
          image: product.image600,
          category: product.category,
          offers: {
                    "@type": "Offer",
                    priceCurrency: "GBP",
                    price: firstGbpAmount(product.price).toFixed(2),
                    url: `${SITE_URL}/product/${product.slug}`,
                    availability: "https://schema.org/InStock",
          },
  };

  return (
          <div className="mx-auto max-w-6xl px-4 py-16">
                <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                          />
                <RecordRecentlyViewed
                            item={{ slug: product.slug, title: product.title, price: product.price, image: product.image300 }}
                          />
                <p className="text-xs text-neutral-500">
                        <Link href="/" className="hover:text-primary">Home</Link>Link> /{" "}
                        <Link href="/products" className="hover:text-primary">Shop</Link>Link> / {product.title}
                </p>p>
                <div className="mt-6 grid gap-12 sm:grid-cols-2">
                        <Image
                                      src={product.image600}
                                      alt={product.title}
                                      width={600}
                                      height={600}
                                      className="w-full rounded-lg border border-neutral-200 bg-neutral-50 object-contain p-6"
                                    />
                        <div>
                                  <h1 className="font-heading text-3xl font-bold text-dark">{product.title}</h1>h1>
                        
                            {product.description && (
                          <p className="mt-4 text-sm leading-relaxed text-neutral-600">{product.description}</p>p>
                                  )}
                        
                                  <ProductActions product={product} />
                        
                                  <div className="mt-10 space-y-2 border-t border-neutral-200 pt-6">
                                      {product.specs.map((spec) => (
                            <p key={spec.label} className="text-sm">
                                            <span className="font-semibold text-neutral-900">{spec.label}: </span>span>
                                            <span className="text-neutral-600">{spec.value}</span>span>
                            </p>p>
                          ))}
                                  </div>div>
                        
                                  <div className="mt-8 border-t border-neutral-200 pt-6">
                                              <h2 className="text-sm font-semibold text-neutral-900">Storage &amp; Handling</h2>h2>
                                              <p className="mt-2 text-sm text-neutral-600">{storageText}</p>p>
                                  </div>div>
                        
                                  <p className="mt-6 text-xs text-neutral-500">
                                              ⚠️ {disclaimerText}{" "}
                                              <Link href="/termsconditions" className="text-primary-dark underline">
                                                            Terms &amp; Conditions
                                              </Link>Link>
                                              .
                                  </p>p>
                        </div>div>
                </div>div>
          </div>div>
        );
}
</div>
