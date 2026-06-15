import type { Metadata, Viewport } from "next";
import "./globals.css";
import Layout from "@/components/Layout";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#EF3340",
};

export const metadata: Metadata = {
  title: "EmiratesVisa.ae — UAE Family Visa Cost Calculator & Services",
  description: "Get an instant, itemized breakdown of Dubai family visa costs. Sponsor spouses, children, parents, and maids 100% online through our smart calculator.",
  openGraph: {
    title: "EmiratesVisa.ae — UAE Family Visa Cost Calculator",
    description: "Know your exact UAE family visa cost in under 30 seconds. Itemized government fees for new visas and renewals.",
    url: "https://emiratesvisa.ae",
    siteName: "EmiratesVisa.ae",
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmiratesVisa.ae — UAE Family Visa Cost Calculator",
    description: "Know your exact UAE family visa cost in under 30 seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Layout>
          {children}
        </Layout>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
