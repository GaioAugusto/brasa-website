import { FooterViewProps } from "./types";
import { useLocale } from "../../contexts/Locale";

type ComponentType = React.FC<FooterViewProps>;
export const FooterView: ComponentType = () => {
  const { templatesLocale } = useLocale();
  return (
    <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm bg-gray-100">
      <p>
        &copy; {new Date().getFullYear()} {templatesLocale.get("allRightsReserved")}
      </p>
    </div>
  );
};
