import { BusinessesPageProps } from "./types";
import { BusinessesPageView } from "./view";

type ComponentType = React.FC<BusinessesPageProps>;
export const BusinessesPage: ComponentType = () => {
    return <BusinessesPageView />;
};
