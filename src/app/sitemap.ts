import type { MetadataRoute } from "next";

const siteUrl = "https://aakarshbommakanti.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: "2026-09-30",
    },
  ];
}
