import { useLocale } from "../../contexts/Locale";
import { PastEventsProps } from "./types";
import { PastEventsView } from "./view";
import picnic1 from "../../assets/images/picnicPoster.jpeg";
import picnic2 from "../../assets/images/execs.jpeg";

type ComponentType = React.FC<PastEventsProps>;
export const PastEvents: ComponentType = () => {
  const { commonLocale, templatesLocale } = useLocale();
  const pastEvents = [
    {
      name: commonLocale.get("picnic"),
      image: picnic1,
      dialog: true,
      image2: picnic2,
      description: templatesLocale.get("picnicDescription"),
    },
  ];
  return <PastEventsView events={pastEvents} />;
};
