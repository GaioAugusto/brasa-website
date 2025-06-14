import { LoginButtonProps } from "./types";
import { LoginButtonView } from "./view";

type ComponentType = React.FC<LoginButtonProps>;
export const LoginButton: ComponentType = (props) => {
  const handleClick = () => {
    alert("ouch you clicked me!");
  };
  return <LoginButtonView mode={props.mode} handleClick={handleClick} />;
};
