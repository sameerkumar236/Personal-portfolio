import { myInfo } from "./portfolio.js";
import envvars from "../lib/envvars.js";

const createMetadata = (title, description, path) => ({
    title: title.includes(myInfo.name) ? title : `${title} | ${myInfo.name}`,
    description,
    canonical: `${envvars.BASE_URL}${path}`,
    openGraph: {
        title,
        description,
        type: "website",
        url: `${envvars.BASE_URL}${path}`,
        images: [{ url: `${envvars.BASE_URL}/preview.webp` }],
    },
});

export const pageMetadata = {
    home: createMetadata(
        "Sameer Kumar | Software Developer",
        "Software developer from India building fast, scalable web apps with TypeScript, React, Next.js, Node.js. Open to freelance and full-time opportunities.",
        "/",
    ),
    projects: createMetadata(
        "Projects",
        "Full-stack SaaS projects built by Sameer — rum-core RUM monitoring, Blade Tools, Mapware threat intelligence, Ref.com link management, and more.",
        "/projects",
    ),
    now: createMetadata(
        "Now",
        "What Sameer is working on now — current projects, learning goals, and open source contributions.",
        "/now",
    ),
    uses: createMetadata("Uses", "Tools, languages, and frameworks I use daily.", "/uses"),
    locations: createMetadata(
        "About — Location & Background",
        "Software developer from India working remotely with teams across the country.",
        "/locations",
    ),
    location: createMetadata(
        "Location & Background",
        "Software developer from Chhattisgarh, working remotely.",
        "/locations",
    ),
    games: createMetadata(
        "Arcade",
        "Play experimental mini-games hidden in my portfolio.",
        "/games",
    ),
    spaceInvaders: createMetadata(
        "Pixel Space Invaders",
        "A mini pixel space arcade game hidden in my portfolio.",
        "/games/pixel-space-invaders",
    ),
    playground: createMetadata("New Page", "A clock and notes page.", "/newpage"),
    notFound: {
        ...createMetadata("Page Not Found", "The requested page could not be found.", "/404"),
        noindex: true,
    },
};

export const getLocationMetadata = (city) =>
    createMetadata(
        `Software Developer in ${city.name}, ${city.state}`,
        `Software developer from India with experience building products for teams in ${city.name}, ${city.state} and remotely across the country.`,
        `/locations/${city.slug}`,
    );

export const pageHeadings = {
    projects: { title: "Projects", description: "SaaS products and tools I've built end-to-end." },
    now: { title: "Now", description: "What I'm focused on right now." },
    uses: { title: "Uses", description: "Tools, languages, and frameworks I work with." },
    locations: {
        title: "Locations",
        description: "Where I'm from and the regions I'm connected to.",
    },
};

export const pageCopy = {
    copyright: "Sameer.dev © 2026",
    locations: {
        origin: "Chhattisgarh, India",
        introduction: "I'm a software developer from",
        remoteExperience:
            ". I've worked in liqvid company",
        description: "Software developer from Chhattisgarh, working remotely.",
        aboutTitle: "About",
        aboutIntroduction: "I'm a full stack software developer from",
        aboutDescription:
            ". I build scalable SaaS products, open source tools, and web applications — working remotely with teams anywhere.",
        stackTitle: "Tech Stack",
        stackDescription:
            "TypeScript, React, Next.js, Node.js, Express, Python, Go, PostgreSQL, MongoDB, Redis, Prisma, Docker, Cloudflare, Tailwind CSS — end-to-end full stack development for modern web applications.",
        projectsTitle: "Projects",
        openSourceTitle: "Open Source",
        openSourceIntroduction: "I maintain",
        openSourceProject: "Go Tunnel",
        openSourceDescription: ", and contribute to the TypeScript ecosystem.",
    },
    arcade: {
        title: "ARCADE_MODE.exe",
        description: "Experimental mini-games environment. High-score tracking enabled.",
        initialize: "INITIALIZE",
        header: "GAMES.exe",
        invadersHeader: "PIXEL_INVADERS.exe",
        exitPortfolio: "EXIT_TO_PORTFOLIO",
        exitArcade: "EXIT_TO_ARCADE",
    },
    notFound: {
        code: "404",
        title: "Page not found",
        description: "Bahut tej ho rahe ho???",
        shrug: "¯\\_(ツ)_/¯",
        back: "User go back!!!",
        decoration: '"Lost in the void"',
    },
    notes: {
        storageKey: "newpage-notes",
        placeholder: "Write a note...",
        linkPlaceholder: "Add link",
        add: "Add",
        pin: "Pin",
        unpin: "Unpin",
        remove: "Delete",
        empty: "No notes yet. Type above and press Enter.",
    },
};

export const arcadeGames = [
    {
        id: "pixel-space-invaders",
        title: "PIXEL SPACE INVADERS",
        description: "Defend the portfolio from a swarm of pixelated invaders.",
        version: "v1.0.42-pixel",
        difficulty: "HARD",
        href: "/games/pixel-space-invaders",
    },
];
