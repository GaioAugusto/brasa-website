import React, { useEffect } from "react";
import { BoardViewProps } from "./types";
import { boardMembers } from "../../utilities/boardMembers";
import { Member } from "./Member";
import { BoardMember } from "../../types/boardMember";
import { useLocation } from "react-router-dom";
import { Header } from "../Header";
import { useLocale } from "../../contexts/Locale";

type ComponentType = React.FC<BoardViewProps>;

export const BoardView: ComponentType = () => {
  const { commonLocale } = useLocale();
  const { state } = useLocation() as { state: { scrollTo?: string } | null };

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
    <section id="board" className="bg-gray-100">
      {/* Title Section */}
      <Header
        title={commonLocale.get("meetBoard")}
        subtitle={commonLocale.get("executiveTeam")}
      />

      {/* Board Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 ">
        {boardMembers.map((member: BoardMember) => (
          <Member boardMember={member} />
        ))}
      </div>
      {/* <Footer /> */}
    </section>
  );
};
