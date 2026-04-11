import styled from "styled-components";

export const Container = styled.section`
    background: #f3f4f6;
    padding-bottom: 4rem;
`;

export const ContentWrapper = styled.div`
    width: min(100%, 1100px);
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const SectionCard = styled.section`
    padding: clamp(1.25rem, 3vw, 2rem);
`;

export const StorySection = styled(SectionCard)``;

export const PartnersSection = styled(SectionCard)``;

export const HighlightsSection = styled(SectionCard)``;

export const SectionTitle = styled.h2`
    color: #14532d;
    font-size: clamp(1.35rem, 2.2vw, 1.75rem);
    font-weight: 700;
    margin: 0 0 1rem;
`;

export const Paragraph = styled.p`
    color: #1f2937;
    line-height: 1.7;
    font-size: 1rem;
    margin: 0;

    & + & {
        margin-top: 1rem;
    }
`;

export const DownloadArea = styled.div`
    margin-top: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
`;

export const DownloadButton = styled.button`
    border: 1px solid #166534;
    border-radius: 0.5rem;
    background: #166534;
    color: #f0fdf4;
    padding: 0.72rem 1.1rem;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition:
        transform 0.2s ease,
        background 0.2s ease;

    &:hover {
        transform: translateY(-1px);
        background: #14532d;
    }
`;

export const DownloadHint = styled.span`
    color: #4b5563;
    font-size: 0.9rem;
`;

export const HighlightsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const HighlightCard = styled.article`
    border-radius: 0.6rem;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    padding: 1.1rem 1rem;
`;

export const HighlightTitle = styled.h3`
    margin: 0;
    color: #14532d;
    font-size: 1.06rem;
`;

export const HighlightDescription = styled.p`
    margin: 0.6rem 0 0;
    color: #374151;
    line-height: 1.6;
    font-size: 0.95rem;
`;

export const StoryGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.85fr);
    gap: 1.4rem;

    @media (max-width: 980px) {
        grid-template-columns: 1fr;
    }
`;

export const StoryBody = styled.div`
    min-width: 0;
`;

export const ImpactPanel = styled.aside`
    background: #f3f4f6;
    border-left: 4px solid #14532d;
    border-radius: 0.35rem;
    padding: 0.95rem 1rem;
    height: fit-content;
`;

export const ImpactTitle = styled.h3`
    margin: 0;
    color: #14532d;
    font-size: 1.05rem;
    font-weight: 700;
`;

export const MetricsList = styled.div`
    display: grid;
    gap: 0.8rem;
    margin-top: 0.8rem;
`;

export const MetricCard = styled.article`
    padding: 0.85rem 0.75rem;
    border-radius: 0.55rem;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
`;

export const MetricValue = styled.p`
    margin: 0;
    color: #14532d;
    font-size: clamp(1.7rem, 4vw, 2.35rem);
    line-height: 1;
    font-weight: 800;
    letter-spacing: -0.02em;
`;

export const MetricLabel = styled.p`
    margin: 0.45rem 0 0;
    color: #374151;
    line-height: 1.45;
    font-size: 0.92rem;
`;
