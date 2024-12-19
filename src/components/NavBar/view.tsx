// import React from "react";
// import { NavBarViewProps } from "./types";
// import { FaInstagram, FaWhatsapp } from "react-icons/fa";
// import { LanguageSwitch } from "./Components/LanguageSwitch";

// type ComponentType = React.FC<NavBarViewProps>;
// export const NavBarView: ComponentType = (props) => {
//   return (
//     <div>
//       <nav className="fixed top-0 left-0 w-full bg-green-800 text-white shadow-lg z-50">
//         {" "}
//         <div className="max-w-total">
//           <div className="flex justify-around items-center h-16">
//             <div className="flex items-center">
//               <a href="/" className="flex justify-center items-center">
//                 <img
//                   src="/GoodLogo.png"
//                   alt="Logo"
//                   className="h-14 w-14 mr-2"
//                 />
//                 <span className="text-3xl font-bold">BRASA at UofT</span>
//               </a>
//             </div>
//             <div className="flex justify-end space-x-6">
//               {props.NavBarItems.map((NavBarItem) => (
//                 <a
//                   href={NavBarItem.href}
//                   className="text-white hover:text-gray-300 transition-transform duration-300 transform hover:scale-110"
//                 >
//                   {NavBarItem.name}
//                 </a>
//               ))}
//             </div>
//             <div className="flex justify-center space-x-4">
//               <a
//                 href="https://www.instagram.com/brasauoft/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-white hover:text-pink-500 transition-transform duration-300 transform hover:scale-125"
//               >
//                 <FaInstagram className="h-6 w-6" />
//               </a>
//               <a
//                 href="https://chat.whatsapp.com/C6HTycGFMA2GWSmCDFjWdT"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-white hover:text-green-500 transition-transform duration-300 transform hover:scale-125"
//               >
//                 <FaWhatsapp className="h-6 w-6" />
//               </a>
//               <LanguageSwitch />
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

import { useNavigate } from "react-router-dom";
import { NavBarItem, NavBarViewProps } from "./types";

export const NavBarView: React.FC<NavBarViewProps> = (props) => {
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    if (href === "/") {
      // Navigate to the home page and scroll to the top
      navigate("/", { state: { scrollTo: "top" } });
    } else if (href.startsWith("/#")) {
      const sectionId = href.slice(2); // Remove "/#" to get the section ID
      if (window.location.pathname === "/") {
        // If already on the home page, scroll to the section
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to the home page and scroll to the section
        navigate("/", { state: { scrollTo: sectionId } });
      }
    } else {
      // For other links, navigate normally
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
        </div>
      </div>
    </nav>
  );
};
