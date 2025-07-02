import { useLocation } from "react-router-dom";
import { BrasaCardProps } from "./types";
import { BrasaCardView } from "./view";

type LocationState = { email?: string };
type ComponentType = React.FC<BrasaCardProps>;
export const BrasaCard: ComponentType = (props) => {
  const { state } = useLocation();
  const { email } = (state || {}) as LocationState;

  return <BrasaCardView />;
};
