import styled, { keyframes } from "styled-components";

const scroll = keyframes`
  from {
  transform: translate3d(0, 0, 0);
  }

  to {
  transform: translate3d(calc(-1 * var(--scroll-distance)), 0, 0);
  }
`;

export const CarouselWrapper = styled.div`
    position: relative;
    width: min(75%, 72rem);
    margin: 0 auto;
    overflow: hidden;
    background: linear-gradient(135deg, #e7f3ec 0%, #f1f7f4 100%);
    box-shadow: 0 16px 30px rgba(18, 64, 41, 0.08);
    padding: 1.25rem 0;

    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        width: clamp(2rem, 8vw, 5.5rem);
        z-index: 2;
        pointer-events: none;
    }

    &::before {
        left: 0;
        background: linear-gradient(
            to right,
            rgba(231, 243, 236, 1) 0%,
            rgba(231, 243, 236, 0) 100%
        );
    }

    &::after {
        right: 0;
        background: linear-gradient(
            to left,
            rgba(231, 243, 236, 1) 0%,
            rgba(231, 243, 236, 0) 100%
        );
    }

    @media (max-width: 768px) {
        width: calc(100% - 2rem);
    }
`;

export const CarouselTrack = styled.div<{ $speed: number; $distance: number }>`
    --scroll-distance: ${({ $distance }) => `${$distance}px`};

    display: flex;
    width: fit-content;
    will-change: transform;
    animation: ${scroll} ${({ $speed }) => $speed}s linear infinite;

    &:hover {
        animation-play-state: paused;
    }
`;

export const CarouselGroup = styled.div`
    display: flex;
    align-items: center;
`;

export const ImageContainer = styled.div`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(9rem, 18vw, 12rem);
    height: clamp(5.25rem, 10vw, 6.5rem);
    margin: 0 0.7rem;
    padding: 0.75rem;
    border-radius: 0.9rem;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(63, 119, 86, 0.2);
    box-shadow: 0 10px 24px rgba(18, 64, 41, 0.08);
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 30px rgba(18, 64, 41, 0.14);
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    filter: saturate(0.92) contrast(1.02);
`;
