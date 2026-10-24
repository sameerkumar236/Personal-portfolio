import { generateSeoFiles } from "./generate-seo.js";

const generators = {
    seo: generateSeoFiles,
};

export const generateContent = async (name = "all") => {
    if (name === "all") {
        for (const generate of Object.values(generators)) await generate();
        return;
    }
    if (!Object.hasOwn(generators, name)) {
        throw new Error(`Unknown generator "${name}". Choose seo or all.`);
    }
    await generators[name]();
};

if (import.meta.main) await generateContent(process.argv[2]);
