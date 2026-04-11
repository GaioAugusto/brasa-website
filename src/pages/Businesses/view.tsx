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
    const highlights = [
        {
            title: templatesLocale.get("partnerHighlightCommunityTitle"),
            description: templatesLocale.get(
                "partnerHighlightCommunityDescription",
            ),
        },
        {
            title: templatesLocale.get("partnerHighlightBrandTitle"),
            description: templatesLocale.get(
                "partnerHighlightBrandDescription",
            ),
        },
        {
            title: templatesLocale.get("partnerHighlightExperiencesTitle"),
            description: templatesLocale.get(
                "partnerHighlightExperiencesDescription",
            ),
        },
    ];
    const impactMetrics = [
        {
            value: "180+",
            label: templatesLocale.get("impactHighlightTulumLabel"),
        },
        {
            value: "100+",
            label: templatesLocale.get("impactHighlightConcidLabel"),
        },
        {
            value: "12+",
            label: templatesLocale.get("impactHighlightPartnersLabel"),
        },
    ];

    return (
        <S.Container id="/businesses">
            <Header
                title={commonLocale.get("opportunities")}
                subtitle={templatesLocale.get("partnerUp")}
            />

            <S.ContentWrapper>
                <S.StorySection>
                    <S.StoryGrid>
                        <S.StoryBody>
                            <S.SectionTitle>
                                {templatesLocale.get("businessStoryTitle")}
                            </S.SectionTitle>
                            <S.Paragraph>
                                {templatesLocale.get("businessStoryParagraph1")}
                            </S.Paragraph>
                            <S.Paragraph>
                                {templatesLocale.get("businessStoryParagraph2")}
                            </S.Paragraph>
                            <S.Paragraph>
                                {templatesLocale.get("businessStoryParagraph3")}
                            </S.Paragraph>

                            <S.DownloadArea>
                                <S.DownloadButton type="button">
                                    {templatesLocale.get(
                                        "partnershipPackageCta",
                                    )}
                                </S.DownloadButton>
                                <S.DownloadHint>
                                    {templatesLocale.get(
                                        "partnershipPackageHint",
                                    )}
                                </S.DownloadHint>
                            </S.DownloadArea>
                        </S.StoryBody>

                        <S.ImpactPanel>
                            <S.ImpactTitle>
                                {templatesLocale.get("impactHighlightsTitle")}
                            </S.ImpactTitle>
                            <S.MetricsList>
                                {impactMetrics.map((metric) => (
                                    <S.MetricCard key={metric.label}>
                                        <S.MetricValue>
                                            {metric.value}
                                        </S.MetricValue>
                                        <S.MetricLabel>
                                            {metric.label}
                                        </S.MetricLabel>
                                    </S.MetricCard>
                                ))}
                            </S.MetricsList>
                        </S.ImpactPanel>
                    </S.StoryGrid>
                </S.StorySection>

                <S.PartnersSection>
                    <S.SectionTitle>
                        {templatesLocale.get("ourPartnersTitle")}
                    </S.SectionTitle>
                    <InfiniteCarousel images={images} speed={20} />
                </S.PartnersSection>

                <S.HighlightsSection>
                    <S.SectionTitle>
                        {templatesLocale.get("whyPartnerTitle")}
                    </S.SectionTitle>
                    <S.HighlightsGrid>
                        {highlights.map((highlight) => (
                            <S.HighlightCard key={highlight.title}>
                                <S.HighlightTitle>
                                    {highlight.title}
                                </S.HighlightTitle>
                                <S.HighlightDescription>
                                    {highlight.description}
                                </S.HighlightDescription>
                            </S.HighlightCard>
                        ))}
                    </S.HighlightsGrid>
                </S.HighlightsSection>
            </S.ContentWrapper>
        </S.Container>
    );
};
