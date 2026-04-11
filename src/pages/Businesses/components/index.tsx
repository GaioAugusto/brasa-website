import React, { useEffect, useMemo, useRef, useState } from "react";
import * as S from "./styles";

interface InfiniteCarouselProps {
    readonly images: string[];
    readonly speed?: number;
}

type ComponentType = React.FC<InfiniteCarouselProps>;

export const InfiniteCarousel: ComponentType = ({ images, speed = 20 }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const [groupWidth, setGroupWidth] = useState(0);
    const [repeatCount, setRepeatCount] = useState(3);

    useEffect(() => {
        const updateMetrics = () => {
            const wrapperWidth = wrapperRef.current?.clientWidth ?? 0;
            const baseGroupWidth = groupRef.current?.scrollWidth ?? 0;

            if (baseGroupWidth === 0 || wrapperWidth === 0) {
                return;
            }

            setGroupWidth(baseGroupWidth);

            const minimumRepeats = Math.ceil(wrapperWidth / baseGroupWidth) + 2;
            setRepeatCount(Math.max(3, minimumRepeats));
        };

        updateMetrics();

        const resizeObserver = new ResizeObserver(updateMetrics);

        if (wrapperRef.current) {
            resizeObserver.observe(wrapperRef.current);
        }

        if (groupRef.current) {
            resizeObserver.observe(groupRef.current);
        }

        window.addEventListener("resize", updateMetrics);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updateMetrics);
        };
    }, [images]);

    const repeatedGroups = useMemo(
        () => Array.from({ length: repeatCount }, (_, index) => index),
        [repeatCount],
    );

    return (
        <S.CarouselWrapper ref={wrapperRef}>
            <S.CarouselTrack
                $speed={speed}
                $distance={groupWidth || 1}
                aria-label="Partners carousel"
            >
                {repeatedGroups.map((groupIndex) => (
                    <S.CarouselGroup
                        key={`group-${groupIndex}`}
                        ref={groupIndex === 0 ? groupRef : undefined}
                        aria-hidden={groupIndex > 0}
                    >
                        {images.map((src, index) => (
                            <S.ImageContainer
                                key={`${src}-${groupIndex}-${index}`}
                            >
                                <S.Image
                                    src={src}
                                    alt={`partner-logo-${index + 1}`}
                                />
                            </S.ImageContainer>
                        ))}
                    </S.CarouselGroup>
                ))}
            </S.CarouselTrack>
        </S.CarouselWrapper>
    );
};
