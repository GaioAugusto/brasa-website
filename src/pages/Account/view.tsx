import {
  Box,
  Button,
  Card,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { AccountMenuViewProps } from "./types";
import { BrasaCard } from "./components/BrasaCard";
import React from "react";
import { useLocale } from "../../contexts/Locale";

type ComponentType = React.FC<AccountMenuViewProps>;
export const AccountMenuView: ComponentType = (props) => {
  const { commonLocale, templatesLocale } = useLocale();
  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 4rem)" }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: 240,
          borderRight: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <List>
          <ListItemButton
            selected={props.active === "card"}
            onClick={() => props.setActive("card")}
          >
            <ListItemText primary={commonLocale.get("myBrasaCard")} />
          </ListItemButton>

          {/* future items */}
          <ListItemButton
            selected={props.active === "settings"}
            onClick={() => props.setActive("settings")}
          >
            <ListItemText primary={commonLocale.get("settings")} />
          </ListItemButton>
        </List>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={props.handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <React.Fragment>
        <Box sx={{ flex: 1, bgcolor: "grey.100", p: 3 }}>
          {/* Disclaimer Card */}
          <Card
            sx={{
              mb: 2,
              p: 2,
              borderLeft: "6px solid",
              borderColor: "warning.main",
              bgcolor: "warning.light",
            }}
          >
            <Typography variant="body2" color="text.primary">
              ⚠️ {templatesLocale.get("brasaCardDisclaimerPrefix")} <strong>{templatesLocale.get("brasaCardDisclaimerBold")}</strong>.
              {templatesLocale.get("brasaCardDisclaimerSuffix")}
            </Typography>
          </Card>

          {props.active === "card" && props.user ? (
            <BrasaCard
              firstName={props.user.firstName}
              lastName={props.user.lastName}
              email={props.user.email}
            />
          ) : props.active === "card" ? (
            <Typography>{templatesLocale.get("pleaseLogin")}</Typography>
          ) : (
            <Typography>{templatesLocale.get("settingsComingSoon")}</Typography>
          )}
        </Box>
      </React.Fragment>
    </Box>
  );
};
