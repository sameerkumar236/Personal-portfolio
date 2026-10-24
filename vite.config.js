import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { staticPages } from "./scripts/lib/static-pages.js";

export default defineConfig({
    plugins: [react(), staticPages()],
    resolve: {
        alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
});
