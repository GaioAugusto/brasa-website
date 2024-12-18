import { MemberViewProps } from "./types";

type ComponentType = React.FC<MemberViewProps>;
export const MemberView: ComponentType = ({ boardMember }) => {
  return (
    <div
      key={boardMember.name}
      className="flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-lg hover:shadow-2xl transition"
    >
      <img
        src={boardMember.picture}
        alt={boardMember.name}
        className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover mb-4"
      />
      <h3 className="text-xl font-bold text-green-900">{boardMember.name}</h3>
      <p className="text-yellow-600 text-sm mb-2">{boardMember.position}</p>
      <p className="text-gray-700 text-center">
        <span className="block font-semibold">{boardMember.major}</span>
        <span>{boardMember.year} Year</span>
        <span className="block text-gray-500">{boardMember.city}</span>
      </p>
    </div>
  );
};
