import { BoardViewProps } from "./types";
import { boardMembers } from "../../utilities/boardMembers";
import { BoardMember } from "../../types/boardMember";
import { useLocale } from "../../contexts/Locale";
import { Member } from "./components/Member";
import { Header } from "../../components/Header";

type ComponentType = React.FC<BoardViewProps>;

export const BoardView: ComponentType = () => {
  const { commonLocale } = useLocale();

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
