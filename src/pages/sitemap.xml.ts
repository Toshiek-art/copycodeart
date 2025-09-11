import type { APIContext } from "astro";
import projects from "../data/projects";
import writings from "../data/writing";

export async function GET({ site }: APIContext) {
  // site può essere URL o undefined in dev → convertilo a stringa e togli lo slash finale
  const base =
    ((site ? site.href : "https://copycodeart.pages.dev") as string).replace(/\/$/, "");

  const pages = [
    "", "work", "writing", "contact",
    ...projects.filter(p => p.status === "published" && p.visible).map(p => `work/${p.slug}`),
    ...writings.filter(w => w.status === "published" && w.visible).map(w => `writing/${w.slug}`),
  ];

  const urls = pages.map((p) => `<url><loc>${base}/${p}</loc></url>`).join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml" } }
  );
}
