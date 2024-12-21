import { EventDialogViewProps } from "./types";

type ComponentType = React.FC<EventDialogViewProps>;
export const EventDialogView: ComponentType = ({
  event,
  onClose,
  ...props
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
        >
          ✕
        </button>

        {/* Event Image */}
        <img
          src={event.image2}
          alt={event.name}
          className="object-cover rounded-md mb-6 mt-6 w-full h-60"
        />

        {/* Title and Social Links */}
        <h2 className="text-3xl font-bold text-green-900">{event.name}</h2>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {event.description}
        </p>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};
