import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";
import { seoFiles } from "./src/seo/vitePluginSeoFiles";

export default defineConfig({
    plugins: [
        react(),
        svgr({
            include: "**/*.svg",
            svgrOptions: {
                exportType: "named",
                namedExport: "ReactComponent",
            },
        }),
        seoFiles(),
    ],
    envPrefix: ["VITE_", "REACT_APP_"],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/setupTests.ts"],
    },
});
