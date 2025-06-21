import { useLocation } from "react-router-dom";
import { AccountProps } from "./types";
import { AccountView } from "./view";

type LocationState = { email?: string };
type ComponentType = React.FC<AccountProps>;
export const Account: ComponentType = (props) => {
  const { state } = useLocation();
  const { email } = (state || {}) as LocationState;

  return (
    <AccountView
      email={props.email}
      firstName={props.firstName}
      lastName={props.lastName}
    />
  );
};
