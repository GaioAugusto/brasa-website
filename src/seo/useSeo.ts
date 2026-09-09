import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { applySeo } from "./applySeo";
import { breadcrumbTrail, getRouteSeo } from "./routes";
import {
    absoluteUrl,
    DEFAULT_DESCRIPTION,
    DEFAULT_OG_IMAGE,
    SITE_NAME,
    SITE_TITLE,
} from "./siteConfig";
import { applyStructuredData, breadcrumbJsonLd } from "./structuredData";

/** Appends the site name so every tab and search result is attributable. */
export const formatTitle = (title: string): string =>
    title.includes(SITE_TITLE) ? title : `${title} | ${SITE_TITLE}`;

/**
 * Keeps <head> in sync with the active route: title, description, canonical
 * URL, Open Graph and Twitter tags, robots directives, and BreadcrumbList
 * structured data.
 *
 * Mounted once near the router rather than per page, so a new route only needs
 * an entry in ROUTE_SEO to be described correctly.
 */
export const useSeo = (): void => {
    const { pathname } = useLocation();

    useEffect(() => {
        const route = getRouteSeo(pathname);

        // An unrecognised path is a 404. The static host answers every URL
        // with 200 and the SPA shell, so noindex is what stops Google from
        // treating those as thin duplicate pages.
        applySeo({
            title: formatTitle(route?.title ?? "Page Not Found"),
            description: route?.description ?? DEFAULT_DESCRIPTION,
            canonical: absoluteUrl(pathname),
            image: DEFAULT_OG_IMAGE,
            indexable: route?.indexable ?? false,
            siteName: SITE_NAME,
        });

        applyStructuredData(breadcrumbJsonLd(breadcrumbTrail(pathname)));
    }, [pathname]);
};
