import { AboutProps } from "./types";
import { AboutView } from "./view";

type ComponentType = React.FC<AboutProps>;
export const About: ComponentType = () => {
  return <AboutView />;
};
