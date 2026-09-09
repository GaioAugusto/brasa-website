import { DEFAULT_DESCRIPTION } from "./siteConfig";

export interface RouteSeo {
    /** Router path, also the canonical URL path. */
    path: string;
    /** Page <title>, without the site-name suffix. */
    title: string;
    /** Meta description. Aim for 120-160 characters. */
    description: string;
    /**
     * Label used in the breadcrumb trail and its BreadcrumbList markup.
     * Omitted on the home page, which is always the implicit first crumb.
     */
    breadcrumb?: string;
    /** Parent route path, for nested pages. */
    parent?: string;
    /**
     * Whether the page belongs in the sitemap and may be indexed. Account and
     * auth screens are behind a login and have nothing to rank for, so they
     * are excluded and served with noindex.
     */
    indexable: boolean;
    /** Relative importance for crawlers, 0.0-1.0. */
    priority?: number;
    changeFrequency?: "daily" | "weekly" | "monthly" | "yearly";
}

/**
 * Single source of truth for per-route SEO. The app reads it to set page
 * metadata and breadcrumbs; the build reads it to emit sitemap.xml, so the
 * sitemap cannot drift out of sync with the router.
 */
export const ROUTE_SEO: RouteSeo[] = [
    {
        path: "/",
        title: "BRASA at UofT | Brazilian Student Association",
        description: DEFAULT_DESCRIPTION,
        indexable: true,
        priority: 1.0,
        changeFrequency: "weekly",
    },
    {
        path: "/board",
        title: "Meet the Board",
        description:
            "Meet the students leading BRASA at UofT — the executive board behind our events, partnerships and community initiatives at the University of Toronto.",
        breadcrumb: "Board",
        indexable: true,
        priority: 0.8,
        changeFrequency: "yearly",
    },
    {
        path: "/events",
        title: "Past Events",
        description:
            "Look back at BRASA at UofT events — the High Park welcome picnic, Brazilian dance workshops, study sessions, hockey outings and more.",
        breadcrumb: "Events",
        indexable: true,
        priority: 0.8,
        changeFrequency: "monthly",
    },
    {
        path: "/opportunities",
        title: "Opportunities",
        description:
            "Get involved with BRASA at UofT: join our soccer and volleyball teams, take part in workshops and events, and find ways to contribute to the community.",
        breadcrumb: "Opportunities",
        indexable: true,
        priority: 0.8,
        changeFrequency: "monthly",
    },
    {
        path: "/opportunities/businesses",
        title: "Partner with BRASA",
        description:
            "Partner with BRASA at UofT to reach an engaged community of Brazilian and Latin American students through events, workshops and brand collaborations.",
        breadcrumb: "For Businesses",
        parent: "/opportunities",
        indexable: true,
        priority: 0.7,
        changeFrequency: "yearly",
    },
    {
        path: "/contact",
        title: "Contact Us",
        description:
            "Get in touch with BRASA at UofT. Send us a message and we will get back to you within 48 hours.",
        breadcrumb: "Contact",
        indexable: true,
        priority: 0.6,
        changeFrequency: "yearly",
    },
    {
        path: "/login",
        title: "Log In",
        description: "Log in to your BRASA at UofT account.",
        breadcrumb: "Log In",
        indexable: false,
    },
    {
        path: "/register",
        title: "Create an Account",
        description: "Create a BRASA at UofT account with your UofT email.",
        breadcrumb: "Register",
        indexable: false,
    },
    {
        path: "/account",
        title: "My Account",
        description: "Manage your BRASA at UofT account and BRASA Card.",
        breadcrumb: "Account",
        indexable: false,
    },
];

const BY_PATH = new Map(ROUTE_SEO.map((route) => [route.path, route]));

export const getRouteSeo = (path: string): RouteSeo | undefined =>
    BY_PATH.get(path);

/** Routes that belong in the sitemap, most important first. */
export const indexableRoutes = (): RouteSeo[] =>
    ROUTE_SEO.filter((route) => route.indexable);

/**
 * The breadcrumb trail for a path, from home down to the page itself.
 * Returns an empty array for the home page, which needs no trail.
 */
export const breadcrumbTrail = (path: string): RouteSeo[] => {
    const route = getRouteSeo(path);
    if (!route || route.path === "/") {
        return [];
    }

    const trail: RouteSeo[] = [];
    let current: RouteSeo | undefined = route;
    // Walk up through parents; the guard stops a malformed parent chain from
    // looping forever.
    while (current && trail.length < ROUTE_SEO.length) {
        trail.unshift(current);
        current = current.parent ? getRouteSeo(current.parent) : undefined;
    }

    const home = getRouteSeo("/");
    return home ? [home, ...trail] : trail;
};
