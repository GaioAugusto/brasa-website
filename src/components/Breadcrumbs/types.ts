export interface Crumb {
    label: string;
    path: string;
}

export interface BreadcrumbsProps {}

export interface BreadcrumbsViewProps {
    crumbs: Crumb[];
}
