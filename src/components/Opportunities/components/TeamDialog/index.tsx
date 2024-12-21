import { TeamDialogProps } from "./types";
import { TeamDialogView } from "./view";

type ComponentType = React.FC<TeamDialogProps>;
export const TeamDialog: ComponentType = ({ team, onClose }) => {
  return <TeamDialogView team={team} onClose={onClose} />;
};
