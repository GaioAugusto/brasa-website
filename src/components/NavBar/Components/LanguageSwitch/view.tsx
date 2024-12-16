import { useLocale } from "../../../../contexts/Locale";
import { LanguageSwitchViewProps } from "./types";
import Flag from "react-world-flags";

type ComponentType = React.FC<LanguageSwitchViewProps>;
export const LanguageSwitchView: ComponentType = (props) => {
  const { locale, changeLocale } = useLocale();

  return (
    <div className="flex space-x-1">
      <button onClick={() => changeLocale("pt-BR")}>
        <Flag
          code="BR"
          style={{ width: "24px", height: "16px", marginRight: "8px" }}
        />
      </button>
      <button>
        <Flag
          code="US"
          style={{ width: "24px", height: "16px", marginRight: "8px" }}
        />
      </button>
    </div>
  );
};
