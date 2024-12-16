import { NavBarItem, NavBarProps } from "./types";
import { NavBarView } from "./view";

type ComponentType = React.FC<NavBarProps>;
export const NavBar: ComponentType = () => {
  const NavBarItems: NavBarItem[] = [
    { name: "Home", href: "#home" },
    { name: "Our Board", href: "#board" },
    { name: "Join Us", href: "#join" },
    { name: "Resources", href: "#resources" },
    { name: "Contact", href: "#contact" },
  ];
  return <NavBarView NavBarItems={NavBarItems} />;
};
