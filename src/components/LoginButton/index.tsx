import { LoginButtonProps } from "./types";
import { LoginButtonView } from "./view";

type ComponentType = React.FC<LoginButtonProps>;
export const LoginButton: ComponentType = () => {
  const handleClick = () => {
    console.log("hlelo");
    alert("ouch you clicked me!");
  };
  return <LoginButtonView handleClick={handleClick} />;
};
