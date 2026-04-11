export interface NavBarSubItem {
    name: string;
    href: string;
}

export interface NavBarItem {
    name: string;
    href?: string;
    children?: NavBarSubItem[];
}

export interface NavBarProps {}
export interface NavBarViewProps {
    NavBarItems: NavBarItem[];
}
