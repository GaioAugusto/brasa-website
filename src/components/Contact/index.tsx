import { ContactProps } from "./types";
import { ContactView } from "./view";

type ComponentType = React.FC<ContactProps>;
export const Contact: ComponentType = () => {
  return <ContactView />;
};
