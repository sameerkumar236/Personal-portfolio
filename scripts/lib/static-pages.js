import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "../../src/data/site.js";

const escapeHtml = (value) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const renderHead = ({ metadata, jsonLd }) => {
    const title = escapeHtml(metadata.title);
    const description = escapeHtml(metadata.description);
    const image = metadata.openGraph?.images?.[0] ?? site.image;
    const imageUrl = escapeHtml(typeof image === "string" ? image : image.url);
    const imageAlt = escapeHtml(
        typeof image === "string" ? metadata.title : (image.alt ?? metadata.title),
    );
    const schema = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
    return [
        `<title data-page-head>${title}</title>`,
        `<meta data-page-head name="description" content="${description}">`,
        `<meta data-page-head name="robots" content="${metadata.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}">`,
        `<meta data-page-head name="google-site-verification" content="${escapeHtml(site.googleVerification)}">`,
        `<link data-page-head rel="canonical" href="${escapeHtml(metadata.canonical ?? "")}">`,
        `<meta data-page-head property="og:title" content="${escapeHtml(metadata.openGraph?.title ?? metadata.title)}">`,
        `<meta data-page-head property="og:description" content="${escapeHtml(metadata.openGraph?.description ?? metadata.description)}">`,
        `<meta data-page-head property="og:type" content="${escapeHtml(metadata.openGraph?.type ?? "website")}">`,
        `<meta data-page-head property="og:url" content="${escapeHtml(metadata.openGraph?.url ?? metadata.canonical ?? "")}">`,
        `<meta data-page-head property="og:image" content="${imageUrl}">`,
        `<meta data-page-head property="og:image:alt" content="${imageAlt}">`,
        `<meta data-page-head property="og:site_name" content="${escapeHtml(site.title)}">`,
        `<meta data-page-head property="og:locale" content="${escapeHtml(site.locale)}">`,
        `<meta data-page-head name="twitter:card" content="summary_large_image">`,
        `<meta data-page-head name="twitter:site" content="${escapeHtml(site.twitter)}">`,
        `<meta data-page-head name="twitter:title" content="${title}">`,
        `<meta data-page-head name="twitter:description" content="${description}">`,
        `<meta data-page-head name="twitter:image" content="${imageUrl}">`,
        `<script data-page-head type="application/ld+json">${schema}</script>`,
    ].join("\n");
};

export const staticPages = () => {
    let publicDirectory = "";
    return {
        name: "static-page-metadata",
        apply: "build",
        enforce: "post",
        configResolved(config) {
            publicDirectory = config.publicDir;
        },
        async generateBundle(_, bundle) {
            const index = bundle["index.html"];
            if (!index || index.type !== "asset") {
                this.error("The bundled index.html is required to generate static pages.");
            }
            const template =
                typeof index.source === "string"
                    ? index.source
                    : new TextDecoder().decode(index.source);
            const manifest = JSON.parse(
                await readFile(path.join(publicDirectory, "page-metadata.json"), "utf-8"),
            );
            if (!manifest["/"] || !manifest["/404"]) {
                this.error("Home and 404 metadata are required. Run bun run seo:generate first.");
            }
            for (const [pathname, page] of Object.entries(manifest)) {
                const head = renderHead(page);
                const html = template.includes("<!--page-head-->")
                    ? template.replace("<!--page-head-->", head)
                    : template.replace("</head>", `${head}\n</head>`);
                if (pathname === "/") {
                    index.source = html;
                } else {
                    this.emitFile({
                        type: "asset",
                        fileName: `${pathname.slice(1)}/index.html`,
                        source: html,
                    });
                }
                if (pathname === "/404") {
                    this.emitFile({ type: "asset", fileName: "404.html", source: html });
                }
            }
        },
    };
};
