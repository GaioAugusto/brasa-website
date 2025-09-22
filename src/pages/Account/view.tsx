import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { AccountMenuViewProps } from "./types";
import { BrasaCard } from "./components/BrasaCard";

type ComponentType = React.FC<AccountMenuViewProps>;
export const AccountMenuView: ComponentType = (props) => {
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
            <ListItemText primary="My BRASA Card" />
          </ListItemButton>

          {/* future items */}
          <ListItemButton
            selected={props.active === "settings"}
            onClick={() => props.setActive("settings")}
          >
            <ListItemText primary="Settings" />
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
      <Box sx={{ flex: 1, bgcolor: "grey.100", p: 3 }}>
        {props.active === "card" && props.user ? (
          <BrasaCard
            firstName={props.user.firstName}
            lastName={props.user.lastName}
            email={props.user.email}
          />
        ) : props.active === "card" ? (
          <Typography>Please log in to see your card.</Typography>
        ) : (
          <Typography>Settings coming soon!</Typography>
        )}
      </Box>
    </Box>
  );
};
