export const sitemapRoutes = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/projects", priority: 0.7, changeFrequency: "weekly" },
    { path: "/now", priority: 0.4, changeFrequency: "weekly" },
    { path: "/uses", priority: 0.5, changeFrequency: "monthly" },
    { path: "/locations", priority: 0.5, changeFrequency: "monthly" },
    { path: "/games", priority: 0.5, changeFrequency: "weekly" },
    { path: "/games/pixel-space-invaders", priority: 0.4, changeFrequency: "monthly" },
    { path: "/newpage", priority: 0.3, changeFrequency: "monthly" },
];

export const robotRules = [
    { agent: "*", allow: "/", disallow: ["/requests"] },
    ...[
        "OAI-SearchBot",
        "PerplexityBot",
        "ClaudeBot",
        "Google-Extended",
        "GoogleOther",
        "ChatGPT-User",
    ].map((agent) => ({ agent, allow: "/", disallow: [] })),
];
