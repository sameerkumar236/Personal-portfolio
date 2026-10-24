import { contactLinksArray, myInfo } from "../data/portfolio.js";
import envvars from "./envvars.js";

const cleanedPersonDescription = myInfo.description.replace(/[*#_[\]()\\]/g, "");

export const personJsonLd = JSON.stringify(
    {
        "@context": "https://schema.org",
        "@type": "Person",
        name: myInfo.name,
        alternateName: "Sameer",
        description: cleanedPersonDescription,
        url: envvars.BASE_URL,
        image: `${envvars.BASE_URL}${myInfo.imageUrl}`,
        sameAs: contactLinksArray.map((c) => c.url),
        jobTitle: "Software Developer",
        knowsAbout: [
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Python",
            "Go",
            "PostgreSQL",
            "MongoDB",
            "Docker",
        ],
    },
    null,
    2,
);

const webSiteName = "Sameer Kumar | Software Developer";

const webSiteDescription =
    "Software developer from India building fast, scalable web apps with TypeScript, React, Next.js, Node.js.";

export const webSiteJsonLd = JSON.stringify(
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: webSiteName,
        description: webSiteDescription,
        url: envvars.BASE_URL,
        author: {
            "@type": "Person",
            "@id": `${envvars.BASE_URL}/#person`,
        },
    },
    null,
    2,
);

export function buildBreadcrumbListJsonLd(items) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
    return JSON.stringify(schema, null, 2);
}

export function buildOrganizationJsonLd(name, description, url, logoUrl, sameAs) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name,
        description,
        url,
        logo: {
            "@type": "ImageObject",
            url: logoUrl,
        },
        sameAs,
    };
    return JSON.stringify(schema, null, 2);
}

export function buildFAQJsonLd(qaList) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: qaList.map((qa) => ({
            "@type": "Question",
            name: qa.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: qa.answer,
            },
        })),
    };
    return JSON.stringify(schema, null, 2);
}

export function buildItemListJsonLd(items, listName) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: listName,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "SoftwareApplication",
                name: item.name,
                url: item.url,
                description: item.description,
                ...(item.image ? { image: item.image } : {}),
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Web",
            },
        })),
    };
    return JSON.stringify(schema, null, 2);
}

export function buildWebPageJsonLd(title, description, url, about) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": url,
        name: title,
        description,
        url,
        ...(about ? { about: { "@type": "Thing", name: about } } : {}),
    };
    return JSON.stringify(schema, null, 2);
}
