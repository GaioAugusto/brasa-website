import { useLocation } from "react-router-dom";
import { OpportunitiesViewProps } from "./types";
import { useEffect } from "react";
import { useLocale } from "../../contexts/Locale";
import { TeamCard } from "./components/TeamCard";
import { Header } from "../Header";

type ComponentType = React.FC<OpportunitiesViewProps>;
export const OpportunitiesView: ComponentType = (props) => {
  const { state } = useLocation() as { state: { scrollTo?: string } | null };
  const { commonLocale, templatesLocale } = useLocale();

  useEffect(() => {
    if (state?.scrollTo) {
      if (state.scrollTo === "top") {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Scroll to a specific section
        const section = document.getElementById(state.scrollTo);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [state]);

  return (
    <section id="opportunities" className="bg-gray-100">
      {/* Title Section */}
      <Header
        title={commonLocale.get("opportunities")}
        subtitle={templatesLocale.get("getMoreInvolved")}
      />

      {/* Subtitle */}
      <div className="text-center mt-8">
        <h1 className="text-5xl text-green-900 font-bold">
          {commonLocale.get("sportsTeams")}
        </h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col">
          <TeamCard team={props.soccerTeam} />
        </div>
        <div className="flex flex-col">
          <TeamCard team={props.volleyballTeam} />
        </div>
      </div>
    </section>
  );
};
