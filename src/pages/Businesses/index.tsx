import { BusinessesPageProps } from "./types";
import { BusinessesPageView } from "./view";

type ComponentType = React.FC<BusinessesPageProps>;
export const BusinessesPage: ComponentType = () => {
    const handleDownload = () => {
        const packageUrl = `${import.meta.env.BASE_URL}opportunities/businesses/partnership_package.pdf`;

        const link = document.createElement("a");
        link.href = packageUrl;
        link.download = "partnership_package.pdf";
        link.rel = "noopener";

        link.click();
    };
    return <BusinessesPageView handleDownload={handleDownload} />;
};
