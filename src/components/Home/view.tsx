import React from "react";
import { HomeViewProps } from "./types";
import { About } from "./About";
import { useLocale } from "../../contexts/Locale";

type ComponentType = React.FC<HomeViewProps>;
export const HomeView: ComponentType = () => {
  const { commonLocale, templatesLocale } = useLocale();
  return (
    <div>
      <section id="home" className="relative w-full h-screen overflow-hidden">
        {/* Background Image with Blur */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/picnic1.jpeg')",
          }}
        >
          {/* Blur effect */}
          <div className="w-full h-full backdrop-blur-sm"></div>
        </div>

        {/* Overlay to reduce brightness */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
          <h1 className="text-6xl md:text-6xl font-bold">
            UNIVERSITY OF TORONTO
          </h1>
          <h1 className="text-7xl md:text-7xl font-bold mb-4">
            BRAZILIAN STUDENT ASSOCIATION
          </h1>
          <h2 className="text-xl italic mb-6">
            {`"${templatesLocale.get("subtitleDescription")}"`}
          </h2>
          <a href="#about">
            <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
              {commonLocale.get("about")}
            </button>
          </a>
        </div>
      </section>
      <section id="about">
        <About />
      </section>
    </div>
  );
};
