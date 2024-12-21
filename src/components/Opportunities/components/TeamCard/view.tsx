import React, { useState } from "react";
import { TeamCardViewProps } from "./types";
import { TeamDialog } from "../TeamDialog";
import { useLocale } from "../../../../contexts/Locale";

type ComponentType = React.FC<TeamCardViewProps>;

export const TeamCardView: ComponentType = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const { commonLocale } = useLocale();
  return (
    <div>
      {/* Team Card */}
      <div className="flex flex-col items-center text-center py-8 px-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl md:text-3xl text-green-900 font-bold mb-4">
          {props.team.title}
        </h2>
        <p className="text-md md:text-lg text-gray-700 mb-6 leading-relaxed">
          {props.team.description}
        </p>
        <img
          src={props.team.image}
          alt="Sports Team"
          className="object-cover rounded-md"
        />
        {props.team.dialog && (
          <button
            onClick={openDialog}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {commonLocale.get("moreInfo")}
          </button>
        )}
      </div>

      {/* Dialog/Modal */}
      {isDialogOpen && <TeamDialog team={props.team} onClose={closeDialog} />}
    </div>
  );
};
