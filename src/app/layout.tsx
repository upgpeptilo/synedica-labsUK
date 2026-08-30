import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { getWhatsappNumber } from "@/lib/settings";

const heading = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synedica UK",
  description: "A trusted supplier of premium peptides for scientific research and development.",
  verification: {
    google: "Xcv8YZ2d0thi7xzPwboYsi28smXbTVwmCcZrbb4bZuI",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsappNumber = await getWhatsappNumber();

  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <SiteChrome whatsappNumber={whatsappNumber}>{children}</SiteChrome>
      </body>
    </html>
  );
}
