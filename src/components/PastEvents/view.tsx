import { useLocale } from "../../contexts/Locale";
import { Header } from "../Header";
import { EventCard } from "./components/EventCard";
import { PastEventsViewProps } from "./types";

type ComponentType = React.FC<PastEventsViewProps>;
export const PastEventsView: ComponentType = ({ events }) => {
  const { commonLocale } = useLocale();
  return (
    <div>
      <Header title={commonLocale.get("pastEvents")} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12 max-w-7xl mx-auto">
        {events.map((event) => (
          <EventCard event={event} />
        ))}
      </div>
    </div>
  );
};
