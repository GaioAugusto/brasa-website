import { indexableRoutes, ROUTE_SEO } from "./routes";
import { absoluteUrl, SITE_URL } from "./siteConfig";

const escapeXml = (value: string): string =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

/**
 * Builds sitemap.xml from the route table, so a route added to the router is
 * submitted to search engines without anyone remembering to edit XML.
 *
 * @param lastModified ISO date (YYYY-MM-DD) reported for every URL.
 */
export const buildSitemap = (lastModified: string): string => {
    const urls = indexableRoutes()
        .map((route) => {
            const parts = [
                `        <loc>${escapeXml(absoluteUrl(route.path))}</loc>`,
                `        <lastmod>${lastModified}</lastmod>`,
            ];

            if (route.changeFrequency) {
                parts.push(
                    `        <changefreq>${route.changeFrequency}</changefreq>`,
                );
            }
            if (route.priority !== undefined) {
                parts.push(
                    `        <priority>${route.priority.toFixed(1)}</priority>`,
                );
            }

            return `    <url>\n${parts.join("\n")}\n    </url>`;
        })
        .join("\n");

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        urls,
        "</urlset>",
        "",
    ].join("\n");
};

/**
 * Builds robots.txt. Everything indexable is crawlable; the account and auth
 * screens are kept out of the crawl since they are login-gated and carry the
 * same noindex directive at runtime.
 */
export const buildRobotsTxt = (): string => {
    const disallowed = ROUTE_SEO.filter((route) => !route.indexable).map(
        (route) => `Disallow: ${route.path}`,
    );

    return [
        "# https://www.robotstxt.org/robotstxt.html",
        "User-agent: *",
        "Allow: /",
        ...disallowed,
        "",
        `Sitemap: ${SITE_URL}/sitemap.xml`,
        "",
    ].join("\n");
};
