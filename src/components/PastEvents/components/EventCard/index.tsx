import { EventCardProps } from "./types";
import { EventCardView } from "./view";

type ComponentType = React.FC<EventCardProps>;
export const EventCard: ComponentType = (props) => {
  return <EventCardView />;
};
