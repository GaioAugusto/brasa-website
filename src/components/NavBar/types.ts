export interface NavBarItem {
  name: string;
  href: string;
}

export interface NavBarProps {}
export interface NavBarViewProps {
  NavBarItems: NavBarItem[];
}
