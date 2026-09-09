import { Link } from "react-router-dom";
import { useLocale } from "../../contexts/Locale";
import { NotFoundViewProps } from "./types";

type ComponentType = React.FC<NotFoundViewProps>;

export const NotFoundView: ComponentType = () => {
    const { templatesLocale } = useLocale();

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
            <p className="text-6xl font-bold text-green-900">404</p>
            <h1 className="text-2xl font-semibold text-gray-800">
                {templatesLocale.get("notFoundTitle")}
            </h1>
            <p className="max-w-md text-gray-600">
                {templatesLocale.get("notFoundDescription")}
            </p>
            <Link
                to="/"
                className="mt-2 rounded-md bg-green-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-900"
            >
                {templatesLocale.get("notFoundBackHome")}
            </Link>
        </div>
    );
};
