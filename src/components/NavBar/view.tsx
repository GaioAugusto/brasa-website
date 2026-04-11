import React, { useState } from "react";
import { FaBars, FaChevronDown, FaInstagram, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/auth";
import { AccountButton } from "../AccountButton";
import { LoginButton } from "../LoginButton";
import { LanguageSwitch } from "./Components/LanguageSwitch";
import { NavBarItem, NavBarViewProps } from "./types";

export const NavBarView: React.FC<NavBarViewProps> = (props) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
        null,
    );

    const handleNavigation = (href: string) => {
        setIsMenuOpen(false);

        if (href === "/") {
            navigate("/", { state: { scrollTo: "top" } });
        } else if (href === "/board") {
            navigate("/board", { state: { scrollTo: "top" } });
        } else if (href.startsWith("/opportunities")) {
            navigate(href, { state: { scrollTo: "top" } });
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
                            <img
                                src="/logos/GoodLogo.png"
                                alt="Logo"
                                className="h-14 w-14 mr-2"
                            />
                            <span className="text-2xl md:text-3xl font-bold">
                                BRASA at UofT
                            </span>
                        </a>
                    </div>

                    {/* Desktop Menu (hidden on small screens) */}
                    <div className="hidden md:flex items-center space-x-6">
                        {props.NavBarItems.map((item: NavBarItem) => {
                            if (item.children?.length) {
                                return (
                                    <div
                                        key={item.name}
                                        className="relative group"
                                    >
                                        <button
                                            type="button"
                                            className="flex items-center gap-1 text-white hover:text-green-100 transition-transform duration-300 transform group-hover:scale-110"
                                        >
                                            {item.name}
                                            <FaChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                                        </button>
                                        <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                                            <div className="bg-green-900 text-green-50 rounded-md shadow-lg shadow-green-950/40 border border-green-700 min-w-48 py-2">
                                                {item.children.map((child) => (
                                                    <a
                                                        key={child.name}
                                                        href={child.href}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleNavigation(
                                                                child.href,
                                                            );
                                                        }}
                                                        className="block px-4 py-2 hover:bg-green-700"
                                                    >
                                                        {child.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            if (!item.href) {
                                return null;
                            }

                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigation(item.href as string);
                                    }}
                                    className="text-white hover:text-gray-300 transition-transform duration-300 transform hover:scale-110"
                                >
                                    {item.name}
                                </a>
                            );
                        })}

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
                            {user == null ? (
                                <LoginButton mode={"dark"} />
                            ) : (
                                <AccountButton mode={"dark"} />
                            )}
                            <LanguageSwitch />
                        </div>
                    </div>

                    {/* Hamburger button (shows on small screens) */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <FaTimes size={22} />
                            ) : (
                                <FaBars size={22} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu (visible only when isMenuOpen === true on small screens) */}
                {isMenuOpen && (
                    <div className="md:hidden flex flex-col items-center space-y-2 pb-4">
                        {props.NavBarItems.map((item: NavBarItem) => {
                            if (item.children?.length) {
                                const isOpen = openMobileDropdown === item.name;

                                return (
                                    <div
                                        key={item.name}
                                        className="w-full max-w-xs text-center"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenMobileDropdown(
                                                    isOpen ? null : item.name,
                                                )
                                            }
                                            className="w-full flex items-center justify-center gap-2 text-white hover:text-green-100 text-lg transition-transform duration-300 transform hover:scale-105"
                                        >
                                            {item.name}
                                            <FaChevronDown
                                                className={`h-3 w-3 transition-transform duration-300 ${
                                                    isOpen ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>
                                        {isOpen && (
                                            <div className="mt-2 w-full rounded-md bg-green-900/70 border border-green-700 px-3 py-2 flex flex-col items-center space-y-2">
                                                {item.children.map((child) => (
                                                    <a
                                                        key={child.name}
                                                        href={child.href}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setOpenMobileDropdown(
                                                                null,
                                                            );
                                                            handleNavigation(
                                                                child.href,
                                                            );
                                                        }}
                                                        className="w-full py-1 text-green-50 hover:text-white hover:bg-green-700 rounded"
                                                    >
                                                        {child.name}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (!item.href) {
                                return null;
                            }

                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigation(item.href as string);
                                    }}
                                    className="text-white hover:text-gray-300 text-lg transition-transform duration-300 transform hover:scale-105"
                                >
                                    {item.name}
                                </a>
                            );
                        })}

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
                            {user == null ? (
                                <LoginButton mode="dark" />
                            ) : (
                                <AccountButton mode="dark" />
                            )}
                            <LanguageSwitch />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
