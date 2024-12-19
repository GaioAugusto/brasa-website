import { JoinProps } from "./types";
import { JoinView } from "./view";

type ComponentType = React.FC<JoinProps>;
export const Join: ComponentType = () => {
  return <JoinView />;
};
