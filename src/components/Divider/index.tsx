import { DividerProps } from "./types";
import { DividerView } from "./view";

type ComponentType = React.FC<DividerProps>;
export const Divider: ComponentType = () => {
  return <DividerView />;
};
