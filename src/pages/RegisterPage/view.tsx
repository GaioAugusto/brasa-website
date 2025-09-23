import { Box, Card, CardContent, Link } from "@mui/material";
import { RegisterPageViewProps } from "./types";
import { RegisterForm } from "./components/RegisterForm";
import { AvatarIcon } from "../../components/AvatarIcon";
import { useLocale } from "../../contexts/Locale";
import { Link as RouterLink } from "react-router-dom";

type ComponentType = React.FC<RegisterPageViewProps>;
export const RegisterPageView: ComponentType = (props) => {
  const { commonLocale } = useLocale();
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 4rem)", // minus NavBar height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "grey.900" : "grey.100",
        px: 2,
      }}
    >
      <Card sx={{ width: 360, px: 3, py: 4, boxShadow: 4 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <AvatarIcon title={commonLocale.get("createAccount")} />
          <RegisterForm
            loading={props.loading}
            handleSubmit={props.handleSubmit}
            error={props.error}
          />
        </CardContent>
        <Box sx={{ display: "flex", mt: 1 }}>
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            variant="body2"
          >
            Already have an account? Log In
          </Link>
        </Box>
      </Card>
    </Box>
  );
};
