import { education, projects, skillsArray } from "./portfolio.js";
import {
    personJsonLd,
    webSiteJsonLd,
    buildFAQJsonLd,
    buildItemListJsonLd,
    buildBreadcrumbListJsonLd,
    buildWebPageJsonLd,
} from "../lib/json-ld.js";
import envvars from "../lib/envvars.js";

const skillsLd = buildItemListJsonLd(
    skillsArray.map((s) => ({ name: s.name })),
    "Skills & Technologies",
);

const visibleProjects = projects.filter((p) => p.show);

const projectsLd = buildItemListJsonLd(
    visibleProjects.map((p) => ({
        name: p.title,
        description: p.description,
        url: p.links.find((l) => l.name === "Live")?.url,
        image: p.imageUrl ? `${envvars.BASE_URL}${p.imageUrl}` : undefined,
    })),
    "Projects by Sameer Kumar",
);

const educationLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Education",
    numberOfItems: education.length,
    itemListElement: education.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
            "@type": entry.schemaType ?? "EducationalOccupationalCredential",
            name: entry.qualification,
            [entry.schemaType === "Event" ? "organizer" : "recognizedBy"]: {
                "@type": "EducationalOrganization",
                name: entry.institution,
            },
            description: entry.points.join(" "),
        },
    })),
});

const breadcrumbLd = buildBreadcrumbListJsonLd([{ name: "Home", url: envvars.BASE_URL }]);

const webPageLd = buildWebPageJsonLd(
    "Sameer Kumar | Software Developer",
    "Portfolio of Sameer Kumar, a full stack software developer from India.",
    envvars.BASE_URL,
    "Software Development",
);

export const homeSchemas = [
    personJsonLd,
    webSiteJsonLd,
    webPageLd,
    breadcrumbLd,
    skillsLd,
    projectsLd,
    educationLd,
];
