import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const handleHamburgerClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between w-full px-16 py-3 fixed z-[1] text-white">
      {/* Logo and Navigation Links */}
      <div className="flex">
        <div className="w-8 py-2 border-4 border-red-500"></div>
        <a href="#" className="font-semibold">
          LUX <span className="font-thin">News</span>{" "}
        </a>
        <ul className="flex gap-8 ml-10">
          <li className="hidden lg:flex">
            {/* <a href="#">About</a> */}
            <Link to={"/brixnews/about"}>About</Link>
          </li>
          <li className="hidden lg:flex">
            <Link to={"/brixnews/channel"}>Channels</Link>
          </li>
        </ul>
      </div>

      {/* Search and Hamburger Icon */}
      <div className="flex gap-8">
        <a
          href="#"
          id="bars-container"
          className={`flex flex-col gap-2  justify-center relative `}
          onClick={handleHamburgerClick}
        >
          <span
            className={`bar bg-white w-7 h-[2px]  ${
              isMenuOpen
                ? "transform -rotate-45 origin-center translate-x-8 -translate-y-1"
                : ""
            }`}
          ></span>

          <span
            className={`bar bg-white w-7 h-[2px] ${
              isMenuOpen
                ? "transform rotate-45 origin-center translate-x-8 -translate-y-3"
                : ""
            }`}
          ></span>
        </a>
      </div>

      {/* Menu Content */}
      <div
        className={`absolute  right-0 top-0  bg-black w-1/2 p-4 transition ease-in-out duration-1000 scroll-smooth   z-[2] ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <div className="mx-auto py-8 ">
          <div className="flex flex-col py-4 overflow-hidden  text-xl text-gray-400 whitespace-nowrap">
            <a
              href="#"
              id="bars-container "
              className={`flex flex-col gap-2  justify-center py-6`}
              onClick={handleHamburgerClick}
            >
              <span
                className={`bar bg-white w-7 h-[2px]  ${
                  isMenuOpen
                    ? "transform -rotate-45 origin-center translate-x-8 -translate-y-1"
                    : ""
                }`}
              ></span>

              <span
                className={`bar bg-white w-7 h-[2px] ${
                  isMenuOpen
                    ? "transform rotate-45 origin-center translate-x-8 -translate-y-3"
                    : ""
                }`}
              ></span>
            </a>
            {/* Add more links as needed */}
            <div className="px-8 flex flex-col gap-5 pt-5 active active:text-white font-semibold">
              <a href="#" className="">
                About
              </a>
              <a href="#" className="">
                Submit A Story
              </a>{" "}
              <a href="#" className="">
                Contact
              </a>{" "}
              <a href="#" className="">
                Terms of Use
              </a>
              <a href="#" className="">
                cookies Policy
              </a>{" "}
              <a href="#" className="">
                Terms and Condition
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Search content */}
    </nav>
  );
};
export default Nav;
