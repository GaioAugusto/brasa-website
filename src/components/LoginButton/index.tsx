import { alpha, darken } from "@mui/material";
import { LoginButtonColors, LoginButtonProps } from "./types";
import { LoginButtonView } from "./view";
import { useNavigate } from "react-router-dom";

type ComponentType = React.FC<LoginButtonProps>;
export const LoginButton: ComponentType = (props) => {
  const navigate = useNavigate();
  const baseColor = props.mode === "dark" ? "#fff" : "#2e7d32";
  const hoverBg =
    props.mode === "dark" ? alpha("#ffffff", 0.08) : alpha("#a5d6a7", 0.4);
  const hoverBorder = props.mode === "dark" ? "#ccc" : darken("#2e7d32", 0.2);

  const LoginButtonColors: LoginButtonColors = {
    baseColor: baseColor,
    hoverBg: hoverBg,
    hoverBorder: hoverBorder,
  };

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <LoginButtonView colors={LoginButtonColors} handleClick={handleClick} />
  );
};
