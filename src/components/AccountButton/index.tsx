import { alpha, Avatar, Button, darken } from "@mui/material";
import { AccountButtonProps } from "./types";
import { useNavigate } from "react-router-dom";
import { LoginButtonColors } from "../LoginButton/types";

type ComponentType = React.FC<AccountButtonProps>;
export const AccountButton: ComponentType = ({ ...props }) => {
  const navigate = useNavigate();
  const baseColor = props.mode === "dark" ? "#fff" : "#2e7d32";
  const hoverBg =
    props.mode === "dark" ? alpha("#ffffff", 0.08) : alpha("#a5d6a7", 0.4);
  const hoverBorder = props.mode === "dark" ? "#ccc" : darken("#2e7d32", 0.2);

  return (
    <Button
      variant="outlined"
      onClick={() => navigate("/account")}
      endIcon={<Avatar sx={{ width: 32, height: 32 }} />}
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2.5, // horizontal padding
        py: 1, // vertical padding
        borderRadius: 2,
        gap: 1, // space between label and avatar
        fontWeight: 600,
        textTransform: "none",
        color: baseColor,
        borderColor: baseColor,
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: hoverBg,
          borderColor: hoverBorder,
        },
      }}
    >
      My Account
    </Button>
  );
};
