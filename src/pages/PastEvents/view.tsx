import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

import { PastEventsViewProps } from "./types";

type ComponentType = React.FC<PastEventsViewProps>;

export const PastEventsView: ComponentType = ({ events, heroImage }) => {
  const galleryImages = useMemo(
    () =>
      events.flatMap((event) =>
        event.images.map((image) => ({
          ...image,
          eventTitle: event.title,
        })),
      ),
    [events],
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const activeImage =
    activeImageIndex === null ? null : galleryImages[activeImageIndex];

  const openImage = (src: string) => {
    const imageIndex = galleryImages.findIndex((image) => image.src === src);

    if (imageIndex !== -1) {
      setActiveImageIndex(imageIndex);
    }
  };

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) {
        return null;
      }

      return (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    });
  };

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) {
        return null;
      }

      return (currentIndex + 1) % galleryImages.length;
    });
  };

  useEffect(() => {
    if (activeImageIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImageIndex(null);
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, galleryImages.length]);

  return (
    <div className="bg-[#f7f5f0] text-stone-900">
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-stone-950 text-white md:min-h-[76vh]">
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/80 sm:text-sm">
            BRASA at UofT
          </p>
          <h1 className="mt-5 text-5xl font-semibold uppercase tracking-[0.08em] sm:text-6xl md:text-7xl">
            Past Events
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            A look back at the conversations, celebrations, and community
            moments that brought us together.
          </p>
          <a
            href="#event-galleries"
            className="mt-9 inline-flex border border-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-stone-950"
          >
            View Gallery
          </a>
        </div>
      </section>

      <main id="event-galleries">
        {events.map((event, eventIndex) => (
          <section
            id={event.id}
            key={event.id}
            className={`scroll-mt-24 px-4 py-16 sm:px-6 md:py-24 ${
              eventIndex !== events.length - 1
                ? "border-b border-stone-300/70"
                : ""
            }`}
          >
            <div className="mx-auto max-w-[1500px]">
              <div className="mb-10 max-w-3xl md:mb-14">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-green-800">
                  Past Event
                </p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                  {event.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
                  {event.description}
                </p>
              </div>

              <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 xl:columns-4">
                {event.images.map((image) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => openImage(image.src)}
                    aria-label={`Open ${image.alt}`}
                    className="group mb-3 block w-full break-inside-avoid overflow-hidden bg-stone-200 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-green-700/50"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="h-auto w-full transition duration-500 ease-out group-hover:scale-[1.025] group-hover:brightness-90"
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeImage.eventTitle} photo viewer`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-950/95 px-4 py-16"
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            type="button"
            aria-label="Close photo viewer"
            onClick={() => setActiveImageIndex(null)}
            className="absolute right-5 top-5 rounded-full p-3 text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <FaTimes className="h-6 w-6" />
          </button>

          <button
            type="button"
            aria-label="View previous photo"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-3 text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-5"
          >
            <FaChevronLeft className="h-6 w-6" />
          </button>

          <figure
            className="flex max-h-full max-w-[calc(100vw-7rem)] flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[78vh] max-w-full object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/65">
                {activeImage.eventTitle}
              </p>
              <p className="mt-1 text-sm text-white/85">{activeImage.alt}</p>
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="View next photo"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-3 text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5"
          >
            <FaChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};
