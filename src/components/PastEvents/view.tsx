import { useLocale } from "../../contexts/Locale";
import { Header } from "../Header";
import { PastEventsViewProps } from "./types";

type ComponentType = React.FC<PastEventsViewProps>;
export const PastEventsView: ComponentType = () => {
  const { commonLocale } = useLocale();
  return (
    <div>
      <Header title={commonLocale.get("pastEvents")} />
    </div>
  );
};
