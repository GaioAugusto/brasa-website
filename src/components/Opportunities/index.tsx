import { useLocale } from "../../contexts/Locale";
import { OpportunitiesProps, Team } from "./types";
import { OpportunitiesView } from "./view";

type ComponentType = React.FC<OpportunitiesProps>;
export const Opportunities: ComponentType = () => {
  const { commonLocale, templatesLocale } = useLocale();
  const soccerTeam: Team = {
    title: commonLocale.get("soccerTeam"),
    description: templatesLocale.get("soccerTeamDescription"),
    dialog: false,
    image: "/soccer1.jpeg",
  };
  const volleyballTeam: Team = {
    title: commonLocale.get("volleyballTeam"),
    description: templatesLocale.get("volleyballTeamDescription"),
    dialog: false,
    image: "/brasavolei1.jpeg",
  };
  return (
    <OpportunitiesView
      soccerTeam={soccerTeam}
      volleyballTeam={volleyballTeam}
    />
  );
};
