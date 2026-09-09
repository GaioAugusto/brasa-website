import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it } from "vitest";
import { applySeo } from "./applySeo";
import { buildRobotsTxt, buildSitemap } from "./buildSitemap";
import { breadcrumbTrail, indexableRoutes, ROUTE_SEO } from "./routes";
import { absoluteUrl, SITE_URL } from "./siteConfig";
import { breadcrumbJsonLd } from "./structuredData";

describe("route table", () => {
    it("describes every route the router renders", () => {
        const app = readFileSync("src/App.tsx", "utf-8");
        const routerPaths = [...app.matchAll(/path="([^"]+)"/g)]
            .map((match) => match[1])
            .filter((path) => path !== "*");

        const described = new Set(ROUTE_SEO.map((route) => route.path));
        const missing = routerPaths.filter((path) => !described.has(path));

        // A route without an entry falls back to noindex and a generic title,
        // so this guards against silently dropping a page out of the index.
        expect(missing).toEqual([]);
    });

    it("keeps login-gated pages out of the index", () => {
        const indexable = indexableRoutes().map((route) => route.path);

        expect(indexable).not.toContain("/login");
        expect(indexable).not.toContain("/register");
        expect(indexable).not.toContain("/account");
    });

    it("gives every indexable route a description of a sensible length", () => {
        indexableRoutes().forEach((route) => {
            expect(route.description.length).toBeGreaterThanOrEqual(50);
            expect(route.description.length).toBeLessThanOrEqual(200);
        });
    });
});

describe("buildSitemap", () => {
    const xml = buildSitemap("2026-09-09");

    it("lists every indexable route as an absolute URL", () => {
        indexableRoutes().forEach((route) => {
            expect(xml).toContain(`<loc>${absoluteUrl(route.path)}</loc>`);
        });
        expect(xml.match(/<url>/g)).toHaveLength(indexableRoutes().length);
    });

    it("omits pages that should not be indexed", () => {
        expect(xml).not.toContain(`${SITE_URL}/login`);
        expect(xml).not.toContain(`${SITE_URL}/register`);
        expect(xml).not.toContain(`${SITE_URL}/account`);
    });

    it("is well-formed XML with the sitemap namespace", () => {
        expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(
            true,
        );
        expect(xml).toContain(
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        );

        const parsed = new DOMParser().parseFromString(xml, "application/xml");
        expect(parsed.querySelector("parsererror")).toBeNull();
    });
});

describe("buildRobotsTxt", () => {
    const robots = buildRobotsTxt();

    it("points crawlers at the sitemap", () => {
        expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
    });

    it("disallows the login-gated paths", () => {
        expect(robots).toContain("Disallow: /login");
        expect(robots).toContain("Disallow: /register");
        expect(robots).toContain("Disallow: /account");
    });

    it("leaves the public pages crawlable", () => {
        expect(robots).toContain("Allow: /");
        expect(robots).not.toContain("Disallow: /board");
        expect(robots).not.toContain("Disallow: /events");
    });
});

describe("breadcrumbTrail", () => {
    it("returns nothing for the home page", () => {
        expect(breadcrumbTrail("/")).toEqual([]);
    });

    it("walks up through parent routes", () => {
        const trail = breadcrumbTrail("/opportunities/businesses");

        expect(trail.map((route) => route.path)).toEqual([
            "/",
            "/opportunities",
            "/opportunities/businesses",
        ]);
    });

    it("returns home plus the page for a top-level route", () => {
        expect(breadcrumbTrail("/board").map((route) => route.path)).toEqual([
            "/",
            "/board",
        ]);
    });

    it("returns nothing for an unknown path", () => {
        expect(breadcrumbTrail("/nope")).toEqual([]);
    });
});

describe("breadcrumbJsonLd", () => {
    it("numbers positions from one and uses absolute URLs", () => {
        const data = breadcrumbJsonLd(
            breadcrumbTrail("/opportunities/businesses"),
        ) as {
            itemListElement: { position: number; name: string; item: string }[];
        };

        expect(data.itemListElement).toEqual([
            {
                "@type": "ListItem",
                position: 1,
                name: "BRASA at UofT",
                item: `${SITE_URL}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Opportunities",
                item: `${SITE_URL}/opportunities`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: "For Businesses",
                item: `${SITE_URL}/opportunities/businesses`,
            },
        ]);
    });

    it("is omitted when there is no trail to describe", () => {
        expect(breadcrumbJsonLd([])).toBeUndefined();
    });
});

describe("applySeo", () => {
    const meta = (selector: string): string | null =>
        document.head
            .querySelector<HTMLMetaElement>(selector)
            ?.getAttribute("content") ?? null;

    beforeEach(() => {
        document.head.innerHTML = "";
    });

    it("writes the page title, description and canonical URL", () => {
        applySeo({
            title: "Meet the Board | BRASA at UofT",
            description: "Meet the students leading BRASA at UofT.",
            canonical: `${SITE_URL}/board`,
            image: `${SITE_URL}/homePage/picnic1.jpeg`,
            indexable: true,
            siteName: "BRASA at UofT",
        });

        expect(document.title).toBe("Meet the Board | BRASA at UofT");
        expect(meta('meta[name="description"]')).toBe(
            "Meet the students leading BRASA at UofT.",
        );
        expect(
            document.head
                .querySelector('link[rel="canonical"]')
                ?.getAttribute("href"),
        ).toBe(`${SITE_URL}/board`);
        expect(meta('meta[property="og:url"]')).toBe(`${SITE_URL}/board`);
        expect(meta('meta[name="twitter:card"]')).toBe("summary_large_image");
    });

    it("updates tags in place instead of duplicating them on navigation", () => {
        const base = {
            image: `${SITE_URL}/homePage/picnic1.jpeg`,
            indexable: true,
            siteName: "BRASA at UofT",
        };

        applySeo({
            ...base,
            title: "First",
            description: "First page",
            canonical: `${SITE_URL}/board`,
        });
        applySeo({
            ...base,
            title: "Second",
            description: "Second page",
            canonical: `${SITE_URL}/events`,
        });

        expect(
            document.head.querySelectorAll('meta[name="description"]'),
        ).toHaveLength(1);
        expect(
            document.head.querySelectorAll('link[rel="canonical"]'),
        ).toHaveLength(1);
        expect(meta('meta[name="description"]')).toBe("Second page");
    });

    it("adds noindex for private pages and drops it again on public ones", () => {
        const base = {
            description: "…",
            canonical: `${SITE_URL}/account`,
            image: `${SITE_URL}/homePage/picnic1.jpeg`,
            siteName: "BRASA at UofT",
        };

        applySeo({ ...base, title: "My Account", indexable: false });
        expect(meta('meta[name="robots"]')).toBe("noindex, nofollow");

        applySeo({ ...base, title: "Board", indexable: true });
        expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
    });
});
