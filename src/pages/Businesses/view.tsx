import { Header } from "../../components/Header";
import { useLocale } from "../../contexts/Locale";
import { BusinessesPageViewProps } from "./types";

type ComponentType = React.FC<BusinessesPageViewProps>;
export const BusinessesPageView: ComponentType = () => {
    const { commonLocale, templatesLocale } = useLocale();
    return (
        <section id="/businesses" className="bg-gray-100">
            <Header
                title={commonLocale.get("opportunities")}
                subtitle={templatesLocale.get("partnerUp")}
            />
        </section>
    );
};
