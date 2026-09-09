export interface SeoMeta {
    title: string;
    description: string;
    /** Absolute canonical URL for the page. */
    canonical: string;
    /** Absolute URL of the social preview image. */
    image: string;
    /** When false the page is served with a noindex robots directive. */
    indexable: boolean;
    siteName: string;
}

/**
 * Marks the tags this module owns so repeated calls update the same elements
 * instead of appending duplicates on every route change.
 */
const MANAGED = "data-seo-managed";

const upsertMeta = (
    selectorAttribute: "name" | "property",
    key: string,
    content: string,
): void => {
    const selector = `meta[${selectorAttribute}="${key}"]`;
    let tag = document.head.querySelector<HTMLMetaElement>(selector);

    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(selectorAttribute, key);
        tag.setAttribute(MANAGED, "");
        document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
};

const removeMeta = (
    selectorAttribute: "name" | "property",
    key: string,
): void => {
    document.head
        .querySelector(`meta[${selectorAttribute}="${key}"]`)
        ?.remove();
};

const upsertLink = (rel: string, href: string): void => {
    let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

    if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        tag.setAttribute(MANAGED, "");
        document.head.appendChild(tag);
    }

    tag.setAttribute("href", href);
};

/**
 * Writes a page's metadata into <head>.
 *
 * Note that this runs on the client, after React mounts. Googlebot renders
 * JavaScript and will see these tags, but crawlers that do not execute JS —
 * notably the Facebook, LinkedIn, WhatsApp and Slack link previewers — only
 * ever see the static tags in index.html. Getting correct per-page previews on
 * those platforms requires prerendering the routes at build time.
 */
export const applySeo = ({
    title,
    description,
    canonical,
    image,
    indexable,
    siteName,
}: SeoMeta): void => {
    document.title = title;

    upsertMeta("name", "description", description);
    upsertLink("canonical", canonical);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", siteName);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    if (indexable) {
        // Leaving the tag off entirely is the same as index,follow, and avoids
        // a stale noindex surviving a client-side navigation.
        removeMeta("name", "robots");
    } else {
        upsertMeta("name", "robots", "noindex, nofollow");
    }
};
