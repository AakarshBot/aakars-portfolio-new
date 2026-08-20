import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Aakarsh Bommakanti | Sports Media & Content Leader",
  description:
    "Aakarsh Bommakanti is a sports media and content leader with 10+ years of experience across FIFA, FanCode, Hyderabad FC, Microsoft and global football publishing.",
  keywords: [
    "Aakarsh Bommakanti",
    "sports media",
    "sports content",
    "content strategy",
    "sports media manager",
    "FIFA content",
    "YouTube publishing",
    "FanCode",
    "Hyderabad FC",
    "football content",
    "sports storytelling",
  ],
  authors: [{ name: "Aakarsh Bommakanti" }],
  creator: "Aakarsh Bommakanti",
  publisher: "Aakarsh Bommakanti",
  category: "Sports Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Aakarsh Bommakanti | Sports Media & Content Leader",
    description:
      "Sports media, content strategy, storytelling and audience growth across FIFA, FanCode, Hyderabad FC and Microsoft.",
    type: "website",
    locale: "en_IN",
    siteName: "Aakarsh Bommakanti",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakarsh Bommakanti | Sports Media & Content Leader",
    description:
      "Sports media, content strategy, storytelling and audience growth across global football and sports platforms.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
