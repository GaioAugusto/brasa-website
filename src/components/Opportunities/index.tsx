import { useLocale } from "../../contexts/Locale";
import { soccerCaptain, volleyballCaptain } from "../../utilities/teamCaptains";
import { OpportunitiesProps, Team } from "./types";
import { OpportunitiesView } from "./view";

type ComponentType = React.FC<OpportunitiesProps>;
export const Opportunities: ComponentType = () => {
  const { commonLocale, templatesLocale } = useLocale();

  const soccerTeam: Team = {
    title: commonLocale.get("soccerTeam"),
    description: templatesLocale.get("soccerTeamDescription"),
    dialog: true,
    image: "/soccer1.jpeg",
    descriptionDialog: templatesLocale.get("dialogDescription"),
    imageDialog: "/soccer2.jpeg",
    captain: soccerCaptain,
    youtubeUrl: "https://www.youtube.com/@Galatasarados",
    instagramUrl: "https://www.instagram.com/galatasaradosfc/",
  };
  const volleyballTeam: Team = {
    title: commonLocale.get("volleyballTeam"),
    description: templatesLocale.get("volleyballTeamDescription"),
    dialog: true,
    image: "/brasavolei1.jpeg",
    descriptionDialog: templatesLocale.get("dialogDescription"),
    imageDialog: "/brasavolei2.jpeg",
    captain: volleyballCaptain,
  };

  return (
    <OpportunitiesView
      soccerTeam={soccerTeam}
      volleyballTeam={volleyballTeam}
    />
  );
};
