import { NotFoundProps } from "./types";
import { NotFoundView } from "./view";

type ComponentType = React.FC<NotFoundProps>;

/**
 * Catch-all for unrecognised paths. The static host answers every URL with 200
 * and the SPA shell, so without this route an unknown URL rendered an empty
 * page that Google would treat as a thin duplicate. useSeo marks any path
 * missing from ROUTE_SEO as noindex.
 */
export const NotFound: ComponentType = () => <NotFoundView />;
