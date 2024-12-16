import { LanguageSwitchProps } from "./types";
import { LanguageSwitchView } from "./view";

type ComponentType = React.FC<LanguageSwitchProps>;
export const LanguageSwitch: ComponentType = () => {
  return <LanguageSwitchView />;
};
