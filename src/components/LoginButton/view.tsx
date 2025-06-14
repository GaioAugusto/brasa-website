import { LoginButtonViewProps } from "./types";
import Button from "@mui/material/Button";

type ComponentType = React.FC<LoginButtonViewProps>;
export const LoginButtonView: ComponentType = ({ handleClick, ...props }) => {
  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      sx={{
        fontWeight: 600,
        textTransform: "none",
        color: props.colors.baseColor,
        borderColor: props.colors.baseColor,
        "&:hover": {
          backgroundColor: props.colors.hoverBg,
          borderColor: props.colors.hoverBorder,
        },
      }}
    >
      Login
    </Button>
  );
};
