import { useState } from "react";
import { EventCardViewProps } from "./types";
import { useLocale } from "../../../../contexts/Locale";
import { EventDialog } from "../EventDialog";

type ComponentType = React.FC<EventCardViewProps>;
export const EventCardView: ComponentType = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const { commonLocale } = useLocale();

  return (
    <div className="flex flex-col items-center h-full text-center">
      {/* Team Card */}
      <div className="flex flex-col items-center h-full text-center p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl md:text-3xl text-green-900 font-bold mb-4">
          {props.event.name}
        </h2>
        {/* <p className="text-md md:text-lg text-gray-700 mb-6 leading-relaxed">
          {props.team.description}
        </p> */}
        <img
          src={props.event.image}
          alt="Brasa event"
          className="object-cover rounded-md"
        />
        {props.event.dialog && (
          <button
            onClick={openDialog}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {commonLocale.get("moreInfo")}
          </button>
        )}
      </div>

      {/* Dialog/Modal */}
      {isDialogOpen && (
        <EventDialog event={props.event} onClose={closeDialog} />
      )}
    </div>
  );
};
