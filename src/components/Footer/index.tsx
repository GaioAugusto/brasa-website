import { FooterProps } from "./types";
import { FooterView } from "./view";

type ComponentType = React.FC<FooterProps>;
export const Footer: ComponentType = () => {
  return <FooterView />;
};
