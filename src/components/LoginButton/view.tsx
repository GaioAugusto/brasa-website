import { LoginButtonViewProps } from "./types";
import Button from "@mui/material/Button";
import { alpha, darken } from "@mui/material/styles";

type ComponentType = React.FC<LoginButtonViewProps>;
export const LoginButtonView: ComponentType = ({ handleClick, mode }) => {
  const baseColor = mode === "dark" ? "#fff" : "#2e7d32";
  const hoverBg =
    mode === "dark" ? alpha("#ffffff", 0.08) : alpha("#a5d6a7", 0.4);
  const hoverBorder = mode === "dark" ? "#ccc" : darken("#2e7d32", 0.2);

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      sx={{
        fontWeight: 600,
        textTransform: "none",
        color: baseColor,
        borderColor: baseColor,
        "&:hover": {
          backgroundColor: hoverBg,
          borderColor: hoverBorder,
        },
      }}
    >
      Login
    </Button>
  );
};
