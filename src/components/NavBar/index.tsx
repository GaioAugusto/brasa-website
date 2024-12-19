import { useLocale } from "../../contexts/Locale";
import { NavBarItem, NavBarProps } from "./types";
import { NavBarView } from "./view";

type ComponentType = React.FC<NavBarProps>;
export const NavBar: ComponentType = () => {
  const { commonLocale } = useLocale();

  const NavBarItems: NavBarItem[] = [
    { name: commonLocale.get("home"), href: "/" },
    { name: commonLocale.get("board"), href: "/board" },
    { name: commonLocale.get("join"), href: "/#join" },
    { name: commonLocale.get("resources"), href: "#resources" },
    { name: commonLocale.get("contact"), href: "#contact" },
  ];
  return <NavBarView NavBarItems={NavBarItems} />;
};
