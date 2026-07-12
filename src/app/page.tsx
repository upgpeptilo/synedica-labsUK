import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import FaqAccordion from "@/components/FaqAccordion";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import AlertBanner from "@/components/AlertBanner";
import CategoryTabs from "@/components/CategoryTabs";
import { getProducts } from "@/lib/products";

const faqs = [
  {
    q: "What are Synedica weight loss peptides?",
    a: "“Synedica” is a naming reference used to organise and label peptides like Retatrutide and Tirzepatide for research and informational purposes. It does not change the underlying compound.",
  },
  {
    q: "What is Synedica Retatrutide?",
    a: "Synedica Retatrutide is a triple agonist peptide acting on GLP-1, GIP, and glucagon pathways, supplied for research purposes only.",
  },
  {
    q: "How do retatrutide and tirzepatide differ?",
    a: "Retatrutide acts on three incretin pathways (GLP-1, GIP, glucagon) while tirzepatide acts on two (GLP-1, GIP), giving each a different metabolic research profile.",
  },
  {
    q: "What does “40mg” mean?",
    a: "40mg refers to the total peptide content of the prefilled pen, dosed in fractional increments across multiple uses.",
  },
  {
    q: "Can pens be reused with new needles?",
    a: "Each pen is designed for use with a fresh sterile needle per application; the needle should never be reused.",
  },
  {
    q: "Is the pen single-use or multi-dose?",
    a: "The pen is multi-dose, delivering multiple metered doses across its labelled fill volume before disposal.",
  },
];

export default async function Home() {
  const products = await getProducts();
  const latest = products.slice(0, 5);

  return (
    <div className="bg-white">
      <section className="px-4 pt-8">
        <AlertBanner
          title="Proudly UK-Based — Enfield, London"
          body="Synedica UK operates from our facility in Enfield, London. Every order ships fast across the UK, and every product is backed by our authenticity and quality guarantee."
          subtext="7 The Pavilion Business Centre, 6 Kinetic Crescent, Innova Park, Enfield, EN3 7FJ, UK"
          ctaHref="/reviews"
          ctaLabel="Read our reviews →"
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-5">
          <Link href="/products" className="block overflow-hidden rounded-lg sm:col-span-3">
            <Image
              src="/images/hero-explore.jpeg"
              alt="Explore Synedica weight loss solutions"
              width={1200}
              height={896}
              className="h-full w-full object-cover"
              priority
            />
          </Link>

          <div className="relative sm:col-span-2">
            <Link href="/products" className="block overflow-hidden rounded-lg">
              <Image
                src="/images/hero-order-now.jpeg"
                alt="Order now"
                width={768}
                height={1376}
                className="w-full object-cover"
              />
            </Link>
            {/* ponytail: overlap offset approximates the screenshot layout, tune once real breakpoints are checked */}
            <Link
              href="/contact"
              className="absolute -bottom-6 -left-6 hidden w-2/3 overflow-hidden rounded-lg border-4 border-white shadow-lg sm:block"
            >
              <Image
                src="/images/hero-contact-us.jpeg"
                alt="Contact us"
                width={1200}
                height={896}
                className="w-full object-cover"
              />
            </Link>
          </div>
        </div>
      </section>

      <CategoryTabs products={products.slice(0, 4)} />

      <section className="bg-section-alt px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-lg font-bold text-text-heading">
            Synedica&trade; Advancing Precision Peptide Research
          </h2>
          <div className="mt-2 border-t border-neutral-300" />

          <div className="mt-8 grid items-center gap-8 sm:grid-cols-[1fr_auto_1fr]">
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-semibold text-text-heading">
                  Retatrutide 40mg Injection Pen Kit
                </h3>
                <p className="mt-1 text-sm text-text-body">
                  Acts on three incretin pathways to suppress appetite, optimize glucose control and
                  enhance fat metabolism.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-text-heading">
                  Biotechnology Expertise for Development
                </h3>
                <p className="mt-1 text-sm text-text-body">
                  We provide biotechnology services that enhance research and development
                  capabilities.
                </p>
              </div>
            </div>

            <Image
              src="/images/synedica-retatrutide-40mg-injection-kit-600.png"
              alt="Retatrutide pen kit"
              width={260}
              height={260}
              className="mx-auto w-48 object-contain sm:w-64"
            />

            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-semibold text-text-heading">Concentration &amp; Quality</h3>
                <p className="mt-1 text-sm text-text-body">
                  40mg Retatrutide per prefilled pen. Triple hormone pathway activation. Synedica
                  pharmaceutical quality standard.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-text-heading">How It Works</h3>
                <p className="mt-1 text-sm text-text-body">
                  Optimize glucose control and enhance fat metabolism. Unlike conventional drugs,
                  Retatrutide works simultaneously on three metabolic pathways, enhancing weight loss
                  more efficiently and sustainably.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-text-heading">
            Latest on Sale
          </h2>
          <Link href="/products" className="text-sm font-semibold text-primary hover:underline">
            Browse all &rarr;
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {latest.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-primary-light px-4 py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 sm:grid-cols-2">
          <Image
            src="/images/synedica-retatrutide-40mg-injection-kit-600.png"
            alt="Retatrutide Synedica 40mg Original"
            width={500}
            height={400}
            className="mx-auto w-full max-w-sm object-contain"
          />
          <div>
            <h2 className="font-heading text-2xl font-bold text-text-heading">
              Retatrutide Synedica 40mg Original
            </h2>
            <p className="mt-3 text-sm text-text-body">
              The most advanced appetite suppressant available. It acts simultaneously on GLP-1, GIP,
              and glucagon receptors, delivering superior results compared to single-target therapies.
              Synedica Reta Healthcare blends real patient care with active medical research in one
              continuous system.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-full border-2 border-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary hover:bg-primary hover:text-white"
            >
              Explore +
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 px-4 py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-text-heading">
              Semaglutide 8mg Injection Pen Kit
            </h2>
            <p className="mt-3 text-sm text-text-body">
              Synedica Semaglutide&reg; Injection Pen Kit is the world&apos;s most advanced weight loss
              pen. Commonly known as &ldquo;Ozempic,&rdquo; semaglutide is an advanced medication which
              suppresses appetite leading to significant weight loss. It does this by mimicking the
              effects of GLP-1, a natural hormone that makes humans feel full from eating much smaller
              food.
            </p>
            <p className="mt-3 text-sm text-text-body">
              The Synedica Semaglutide&reg; 1mg Injection Pen Kit contains two pens, 12 disposable
              needles and an instruction booklet.
            </p>
            <p className="mt-3 text-sm text-text-body">
              Each pen has 4mg which can be delivered across 4 full doses of 1mg, or in increments of
              0.25mg, 0.5mg, 0.75mg or 1mg.
            </p>
            <p className="mt-3 text-sm text-text-body">
              Recommended dosage is 0.25mg for the first 4 weeks, then 0.5mg for the next 4 weeks.
              After 8 weeks the weekly dosage may be increased to 0.75mg or 1mg.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-full border-2 border-text-heading px-6 py-3 text-sm font-bold uppercase tracking-wide text-text-heading hover:bg-text-heading hover:text-white"
            >
              Explore +
            </Link>
          </div>
          <Image
            src="/images/synedica-semaglutide-glp-1-pen-kit-600.png"
            alt="Semaglutide 8mg Injection Pen Kit"
            width={500}
            height={400}
            className="mx-auto w-full max-w-sm object-contain"
          />
        </div>
      </section>

      <section className="bg-teal px-4 py-16 text-center text-white">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">Start Your Transformation Today</h2>
        <p className="mt-2 text-sm text-white/80">
          Purchase your products with free shipping and worldwide delivery.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/products"
            className="rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-teal hover:bg-white/90"
          >
            &#9733; Retatrutide 40mg
          </Link>
          <Link
            href="/products"
            className="rounded-full bg-orange px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:opacity-90"
          >
            NAD+ &amp; B12 &rsaquo;
          </Link>
        </div>
      </section>

      <ReviewsMarquee />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-[280px_1fr]">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-heading text-2xl font-light text-neutral-400">frequently</p>
            <p className="font-heading text-2xl font-light text-neutral-400">asked</p>
            <p className="font-heading text-3xl font-bold text-orange">QUESTIONS?</p>
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-text-heading">
              Frequently Asked Questions (FAQ) &mdash; Synedica Weight Loss Peptides
            </h2>
            <div className="mt-6">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
