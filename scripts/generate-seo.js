import { writeFile } from "node:fs/promises";
import path from "node:path";
import { cities } from "../src/data/locations.js";
import { getLocationMetadata, pageMetadata } from "../src/data/pages.js";
import { myInfo } from "../src/data/portfolio.js";
import { robotRules, sitemapRoutes } from "../src/data/seo.js";
import { site } from "../src/data/site.js";

const escapeXml = (value) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

export const generateSeoFiles = async () => {
    const baseUrl = (process.env.VITE_BASE_URL || "https://sameer.dev").replace(/\/$/, "");
    const absoluteUrl = (pathname) => new URL(pathname, `${baseUrl}/`).href;
    const imageUrl = (value) => {
        const image = new URL(value, `${baseUrl}/`);
        return image.origin === "https://sameer.dev"
            ? absoluteUrl(`${image.pathname}${image.search}${image.hash}`)
            : image.href;
    };
    const generatedAt = new Date().toISOString();
    const routes = [
        ...sitemapRoutes.map((route) => ({
            ...route,
            updatedAt: generatedAt,
        })),
        ...cities.map((city) => ({
            path: `/locations/${city.slug}`,
            priority: 0.5,
            changeFrequency: "monthly",
            updatedAt: generatedAt,
        })),
    ];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
    .map((route) => {
        const images =
            route.path === "/"
                ? [
                      { path: site.image, title: site.title },
                      { path: myInfo.imageUrl, title: myInfo.name },
                      { path: site.logo, title: site.name },
                  ]
                : [];
        return `  <url>
    <loc>${escapeXml(absoluteUrl(route.path))}</loc>
    <lastmod>${route.updatedAt}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>${images
        .map(
            (image) => `
    <image:image>
      <image:loc>${escapeXml(absoluteUrl(image.path))}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
    </image:image>`,
        )
        .join("")}
  </url>`;
    })
    .join("\n")}
</urlset>
`;
    const robots =
        robotRules
            .map((rule) =>
                [
                    `User-agent: ${rule.agent}`,
                    `Allow: ${rule.allow}`,
                    ...rule.disallow.map((pathname) => `Disallow: ${pathname}`),
                ].join("\n"),
            )
            .join("\n\n") + `\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`;
    const manifest = {};
    const addPage = (pathname, metadata) => {
        const url = absoluteUrl(pathname);
        manifest[pathname] = {
            metadata: {
                ...metadata,
                canonical: url,
                openGraph: {
                    ...metadata.openGraph,
                    url,
                    images: (metadata.openGraph?.images ?? [{ url: site.image }]).map((image) =>
                        typeof image === "string"
                            ? imageUrl(image)
                            : { ...image, url: imageUrl(image.url) },
                    ),
                },
            },
            jsonLd: {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: metadata.title,
                description: metadata.description,
                url,
                author: { "@type": "Person", name: myInfo.name, url: baseUrl },
                isPartOf: { "@type": "WebSite", name: site.title, url: baseUrl },
            },
        };
    };
    const staticPages = [
        ["/", pageMetadata.home],
        ["/projects", pageMetadata.projects],
        ["/now", pageMetadata.now],
        ["/uses", pageMetadata.uses],
        ["/locations", pageMetadata.locations],
        ["/games", pageMetadata.games],
        ["/games/pixel-space-invaders", pageMetadata.spaceInvaders],
        ["/newpage", pageMetadata.playground],
        ["/404", pageMetadata.notFound],
    ];
    for (const [pathname, metadata] of staticPages) addPage(pathname, metadata);
    for (const city of cities) addPage(`/locations/${city.slug}`, getLocationMetadata(city));
    const publicDirectory = path.join(process.cwd(), "public");
    await writeFile(path.join(publicDirectory, "sitemap.xml"), sitemap, "utf-8");
    await writeFile(path.join(publicDirectory, "robots.txt"), robots, "utf-8");
    await writeFile(
        path.join(publicDirectory, "page-metadata.json"),
        `${JSON.stringify(manifest, null, 2)}\n`,
        "utf-8",
    );
};
