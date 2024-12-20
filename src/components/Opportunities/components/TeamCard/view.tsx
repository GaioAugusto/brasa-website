import { TeamCardViewProps } from "./types";

type ComponentType = React.FC<TeamCardViewProps>;
export const TeamCardView: ComponentType = (props) => {
  return (
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
        className=" object-cover rounded-md"
      />
      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        More info
      </button>
    </div>
  );
};
