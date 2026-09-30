import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://aakarshbommakanti.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  alternates: { canonical: "/" },
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
    url: siteUrl,
    images: [{ url: "/profile.jpg", alt: "Aakarsh Bommakanti" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakarsh Bommakanti | Sports Media & Content Leader",
    description:
      "Sports media, content strategy, storytelling and audience growth across global football and sports platforms.",
    images: ["/profile.jpg"],
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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aakarsh Bommakanti",
  url: siteUrl,
  jobTitle: "Sports Media & Content Leader",
  description:
    "Sports media and content leader specialising in content strategy, storytelling, publishing and audience growth.",
  sameAs: ["https://x.com/aakarsh_ab"],
  knowsAbout: [
    "Sports Media",
    "Content Strategy",
    "YouTube Publishing",
    "Sports Storytelling",
    "Audience Development",
    "Digital Media",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
