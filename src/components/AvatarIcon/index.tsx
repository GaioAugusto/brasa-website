import { AvatarIconProps } from "./types";
import { AvatarIconView } from "./view";

type ComponentType = React.FC<AvatarIconProps>;
export const AvatarIcon: ComponentType = (props) => {
  return <AvatarIconView title={props.title} />;
};
