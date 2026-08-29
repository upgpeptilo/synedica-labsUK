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

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

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

  const canonicalUrl = `${SITE_URL}/product/${product.slug}`;

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
      url: canonicalUrl,
      availability: "https://schema.org/InStock",
    },
  };

  const faqJsonLd =
    product.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: product.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: stripHtml(item.answer),
            },
          })),
        }
      : null;

  const articleJsonLd = product.contentUpdatedAt
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: product.title,
        description: product.metaDescription || product.description,
        author: {
          "@type": "Organization",
          name: product.authorLine || "Synedica UK Science & QA Team",
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
        },
        dateModified: product.contentUpdatedAt,
        mainEntityOfPage: canonicalUrl,
      }
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
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

          {product.quickAnswer && (
            <div className="mt-4 rounded-lg border border-[#cfe8ee] bg-[#f3fbfc] p-4">
              <p className="text-sm leading-relaxed text-neutral-700">{product.quickAnswer}</p>
            </div>
          )}

          {product.description && (
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">{product.description}</p>
          )}

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

      {product.contentSections.length > 0 && (
        <div className="mx-auto mt-16 max-w-3xl border-t border-neutral-200 pt-12">
          {product.contentSections.map((section, index) => (
            <div key={index} className={index > 0 ? "mt-8" : ""}>
              {section.heading && (
                <h2 className="font-heading text-xl font-bold text-dark">{section.heading}</h2>
              )}
              <p
                className={`text-sm leading-relaxed text-neutral-600 [&_a]:text-primary-dark [&_a]:underline ${section.heading ? "mt-3" : ""}`}
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            </div>
          ))}
        </div>
      )}

      {product.faq.length > 0 && (
        <div className="mx-auto mt-12 max-w-3xl border-t border-neutral-200 pt-12">
          <h2 className="font-heading text-xl font-bold text-dark">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-6">
            {product.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-sm font-semibold text-neutral-900">{item.question}</h3>
                <p
                  className="mt-1.5 text-sm leading-relaxed text-neutral-600 [&_a]:text-primary-dark [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto mt-12 max-w-3xl border-t border-neutral-200 pt-8">
        <h2 className="text-sm font-semibold text-neutral-900">Related Reading</h2>
        <ul className="mt-3 space-y-1.5 text-sm">
          <li>
            <Link href="/products" className="text-primary-dark underline">
              Browse the full research catalogue
            </Link>
          </li>
          <li>
            <Link href="/product/nad-b12-synedica" className="text-primary-dark underline">
              Synedica NAD+ &amp; B12 Kit — a related coenzyme-vitamin research compound
            </Link>
          </li>
          <li>
            <Link href="/how-to-pay" className="text-primary-dark underline">
              Delivery &amp; payment information
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-primary-dark underline">
              Request batch documentation or a Certificate of Analysis
            </Link>
          </li>
        </ul>
      </div>

      {(product.authorLine || product.contentUpdatedAt) && (
        <div className="mx-auto mt-8 max-w-3xl border-t border-neutral-200 pt-6 text-xs text-neutral-500">
          {product.authorLine && <p>Author: {product.authorLine}</p>}
          {product.contentUpdatedAt && (
            <p className="mt-1">
              Last updated:{" "}
              {new Date(product.contentUpdatedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
