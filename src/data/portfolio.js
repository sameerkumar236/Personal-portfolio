export const skills = {
    // Languages
    html: { type: "Languages", name: "HTML", iconName: "SiHtml5" },
    css: { type: "Languages", name: "CSS", iconName: "SiCss" },
    typescript: {
        type: "Languages",
        name: "TypeScript",
        iconName: "SiTypescript",
    },
    javascript: {
        type: "Languages", 
        name: "JavaScript",
        iconName: "SiJavascript",
    },
    python: { type: "Languages", name: "Python", iconName: "FaPython" },
    go: { type: "Languages", name: "Go", iconName: "FaGolang" },
    // Backend
    nodejs: { type: "Backend", name: "Node.js", iconName: "FaNodeJs" },
    bun: { type: "Backend", name: "Bun", iconName: "SiBun" },
    elysia: { type: "Backend", name: "Elysia", iconName: "GrFirefox" },
    express: { type: "Backend", name: "Express", iconName: "SiExpress" },
    hono: { type: "Backend", name: "Hono", iconName: "SiHono" },
    fastapi: { type: "Backend", name: "FastAPI", iconName: "SiFastapi" },
    flask: { type: "Backend", name: "Flask", iconName: "SiFlask" },
    socketdotio: {
        type: "Backend",
        name: "Socket.io",
        iconName: "SiSocketdotio",
    },
    // Frontend
    react: { type: "Frontend", name: "React", iconName: "SiReact" },
    nextjs: { type: "Frontend", name: "Next.js", iconName: "SiNextdotjs" },
    angular: { type: "Frontend", name: "Angular", iconName: "SiAngular" },
    redux: { type: "Frontend", name: "Redux", iconName: "SiRedux" },
    zustand: { type: "Frontend", name: "Zustand", iconName: "SiReact" },
    shadcn: { type: "Frontend", name: "ShadcnUI", iconName: "SiShadcnui" },
    tailwind: {
        type: "Frontend",
        name: "TailwindCSS",
        iconName: "SiTailwindcss",
    },
    framer: { type: "Frontend", name: "FramerMotion", iconName: "SiFramer" },
    ffmpeg: { type: "Frontend", name: "FfmpegWASM", iconName: "SiFfmpeg" },
    // Databases
    mongodb: { type: "Databases", name: "MongoDB", iconName: "SiMongodb" },
    postgresql: {
        type: "Databases",
        name: "PostgreSQL",
        iconName: "BiLogoPostgresql",
    },
    sqlite: { type: "Databases", name: "SQLite", iconName: "SiSqlite" },
    redis: { type: "Databases", name: "Redis", iconName: "DiRedis" },
    prisma: { type: "Databases", name: "Prisma", iconName: "SiPrisma" },
    drizzle: { type: "Databases", name: "Drizzle", iconName: "SiDrizzle" },
    // Dev / Tools
    cloudflare: {
        type: "Dev / Tools",
        name: "Cloudflare",
        iconName: "FaCloudflare",
    },
    docker: { type: "Dev / Tools", name: "Docker", iconName: "SiDocker" },
    git: { type: "Dev / Tools", name: "Git", iconName: "SiGit" },
    postman: { type: "Dev / Tools", name: "Postman", iconName: "SiPostman" },
    swagger: { type: "Dev / Tools", name: "Swagger", iconName: "SiSwagger" },
    cloudinary: {
        type: "Dev / Tools",
        name: "Cloudinary",
        iconName: "SiCloudinary",
    },
    vercel: { type: "Dev / Tools", name: "Vercel", iconName: "SiVercel" },
    esbuild: { type: "Dev / Tools", name: "esbuild", iconName: "SiEsbuild" },
    // Libraries
    webvitals: { type: "Libraries", name: "web-vitals", iconName: "SiGooglechrome" },
};

export const contactLinks = {
    github: {
        name: "github",
        url: "https://github.com/sameerkumar236",
        iconName: "IoLogoGithub",
        target: "_blank",
    },
    linkedIn: {
        name: "linkedin",
        url: "https://www.linkedin.com/in/sameer-kumar-03b2b3326/",
        iconName: "FaLinkedinIn",
        target: "_blank",
    },
    mail: {
        name: "mail",
        url: "mailto:sameersizoxta625@gmail.com",
        iconName: "SiGmail",
        target: "_self",
    }
};

export const contactLinksArray = Object.values(contactLinks);

export const skillsArray = [
    skills.javascript,
    skills.typescript,
    skills.nodejs,
    skills.express,
    skills.socketdotio,
    skills.react,
    skills.nextjs,
    skills.redux,
    skills.zustand,
    skills.shadcn,
    skills.tailwind,
    skills.mongodb,
    skills.postgresql,
    skills.cloudflare,
    skills.git,
    skills.postman,
    skills.swagger,
    skills.vercel,
    skills.html,
    skills.css,
    skills.webvitals,
    skills.esbuild,
];

export const projects = [
    {
        show: true,
        title: "rum-core",
        description:
            "Full-stack Real User Monitoring SaaS: a ~15 KB vanilla JS SDK captures Core Web Vitals and fetch/XHR timing, ships batched events to an Express.js ingest API, and serves live analytics through MongoDB $facet aggregations on a React dashboard.",
        imageUrl: "/projectThumbnails/rum-core.webp",
        iconUrl: "/projectLogos/rum-core.ico",
        skills: [
            skills.javascript,
            skills.nodejs,
            skills.express,
            skills.mongodb,
            skills.webvitals,
            skills.esbuild,
            skills.cloudflare,
        ],
        links: [
            {
                name: "Live",
                url: "https://rum-core.onrender.com/",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/sameerkumar236/rum-core",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        show: true,
        title: "Collab",
        description:
            "Google Docs meets VS Code: a real-time workspace where teams co-edit pages and code, chat, and run code together. Powered by Yjs CRDT for conflict-free offline sync, with server-enforced Owner/Editor/Viewer roles.",
        imageUrl: "/projectThumbnails/collab.png",
        iconUrl: "/projectLogos/Collab.png",
        skills: [skills.typescript, skills.nextjs, skills.tailwind, skills.shadcn, skills.postgresql],
        links: [
            {
                name: "Live",
                url: "https://code-collab-tmq8.onrender.com/",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/sameerkumar236/Code-collab",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        show: true,
        title: "LMS",
        description:
            "A multi-tenant learning platform where institutions get their own isolated space, with five role levels, 15+ interactive activities, and AI-powered pronunciation scoring that maps learners to CEFR levels (A1-C2).",
        imageUrl: "/projectThumbnails/lms.png",
        iconUrl: "/projectLogos/Lms.png",
        skills: [
            skills.typescript,
            skills.express,
            skills.postgresql,
            skills.tailwind,
        ],
        links: [
            {
                name: "Live",
                url: "https://lms.liqvid.com/",
                iconName: "VscLinkExternal",
                target: "_blank",
            }
        ],
    },
];



export const experiences = [
    {
        company: "Liqvid",
        iconUrl: "/Liqvid-logo.png",
        position: "Full Stack Developer",
        location: "Noida, India",
        period: "Dec 2025 - Present",
        points: [
            "Developed a high-performance **eBook reader** with **React.js** and **Tailwind CSS**, reducing rendering time by ||30%||.",
            "Integrated **Swagger-documented REST APIs** for efficient, scalable content delivery.",
            "Optimized UI performance with **lazy loading** and **memoization**, reducing rendering delays by ||25%||.",
        ],
    },
    {
        company: "Dice Academy",
        iconUrl: "/Dice-logo.jfif",
        position: "Full Stack Developer",
        location: "Saket, India",
        period: "Jul 2025 - Dec 2025",
        points: [
            "Built responsive, **production-ready web applications** using **React.js** and **Tailwind CSS**.",
            "Improved code quality through **debugging**, **optimization**, and development best practices.",
        ],
    },
];

export const education = [
    {
        institution: "Indira Gandhi National Open University",
        iconUrl: "/ignou-logo.jfif",
        qualification: "Bachelor of Computer Application",
        period: "2024 - 2027",
        points: ["Focused on full-stack development and problem solving."],
    },
    {
        institution: "Dice Academy",
        iconUrl: "/Dice-logo.jfif",
        qualification: "Full-Stack Development Course",
        period: "2025 - 2026",
        points: [
            "Learned modern JavaScript, React, Express.js, MongoDB, and responsive UI patterns through real-world projects.",
        ],
    },
    {
        institution: "Dice Academy",
        iconUrl: "/Dice-logo.jfif",
        qualification: "Hackathon",
        schemaType: "Event",
        period: "2025",
        points: [
            "Built responsive websites, handled data, and collaborated with a team.",
        ],
    },
    {
        institution: "Freedom Employability Academy",
        iconUrl: "/Fea-logo.jfif",
        qualification: "English Speaking Course",
        period: "2022 - 2023",
        points: [
            "Developed English speaking and communication skills, with a focus on personality development.",
        ],
    },
];

export const myInfo = {
    name: "Sameer Kumar",
    title: "Software Developer",
    description:
        "Software Developer specializing in the **React.js/Node.js ecosystem**, building ||privacy-first||, scalable ||SaaS products|| with a focus on operational reliability and long-term cost-efficiency.\\\\I work across the **full stack** — from **database design** and **backend APIs** to responsive **frontend interfaces** — preferring to ||own features end-to-end||.\\\\Most of what I build is shaped by one question: ||does this stay fast and cost less as it scales?||",
    imageUrl: "/me.webp",
    contacts: contactLinksArray,
};