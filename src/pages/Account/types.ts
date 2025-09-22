import { User } from "../../types/user";

export interface AccountMenuProps {}
export interface AccountMenuViewProps {
  readonly active: MenuKey;
  readonly user: User | null;

  readonly setActive: React.Dispatch<React.SetStateAction<MenuKey>>;
  readonly handleLogout: () => void;
}

export type MenuKey = "card" | "settings";
