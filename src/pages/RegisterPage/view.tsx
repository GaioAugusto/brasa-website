import { Box, Card, CardContent } from "@mui/material";
import { RegisterPageViewProps } from "./types";
import { RegisterForm } from "./components/RegisterForm";
import { AvatarIcon } from "../../components/AvatarIcon";
import { useLocale } from "../../contexts/Locale";

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
      </Card>
    </Box>
  );
};
