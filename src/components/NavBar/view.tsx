import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

import { NavBarViewProps, NavBarItem } from "./types";
import { LanguageSwitch } from "./Components/LanguageSwitch";

export const NavBarView: React.FC<NavBarViewProps> = (props) => {
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    if (href === "/") {
      navigate("/", { state: { scrollTo: "top" } });
    } else if (href === "/board") {
      navigate("/board", { state: { scrollTo: "top" } }); // Ensure "scrollTo" state is passed
    } else if (href === "/opportunities") {
      navigate("/opportunities", { state: { scrollTo: "top" } });
    } else if (href === "/events") {
      navigate("/events", { state: { scrollTo: "top" } });
    } else if (href.startsWith("/#")) {
      const sectionId = href.slice(2);
      if (window.location.pathname === "/") {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/", { state: { scrollTo: sectionId } });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-green-800 text-white shadow-lg z-50">
      <div className="max-w-total">
        <div className="flex justify-around items-center h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="flex justify-center items-center"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/");
              }}
            >
              <img src="/GoodLogo.png" alt="Logo" className="h-14 w-14 mr-2" />
              <span className="text-3xl font-bold">BRASA at UofT</span>
            </a>
          </div>
          <div className="flex justify-end space-x-6">
            {props.NavBarItems.map((NavBarItem: NavBarItem) => (
              <a
                key={NavBarItem.name}
                href={NavBarItem.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(NavBarItem.href);
                }}
                className="text-white hover:text-gray-300 transition-transform duration-300 transform hover:scale-110"
              >
                {NavBarItem.name}
              </a>
            ))}
          </div>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.instagram.com/brasauoft/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-500 transition-transform duration-300 transform hover:scale-125"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://chat.whatsapp.com/C6HTycGFMA2GWSmCDFjWdT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-500 transition-transform duration-300 transform hover:scale-125"
            >
              <FaWhatsapp className="h-6 w-6" />
            </a>
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
};
