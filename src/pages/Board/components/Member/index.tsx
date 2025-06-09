import { MemberProps } from "./types";
import { MemberView } from "./view";

type ComponentType = React.FC<MemberProps>;
export const Member: ComponentType = (props) => {
  return <MemberView boardMember={props.boardMember} />;
};
