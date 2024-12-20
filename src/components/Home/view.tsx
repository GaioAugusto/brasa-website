import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { About } from "./About";
import { Join } from "../Join";
import { useLocale } from "../../contexts/Locale";
import { Divider } from "../Divider";

export const HomeView: React.FC = () => {
  const { state } = useLocation() as { state: { scrollTo?: string } | null };
  const { commonLocale, templatesLocale } = useLocale();

  useEffect(() => {
    if (state?.scrollTo) {
      if (state.scrollTo === "top") {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Scroll to a specific section
        const section = document.getElementById(state.scrollTo);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [state]);

  return (
    <div className="bg-gray-100">
      {" "}
      <section id="home" className="relative w-full h-screen overflow-hidden">
        {/* Background Image with Blur */}{" "}
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
      <Divider />
      <section className="bg-gray-100" id="join">
        <Join />
      </section>
    </div>
  );
};
