"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import Header from "./Header";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";
import { CartProvider } from "@/lib/cart";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <main className="flex-1">{children}</main>;

  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
      <Script id="smartsupp-chat" strategy="afterInteractive">
        {`
          var _smartsupp = _smartsupp || {};
          _smartsupp.key = 'e0445f0470f0f56c8c2f6c84a22ab65db52c87fc';
          window.smartsupp||(function(d) {
            var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
            s=d.getElementsByTagName('script')[0];c=d.createElement('script');
            c.type='text/javascript';c.charset='utf-8';c.async=true;
            c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
          })(document);
        `}
      </Script>
    </CartProvider>
  );
}
