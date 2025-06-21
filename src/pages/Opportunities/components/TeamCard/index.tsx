import { TeamCardProps } from "./types";
import { TeamCardView } from "./view";

type ComponentType = React.FC<TeamCardProps>;
export const TeamCard: ComponentType = (props) => {
  return <TeamCardView team={props.team} />;
};
