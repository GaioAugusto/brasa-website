import { Header } from "../../components/Header";
import { useLocale } from "../../contexts/Locale";
import { InfiniteCarousel } from "./components";
import * as S from "./styles";
import { BusinessesPageViewProps } from "./types";

const images = [
    "/partners/casaTropical.jpg",
    "/partners/concid.png",
    "/partners/oakberry.png",
    "/partners/pegasus.jpg",
    "/partners/superBowls.png",
    "/partners/tulum.png",
];

type ComponentType = React.FC<BusinessesPageViewProps>;

export const BusinessesPageView: ComponentType = () => {
    const { commonLocale, templatesLocale } = useLocale();

    return (
        <S.Container id="/businesses">
            <Header
                title={commonLocale.get("opportunities")}
                subtitle={templatesLocale.get("partnerUp")}
            />

            <InfiniteCarousel images={images} speed={20} />
        </S.Container>
    );
};
