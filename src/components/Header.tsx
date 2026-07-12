import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
  { href: "/how-to-pay", label: "How to Pay" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-neutral-200 bg-white">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-6 sm:py-4">
          <Link
            href="/"
            className="absolute left-[52%] top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 sm:static sm:left-auto sm:top-auto sm:z-auto sm:mr-2 sm:translate-x-0 sm:translate-y-0 sm:shrink-0"
          >
            <Image
              src="/images/logo.png"
              alt="Synedica UK"
              width={150}
              height={28}
              priority
              className="h-24 w-auto sm:h-[84px]"
            />
          </Link>

          <div className="relative z-10">
            <MobileNav />
          </div>

          <form action="/products" className="hidden flex-1 max-w-md sm:flex">
            <input
              type="text"
              name="q"
              placeholder="Search products…"
              className="w-full rounded-l border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex items-center justify-center rounded-r bg-primary px-3 text-white hover:bg-primary-dark"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
          </form>

          <div className="relative z-10 flex items-center gap-3 text-dark sm:gap-4">
            <Link href="/basket" aria-label="Basket">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7 sm:h-6 sm:w-6">
                <path d="M6 6h15l-1.5 9h-12z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6 5 3H2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <nav className="hidden justify-center gap-8 border-b border-neutral-200 bg-neutral-50 py-3 text-sm font-semibold uppercase tracking-wide text-dark sm:flex">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-primary">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
