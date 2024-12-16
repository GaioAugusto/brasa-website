import React from "react";
import { NavBarViewProps } from "./types";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { LanguageSwitch } from "./Components/LanguageSwitch";

type ComponentType = React.FC<NavBarViewProps>;
export const NavBarView: ComponentType = (props) => {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-green-800 text-white shadow-lg">
        <div className="max-w-total">
          <div className="flex justify-around items-center h-16">
            <div className="flex items-center">
              <a href="#home" className="flex justify-center items-center">
                <img
                  src="/GoodLogo.png"
                  alt="Logo"
                  className="h-14 w-14 mr-2"
                />
                <span className="text-3xl font-bold">BRASA at UofT</span>
              </a>
            </div>
            <div className="flex justify-end space-x-6">
              {props.NavBarItems.map((NavBarItem) => (
                <a
                  href={NavBarItem.href}
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
                href="https://www.whatsapp.com"
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
    </div>
  );
};
