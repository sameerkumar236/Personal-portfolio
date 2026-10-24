import { skills } from "./portfolio.js";

const skillValues = Object.values(skills);

const grouped = {};

for (const s of skillValues) {
    (grouped[s.type] ??= []).push({ name: s.name, iconName: s.iconName });
}

export const usesEntries = Object.entries(grouped).map(([category, items]) => ({
    category,
    items,
}));

export const lastUpdated = "2026-07-10";
