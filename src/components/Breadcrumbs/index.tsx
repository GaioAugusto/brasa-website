import { useLocation } from "react-router-dom";
import { breadcrumbTrail } from "../../seo/routes";
import { SITE_NAME } from "../../seo/siteConfig";
import { BreadcrumbsProps } from "./types";
import { BreadcrumbsView } from "./view";

type ComponentType = React.FC<BreadcrumbsProps>;

/**
 * Visible breadcrumb trail for the active route. The matching BreadcrumbList
 * structured data is emitted by useSeo, so the two always describe the same
 * trail — Google requires the markup to reflect what users actually see.
 */
export const Breadcrumbs: ComponentType = () => {
    const { pathname } = useLocation();
    const trail = breadcrumbTrail(pathname);

    // Home, and any unrecognised path, get no trail.
    if (trail.length < 2) {
        return null;
    }

    return (
        <BreadcrumbsView
            crumbs={trail.map((route) => ({
                label: route.breadcrumb ?? SITE_NAME,
                path: route.path,
            }))}
        />
    );
};
