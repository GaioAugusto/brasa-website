import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BreadcrumbsViewProps } from "./types";

type ComponentType = React.FC<BreadcrumbsViewProps>;

export const BreadcrumbsView: ComponentType = ({ crumbs }) => (
    <nav aria-label="Breadcrumb" className="bg-gray-100 px-4 pt-4 sm:px-8">
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1.5 text-sm text-gray-600">
            {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;

                return (
                    <li key={crumb.path} className="flex items-center gap-1.5">
                        {index > 0 && (
                            <FaChevronRight
                                aria-hidden="true"
                                className="h-2.5 w-2.5 text-gray-400"
                            />
                        )}
                        {isLast ? (
                            <span
                                aria-current="page"
                                className="font-semibold text-green-900"
                            >
                                {crumb.label}
                            </span>
                        ) : (
                            <Link
                                to={crumb.path}
                                className="transition hover:text-green-800 hover:underline"
                            >
                                {crumb.label}
                            </Link>
                        )}
                    </li>
                );
            })}
        </ol>
    </nav>
);
