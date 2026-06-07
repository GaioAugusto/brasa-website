import { PastEventsProps } from "./types";
import { PastEventsView } from "./view";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

type ComponentType = React.FC<PastEventsProps>;
export const PastEvents: ComponentType = () => {
  const { state } = useLocation() as { state: { scrollTo?: string } | null };

  const pastEvents = [
    {
      id: "trivia-night",
      title: "Trivia Night",
      description:
        "A lively evening of teams, quick answers, and friendly competition with the BRASA community.",
      images: [
        {
          src: "/pastEvents/trivia-night/trivia1.JPG",
          alt: "Trivia Night group gathered around a table",
        },
        {
          src: "/pastEvents/trivia-night/trivia2.jpg",
          alt: "Trivia Night attendees posing together",
        },
        {
          src: "/pastEvents/trivia-night/trivia3.jpg",
          alt: "Trivia Night team celebrating",
        },
        {
          src: "/pastEvents/trivia-night/trivia4.jpg",
          alt: "Trivia Night participants smiling",
        },
        {
          src: "/pastEvents/trivia-night/trivia5.jpeg",
          alt: "Trivia Night game table",
        },
        {
          src: "/pastEvents/trivia-night/trivia6.jpeg",
          alt: "Trivia Night attendees answering questions",
        },
        {
          src: "/pastEvents/trivia-night/trivia7.jpeg",
          alt: "Trivia Night friends posing for a photo",
        },
        {
          src: "/pastEvents/trivia-night/trivia8.jpeg",
          alt: "Trivia Night table activity",
        },
        {
          src: "/pastEvents/trivia-night/trivia9.jpeg",
          alt: "Trivia Night community moment",
        },
      ],
    },
    {
      id: "paths-of-success",
      title: "Paths of Success",
      description:
        "A career-focused gathering with conversations, stories, and guidance from Brazilian students and professionals.",
      images: [
        {
          src: "/pastEvents/paths-of-success/paths8.jpg",
          alt: "Paths of Success attendees seated for a presentation",
        },
        {
          src: "/pastEvents/paths-of-success/paths3.JPG",
          alt: "Paths of Success panel and audience",
        },
        {
          src: "/pastEvents/paths-of-success/paths1.jpg",
          alt: "Paths of Success speaker addressing attendees",
        },
        {
          src: "/pastEvents/paths-of-success/paths2.JPG",
          alt: "Paths of Success event setup",
        },
        {
          src: "/pastEvents/paths-of-success/paths4.jpg",
          alt: "Paths of Success guests networking",
        },
        {
          src: "/pastEvents/paths-of-success/paths5.jpg",
          alt: "Paths of Success conversation between attendees",
        },
        {
          src: "/pastEvents/paths-of-success/paths6.jpg",
          alt: "Paths of Success group photo",
        },
        {
          src: "/pastEvents/paths-of-success/paths7.jpg",
          alt: "Paths of Success closing moment",
        },
      ],
    },
    {
      id: "picnic",
      title: "Picnic",
      description:
        "A relaxed outdoor hangout with food, games, and friends from across the BRASA at UofT community.",
      images: [
        {
          src: "/pastEvents/picnic/picnic2.JPG",
          alt: "Picnic group sitting together outdoors",
        },
        {
          src: "/pastEvents/picnic/picnic1.JPG",
          alt: "Picnic attendees gathered in the park",
        },
        {
          src: "/pastEvents/picnic/picnic3.jpg",
          alt: "Picnic friends posing on the grass",
        },
        {
          src: "/pastEvents/picnic/picnic4.jpg",
          alt: "Picnic attendees enjoying snacks",
        },
        {
          src: "/pastEvents/picnic/picnic5.jpg",
          alt: "Picnic candid moment",
        },
        {
          src: "/pastEvents/picnic/picnic6.jpg",
          alt: "Picnic group smiling together",
        },
        {
          src: "/pastEvents/picnic/picnic7.jpg",
          alt: "Picnic friends posing for a photo",
        },
        {
          src: "/pastEvents/picnic/picnic8.jpg",
          alt: "Picnic community photo",
        },
      ],
    },
    {
      id: "other",
      title: "Other",
      description:
        "A collection of BRASA moments from socials, collaborations, and smaller community events throughout the year.",
      images: [
        {
          src: "/pastEvents/other/IMG_7645.JPG",
          alt: "BRASA community event group photo",
        },
        {
          src: "/pastEvents/other/IMG_6487.jpg",
          alt: "BRASA community event candid moment",
        },
        {
          src: "/pastEvents/other/IMG_9082.jpg",
          alt: "BRASA attendees at an event table",
        },
        {
          src: "/pastEvents/other/IMG_9086.jpg",
          alt: "BRASA event friends posing together",
        },
        {
          src: "/pastEvents/other/IMG_9091.jpg",
          alt: "BRASA community gathering",
        },
        {
          src: "/pastEvents/other/IMG_9879.jpg",
          alt: "BRASA event attendee smiling",
        },
      ],
    },
  ];

  const heroImage = {
    src: "/pastEvents/paths-of-success/paths8.jpg",
    alt: "BRASA at UofT event audience",
  };

  useEffect(() => {
    if (state?.scrollTo) {
      if (state.scrollTo === "top") {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Scroll to a specific section
        const section = document.getElementById(state.scrollTo);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [state]);

  return <PastEventsView events={pastEvents} heroImage={heroImage} />;
};
