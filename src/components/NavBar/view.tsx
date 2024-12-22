import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";

import { NavBarViewProps, NavBarItem } from "./types";
import { LanguageSwitch } from "./Components/LanguageSwitch";

export const NavBarView: React.FC<NavBarViewProps> = (props) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (href: string) => {
    // Close the mobile menu after navigation
    setIsMenuOpen(false);

    if (href === "/") {
      navigate("/", { state: { scrollTo: "top" } });
    } else if (href === "/board") {
      navigate("/board", { state: { scrollTo: "top" } });
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
      <div className="max-w-total mx-auto px-4">
        {/* The main container for the navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/");
              }}
            >
              <img src="/GoodLogo.png" alt="Logo" className="h-14 w-14 mr-2" />
              <span className="text-2xl md:text-3xl font-bold">
                BRASA at UofT
              </span>
            </a>
          </div>

          {/* Desktop Menu (hidden on small screens) */}
          <div className="hidden md:flex items-center space-x-6">
            {props.NavBarItems.map((item: NavBarItem) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.href);
                }}
                className="text-white hover:text-gray-300 transition-transform duration-300 transform hover:scale-110"
              >
                {item.name}
              </a>
            ))}

            {/* Social icons and Language switch on desktop */}
            <div className="flex items-center space-x-4 ml-4">
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

          {/* Hamburger button (shows on small screens) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (visible only when isMenuOpen === true on small screens) */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-2 pb-4">
            {props.NavBarItems.map((item: NavBarItem) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.href);
                }}
                className="text-white hover:text-gray-300 text-lg transition-transform duration-300 transform hover:scale-105"
              >
                {item.name}
              </a>
            ))}

            {/* Social icons and Language switch on mobile */}
            <div className="flex items-center space-x-4 pt-2">
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
        )}
      </div>
    </nav>
  );
};
