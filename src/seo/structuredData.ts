import { RouteSeo } from "./routes";
import { absoluteUrl, SITE_NAME } from "./siteConfig";

/**
 * Builds the BreadcrumbList schema Google uses to render a breadcrumb trail in
 * search results instead of a bare URL.
 *
 * https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */
export const breadcrumbJsonLd = (trail: RouteSeo[]): object | undefined => {
    if (trail.length < 2) {
        // A single crumb is just the page itself — nothing to describe.
        return undefined;
    }

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((route, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: route.breadcrumb ?? SITE_NAME,
            item: absoluteUrl(route.path),
        })),
    };
};

const SCRIPT_ID = "seo-structured-data";

/**
 * Replaces the page-level JSON-LD block. Passing undefined removes it, so a
 * page without breadcrumbs does not inherit the previous route's markup.
 */
export const applyStructuredData = (data: object | undefined): void => {
    const existing = document.getElementById(SCRIPT_ID);

    if (!data) {
        existing?.remove();
        return;
    }

    const script =
        existing instanceof HTMLScriptElement
            ? existing
            : document.createElement("script");

    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);

    if (!script.isConnected) {
        document.head.appendChild(script);
    }
};
