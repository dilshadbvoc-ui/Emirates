import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "EmiratesVisa.ae — UAE Family Visa Cost Calculator & Services",
  description: "Get an instant, itemized breakdown of Dubai family visa costs. Sponsor spouses, children, parents, and maids 100% online through our smart calculator.",
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
