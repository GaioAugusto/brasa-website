import { HeaderProps } from "./types";
import { HeaderView } from "./view";

type ComponentType = React.FC<HeaderProps>;
export const Header: ComponentType = (props) => {
  return <HeaderView title={props.title} subtitle={props.subtitle} />;
};
