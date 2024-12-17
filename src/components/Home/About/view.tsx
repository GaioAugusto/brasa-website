import React, { useEffect } from "react";
import { AboutViewProps } from "./types";
import { useLocale } from "../../../contexts/Locale";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

type ComponentType = React.FC<AboutViewProps>;

export const AboutView: ComponentType = () => {
  const { templatesLocale } = useLocale();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <section
      id="about"
      className="flex flex-col md:flex-row items-center justify-center py-12 px-6 bg-gray-100"
    >
      {/* Image Column */}
      <div className="flex flex-col space-y-6 md:space-y-8 md:pr-12">
        {/* First Image */}
        <div className="relative w-72 h-48 md:w-80 md:h-56 rounded-lg overflow-hidden shadow-lg transform rotate-3 hover:rotate-0 transition duration-300">
          <img
            src="/picnic4.jpeg"
            alt="BRASA Event 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Second Image */}
        <div className="relative w-72 h-48 md:w-80 md:h-56 rounded-lg overflow-hidden shadow-lg transform -rotate-3 hover:rotate-0 transition duration-300">
          <img
            src="/worldCup1.jpeg"
            alt="BRASA Event 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Third Image */}
        <div className="relative w-72 h-48 md:w-80 md:h-56 rounded-lg overflow-hidden shadow-lg transform rotate-3 hover:rotate-0 transition duration-300">
          <img
            src="/clubFair.jpeg"
            alt="BRASA Event 3"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Description Section */}
      <div
        data-aos="fade-up"
        className="flex flex-col justify-center max-w-2xl"
      >
        <h2 className="text-4xl text-green-900 font-bold mb-6">
          {templatesLocale.get("weAreLargest")}
        </h2>
        <p className="text-2xl leading-relaxed">
          {templatesLocale.get("clubDescription")}
        </p>
      </div>
    </section>
  );
};
