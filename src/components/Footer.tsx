import Link from "next/link";

const linkColumns = [
  { href: "/products", label: "Products" },
  { href: "/account", label: "My Account" },
  { href: "/contact", label: "Contact" },
];

// ponytail: these routes aren't built yet, shown as plain text for visual parity until they exist
const plannedLinks = ["How to Pay", "Privacy Policy", "Wholesale"];

export default function Footer() {
  return (
    <footer className="bg-dark text-white/90">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <nav className="flex flex-col gap-2 text-sm">
            {linkColumns.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
          <ul className="flex flex-col gap-2 text-sm text-white/70">
            {plannedLinks.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
          <div>
            <h3 className="font-semibold text-white">Newsletter</h3>
            <p className="mt-1 text-sm text-white/70">Join our newsletter for new offers.</p>
            <form className="mt-3 flex">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-l bg-white/10 px-3 py-2 text-sm placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-r bg-white/20 px-4 text-sm font-semibold hover:bg-white/30"
              >
                →
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 space-y-1 border-t border-white/15 pt-6 text-xs leading-relaxed text-white/60">
          <p>Synedica UK. For research purposes.</p>
          <p>info@synedica-uk.shop</p>
          <p>© {new Date().getFullYear()} Synedica UK. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
