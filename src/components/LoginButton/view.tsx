import { LoginButtonViewProps } from "./types";
import Button from "@mui/material/Button";

type ComponentType = React.FC<LoginButtonViewProps>;
export const LoginButtonView: ComponentType = ({ handleClick, ...props }) => {
  return (
    <Button
      onClick={() => handleClick()}
      variant="outlined"
      sx={{
        fontWeight: "bold",
        color: "green",
        borderColor: "green",
        "&:hover": {
          backgroundColor: "#e8f5e9",
          borderColor: "#1b5e20",
        },
      }}
    >
      Login
    </Button>
  );
};
