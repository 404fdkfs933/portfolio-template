import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/contact"].map((p) => ({ url: `${site.url}${p}` }));
  return [...pages, ...getProjects().map((p) => ({ url: `${site.url}${p.href}` }))];
}
