/**
 * Canonical identity of the site, used for canonical URLs, Open Graph tags,
 * the sitemap and robots.txt.
 *
 * SITE_URL must be the single hostname we want indexed, with no trailing
 * slash. Both brasauoft.com and www.brasauoft.com currently serve the site,
 * which splits ranking signals between two hostnames; the canonical tags and
 * sitemap emitted from here all point at the apex so crawlers consolidate on
 * one. The redirect itself has to be configured in CloudFront.
 */
export const SITE_URL = "https://brasauoft.com";

export const SITE_NAME = "BRASA at UofT";

/** Used as the <title> on the home page and as the suffix elsewhere. */
export const SITE_TITLE = "BRASA at UofT";

export const DEFAULT_DESCRIPTION =
    "BRASA at UofT is the largest Brazilian student association in Canada, connecting Brazilian students at the University of Toronto through events, workshops and a supportive community.";

/** Absolute URL of the image social platforms show when a page is shared. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/homePage/picnic1.jpeg`;

export const ORGANIZATION_LOGO = `${SITE_URL}/logos/GoodLogo.png`;

export const INSTAGRAM_URL = "https://www.instagram.com/brasauoft/";

/** Joins a route path onto SITE_URL, producing an absolute, canonical URL. */
export const absoluteUrl = (path: string): string => {
    if (path === "/") {
        return `${SITE_URL}/`;
    }
    return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
