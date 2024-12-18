import React from "react";
import { BoardViewProps } from "./types";
import { boardMembers } from "../../utilities/boardMembers";
import { Member } from "./Member";
import { BoardMember } from "../../types/boardMember";

type ComponentType = React.FC<BoardViewProps>;

export const BoardView: ComponentType = () => {
  return (
    <div>
      {/* Title Section */}
      <div className="relative flex flex-col w-full justify-center items-center text-center py-16 bg-green-900">
        {/* Subtle SVG Background */}
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#FFD700"
            d="M0,128L48,122.7C96,117,192,107,288,128C384,149,480,203,576,229.3C672,256,768,256,864,250.7C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        {/* Titles */}
        <h1 className="text-3xl md:text-5xl font-bold text-white z-10">
          Meet the Board
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-yellow-300 mt-4 z-10">
          Executive Team
        </h2>
      </div>

      {/* Board Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white">
        {boardMembers.map((member: BoardMember) => (
          <Member boardMember={member} />
        ))}
      </div>
    </div>
  );
};
