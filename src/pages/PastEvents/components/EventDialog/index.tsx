import { EventDialogProps } from "./types";
import { EventDialogView } from "./view";

type ComponentType = React.FC<EventDialogProps>;
export const EventDialog: ComponentType = (props) => {
  return <EventDialogView event={props.event} onClose={props.onClose} />;
};
