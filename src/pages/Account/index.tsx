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
import { AccountMenuProps, MenuKey } from "./types";
import { AccountMenuView } from "./view";

type ComponentType = React.FC<AccountMenuProps>;
export const AccountMenu: ComponentType = () => {
  const [active, setActive] = useState<MenuKey>("card");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AccountMenuView
      active={active}
      user={user}
      setActive={setActive}
      handleLogout={handleLogout}
    />
  );
};
