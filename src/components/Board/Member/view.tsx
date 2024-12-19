import { FaLinkedin } from "react-icons/fa";
import { MemberViewProps } from "./types";
import { useLocale } from "../../../contexts/Locale";

type ComponentType = React.FC<MemberViewProps>;
export const MemberView: ComponentType = ({ boardMember }) => {
  const { commonLocale } = useLocale();
  return (
    <div
      key={boardMember.name}
      className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition"
    >
      <img
        src={boardMember.picture}
        alt={boardMember.name}
        className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover mb-4"
      />
      <h3 className="text-xl font-bold text-green-900">{boardMember.name}</h3>
      <p className="text-yellow-600 mb-2">
        {commonLocale.get(boardMember.position)}
      </p>
      <p className="text-gray-700 text-center">
        <span className="block font-semibold">{boardMember.major}</span>
        {boardMember.year && <span>{boardMember.year} Year</span>}
        <span className="block text-gray-500">{boardMember.city}</span>
      </p>
      {boardMember.linkedin && (
        <a
          href={boardMember.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 transition-transform duration-300 transform hover:scale-125"
        >
          <FaLinkedin className="h-6 w-6" />
        </a>
      )}
    </div>
  );
};
// className="text-white hover:text-pink-500 transition-transform duration-300 transform hover:scale-125"
