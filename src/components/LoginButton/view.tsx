import { LoginButtonViewProps } from "./types";
import Button from "@mui/material/Button";
import { useLocale } from "../../contexts/Locale";

type ComponentType = React.FC<LoginButtonViewProps>;
export const LoginButtonView: ComponentType = ({ handleClick, ...props }) => {
  const { commonLocale } = useLocale();
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
      {commonLocale.get("login")}
    </Button>
  );
};
