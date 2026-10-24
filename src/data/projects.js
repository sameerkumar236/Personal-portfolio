import { projects } from "./portfolio.js";

export const visibleProjects = projects.filter((p) => p.show);

export const lastUpdated = "2026-07-10";
