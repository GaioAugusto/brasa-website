import { useLocation } from "react-router-dom";
import { BoardProps } from "./types";
import { BoardView } from "./view";
import { useEffect } from "react";

type ComponentType = React.FC<BoardProps>;
export const Board: ComponentType = () => {
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

  return <BoardView />;
};
