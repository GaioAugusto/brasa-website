import { BrasaCardProps } from "./types";
import { BrasaCardView } from "./view";

type ComponentType = React.FC<BrasaCardProps>;
export const BrasaCard: ComponentType = (props) => {
  return <BrasaCardView />;
};
