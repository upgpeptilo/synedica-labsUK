import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basket – Synedica UK",
  description: "Review the items in your Synedica UK basket before checkout.",
  robots: { index: false, follow: false },
};

export default function BasketLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
