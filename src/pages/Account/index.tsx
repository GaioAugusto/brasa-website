// src/pages/Account/AccountMenu.tsx
import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { BrasaCard } from "./components/BrasaCard";

type MenuKey = "card" | "settings";

export const AccountMenu: React.FC = () => {
  const [active, setActive] = useState<MenuKey>("card");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
            selected={active === "card"}
            onClick={() => setActive("card")}
          >
            <ListItemText primary="My BRASA Card" />
          </ListItemButton>

          {/* future items */}
          <ListItemButton
            selected={active === "settings"}
            onClick={() => setActive("settings")}
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
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, bgcolor: "grey.100", p: 3 }}>
        {active === "card" && user ? (
          <BrasaCard
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
          />
        ) : active === "card" ? (
          <Typography>Please log in to see your card.</Typography>
        ) : (
          <Typography>Settings coming soon!</Typography>
        )}
      </Box>
    </Box>
  );
};
