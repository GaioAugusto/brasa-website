import { useLocale } from "../../../../contexts/Locale";
import { LanguageSwitchViewProps } from "./types";
import Flag from "react-world-flags";

type ComponentType = React.FC<LanguageSwitchViewProps>;
export const LanguageSwitchView: ComponentType = (props) => {
  const { locale, changeLocale } = useLocale();

  return (
    <div className="flex justify-center space-x-2">
      <button
        onClick={() => changeLocale("pt-BR")}
        className={`flex items-center px-2 py-1 rounded-md transition-transform transform ${
          locale === "pt-BR" ? "border-2 border-yellow-500" : ""
        }`}
      >
        <Flag code="BR" style={{ width: "24px", height: "16px" }} />
      </button>
      <button
        onClick={() => changeLocale("en-US")}
        className={`flex items-center px-2 py-1 rounded-md transition-transform transform ${
          locale === "en-US" ? "border-2 border-yellow-500" : ""
        }`}
      >
        <Flag code="US" style={{ width: "24px", height: "16px" }} />
      </button>
    </div>
  );
};
