import { useLocale } from "../../contexts/Locale";
import { PastEventsProps } from "./types";
import { PastEventsView } from "./view";
import picnic1 from "../../assets/images/picnicPoster.jpeg";
import picnic2 from "../../assets/images/execs.jpeg";
import hockey1 from "../../assets/images/hockey1.jpeg";
import hockey2 from "../../assets/images/hockey2.jpeg";
import dance1 from "../../assets/images/dance1.jpeg";
import dance2 from "../../assets/images/dance2.jpeg";
import study1 from "../../assets/images/study1.jpeg";
import study2 from "../../assets/images/study2.jpeg";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

type ComponentType = React.FC<PastEventsProps>;
export const PastEvents: ComponentType = () => {
  const { commonLocale, templatesLocale } = useLocale();
  const { state } = useLocation() as { state: { scrollTo?: string } | null };

  const pastEvents = [
    {
      name: commonLocale.get("picnic"),
      image: picnic1,
      dialog: true,
      image2: picnic2,
      description: templatesLocale.get("picnicDescription"),
    },
    {
      name: commonLocale.get("hockey"),
      image: hockey1,
      dialog: true,
      image2: hockey2,
      description: templatesLocale.get("hockeyDescription"),
    },
    {
      name: commonLocale.get("danceClass"),
      image: dance1,
      dialog: true,
      image2: dance2,
      description: templatesLocale.get("danceClassDescription"),
    },
    {
      name: commonLocale.get("studyWithUs"),
      image: study1,
      dialog: true,
      image2: study2,
      description: templatesLocale.get("studyWithUsDescription"),
    },
  ];

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

  return <PastEventsView events={pastEvents} />;
};
