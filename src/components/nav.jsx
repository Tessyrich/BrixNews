import React, { useState } from "react";

const Nav = ({ handleSearchSubmit, setSearchQuery }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleHamburgerClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleSearchClick = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmitClick = (event) => {
    if (event) {
      event.preventDefault();
    }

    setSearchQuery(searchInput);
    handleSearchSubmit();
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  console.log(searchInput);

  return (
    <nav className="flex justify-between w-full px-16 py-3 fixed z-[1] text-white">
      {/* Your existing navigation content */}
      <div className="flex">
        <div className="w-8 py-2 border-4 border-red-500"></div>
        <a href="#" className="font-semibold">
          LUX <span className="font-thin">News</span>{" "}
        </a>
        <ul className="flex gap-8 ml-10">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Channels</a>
          </li>
        </ul>
      </div>

      {/* Search and Hamburger Icon */}
      <div className="flex gap-8">
        <a href="#" onClick={handleSearchClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </a>

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
          <div className="flex flex-col py-4 overflow-hidden   text-3xl text-gray-400 whitespace-nowrap">
            <a
              href="#"
              id="bars-container "
              className={`flex flex-col gap-2  justify-center `}
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
            <a href="#" className="active active:text-white font-bold">
              About
            </a>
            <a href="#" className="active active:text-white font-bold">
              Submit A Story
            </a>{" "}
            <a href="#" className="active active:text-white font-bold">
              Contact
            </a>{" "}
            <a href="#" className="active active:text-white font-bold">
              Terms of Use
            </a>
            <a href="#" className="active active:text-white font-bold">
              cookies Policy
            </a>{" "}
            <a href="#" className="active active:text-white font-bold">
              Terms and Condition
            </a>
          </div>
        </div>
      </div>

      {/* Search content */}
      <div
        className={`flex gap-6 absolute  left-0 w-full bg-black px-20 py-4 transition-transform transform origin-top-right z-[2] ${
          isSearchOpen ? "" : "hidden"
        }`}
      >
        <a href="#" onClick={handleSearchClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </a>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          className="focus:outline-none focus:border-b  bg-transparent text-white"
        />
        <button onSubmit={(e) => handleSearchSubmitClick(e)}>Search</button>
      </div>
    </nav>
  );
};

export default Nav;
