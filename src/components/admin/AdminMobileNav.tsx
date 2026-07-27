"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";
import { links, isActive } from "./AdminSidebar";

export default function AdminMobileNav({ pendingOrders = 0 }: { pendingOrders?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 bg-[#eef1fb] md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#1b6b80]">Synedica Admin</p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle admin menu"
          className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700"
        >
          Menu ▾
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
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
          <form action={signOut} className="pt-2">
            <button
              type="submit"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-left text-neutral-600 hover:bg-white"
            >
              Sign out
            </button>
          </form>
        </nav>
      )}
    </div>
  );
}
