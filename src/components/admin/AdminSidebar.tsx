"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Home" },
  { href: "/admin/products/new", label: "Add Product" },
  { href: "/admin/products", label: "All Products" },
  { href: "/admin/blog/new", label: "New Blog Post" },
  { href: "/admin/blog", label: "Blog Posts" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/settings", label: "Settings" },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  if (href === "/admin/products/new") return pathname === "/admin/products/new";
  if (href === "/admin/blog/new") return pathname === "/admin/blog/new";
  if (href === "/admin/blog")
    return (pathname === "/admin/blog" || pathname.startsWith("/admin/blog/")) && pathname !== "/admin/blog/new";
  if (href === "/admin/orders") return pathname === "/admin/orders" || pathname.startsWith("/admin/orders/");
  if (href === "/admin/settings") return pathname === "/admin/settings";
  return pathname === "/admin/products" || pathname.startsWith("/admin/products/") && !pathname.startsWith("/admin/products/new");
}

export { links, isActive };

export default function AdminSidebar({ pendingOrders = 0 }: { pendingOrders?: number }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-neutral-200 bg-[#eef1fb] p-5 md:flex">
      <p className="mb-6 text-sm font-semibold uppercase tracking-wide text-[#1b6b80]">Synedica Admin</p>
      <nav className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center justify-between rounded-lg px-3 py-2 ${
              isActive(pathname, link.href) ? "bg-white text-[#1b6b80] shadow-sm" : "hover:bg-white/60"
            }`}
          >
            {link.label}
            {link.href === "/admin/orders" && pendingOrders > 0 && (
              <span className="animate-pulse rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                {pendingOrders}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <form action={signOut} className="mt-auto pt-6">
        <button
          type="submit"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-600 hover:bg-white"
        >
          Sign out
        </button>
      </form>
    </aside>
  );
}
