import type { Plugin } from "vite";
import { buildRobotsTxt, buildSitemap } from "./buildSitemap";

/**
 * Emits sitemap.xml and robots.txt into the build output from the route table
 * in routes.ts.
 *
 * These are generated rather than kept in public/ so they cannot fall out of
 * sync with the router: adding a route to ROUTE_SEO is enough to get it
 * submitted to search engines.
 */
export const seoFiles = (): Plugin => ({
    name: "brasa-seo-files",
    apply: "build",
    generateBundle() {
        const lastModified = new Date().toISOString().slice(0, 10);

        this.emitFile({
            type: "asset",
            fileName: "sitemap.xml",
            source: buildSitemap(lastModified),
        });

        this.emitFile({
            type: "asset",
            fileName: "robots.txt",
            source: buildRobotsTxt(),
        });
    },
});
