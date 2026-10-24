import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default defineConfig([
    globalIgnores(["dist/**", "node_modules/**", "public/**"]),
    js.configs.recommended,
    {
        files: ["**/*.{js,jsx,mjs}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
    },
    {
        files: ["src/**/*.{js,jsx}"],
        languageOptions: { globals: globals.browser },
        plugins: { react, "react-hooks": reactHooks, "react-refresh": reactRefresh },
        rules: {
            "react/jsx-uses-vars": "error",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        },
    },
    {
        files: ["*.{js,mjs}", "scripts/**/*.js"],
        languageOptions: { globals: { ...globals.node, Bun: "readonly" } },
    },
]);
