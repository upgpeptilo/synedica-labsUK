"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/how-to-pay", label: "How to Pay" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label="Toggle menu"
        onClick={() => setOpen(true)}
        className="flex flex-col gap-1 p-1"
      >
        <span className="h-0.5 w-5 -rotate-3 rounded bg-primary" />
        <span className="h-0.5 w-5 rounded bg-primary" />
        <span className="h-0.5 w-5 rotate-3 rounded bg-primary" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <nav className="absolute left-0 top-0 flex h-full w-64 max-w-[80vw] flex-col gap-1 bg-white px-4 py-4 text-sm font-semibold uppercase tracking-wide text-dark shadow-xl">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="mb-2 self-end p-1 text-xl leading-none text-neutral-500"
            >
              ×
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
