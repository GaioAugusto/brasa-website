import { JoinViewProps } from "./types";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect } from "react";
import { FaGlobe, FaInstagram } from "react-icons/fa";
import { useLocale } from "../../contexts/Locale";

type ComponentType = React.FC<JoinViewProps>;

export const JoinView: ComponentType = () => {
  const { commonLocale, templatesLocale } = useLocale();

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <section data-aos="fade-up" id="join" className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center overflow-hidden">
        {/* Text Content */}
        <div className="bg-white p-8 md:p-12 rounded-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
            {commonLocale.get("becomeMember")}
          </h1>
          <p className="text-md md:text-lg text-gray-700 mb-8">
            {templatesLocale.get("becomeMemberDescription")}
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.instagram.com/brasauoft/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 transition-transform duration-300 transform hover:scale-125"
            >
              <FaInstagram className="h-10 w-10" />
            </a>
            <a
              href="https://www.bouncelife.com/login?from=%2Forganizations%2F668d9e15e4707a3e6f1804ed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 transition-transform duration-300 transform hover:scale-125"
            >
              <FaGlobe className="h-10 w-10" />
            </a>
          </div>
        </div>

        {/* Image Content */}
        <div className="relative">
          <img
            src="/picnic5.jpeg"
            alt="Group of Students"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};
