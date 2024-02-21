import React from "react";
import axios from "axios";
import Nav from "./nav";
import { InfinitySpin } from "react-loader-spinner";
import Bgimage from "../assets/bgimage.jpg";
import { useState, useEffect } from "react";
// import SectionSub from "./SessionSub";

const Sectionmain = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchNews, setSearchNews] = useState([]);
  const [page, setPage] = useState(1);
  const [isSearchLoading, setIsSearchLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState(" ");
  const [activeLiCategory, setActiveLiCategory] = useState(null);
  const [activeLiCountry, setActiveLiCountry] = useState(null);

  const [category, setCategory] = useState(() => {
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory != null) {
      return savedCategory;
    }

    return "general";
  });

  const [country, setCountry] = useState(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry != null) {
      return savedCountry;
    }

    return "us";
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("DarkMode");
    if (savedMode != null) {
      return savedMode === true;
    }

    return window.matchMedia("(prefers-color-scheme : dark)").matches;
  });

  //   USE EFFECT FOR CONTROLLING OF API

  useEffect(() => {
    const apiKey = "6ebc53abe0834d7181ab8e5494f825c3";
    console.log("Search Query:", searchQuery);

    // Main news data
    const getTopHeadLines = async () => {
      setIsLoading(true);
      const params = {
        country,
        category,
        page,
        apiKey,
      };

      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params,
      });

      setNews(response.data.articles);

      setIsLoading(false);
    };

    // CALL FUNCTIONS
    getTopHeadLines();

    // FOR Searching a particular news
    const searchForArticles = async () => {
      if (searchQuery) {
        setIsSearchLoading(true);
        const params = {
          q: searchQuery, // Use the actual search query here
          pageSize: 25,
          apiKey,
        };

        try {
          const response = await axios.get(
            "https://newsapi.org/v2/everything",
            {
              params,
            }
          );
          setSearchNews(response.data.articles);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsSearchLoading(false);
        }
      }
    };
    console.log(searchForArticles);
    console.log(isSearching);
    console.log(searchNews);
    // Only call searchForArticles if isSearching is true and there is a valid searchQuery
    if (isSearching && searchQuery) {
      searchForArticles();
    }

    // Save search state to local storage
    localStorage.setItem("isSearching", isSearching.toString());

    // save to localstorage
    localStorage.setItem("selectedCategory", category);
    localStorage.setItem("selectedCountry", country);

    // Body Toggle
    const body = document.querySelector("body");
    isDarkMode ? body.classList.add("dark") : body.classList.remove("dark");
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [category, country, searchQuery, page, isDarkMode, isSearching]);

  // Function for country change
  const handleCountryChange = (e) => {
    setCountry(e.target.getAttribute("value"));
    setActiveLiCountry(e.target);
  };
  // Function for category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.getAttribute("value"));
    setActiveLiCategory(e.target);
  };

  //   FUNCTION FOR SEARCH

  const handleSearchSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
  };
  //   Function For Page Change
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="relative  w-full">
      <Nav
        handleSearchSubmit={handleSearchSubmit}
        setSearchQuery={setSearchQuery}
      />
      <div
        className=" bg-cover bg-center h-[20rem]"
        style={{
          backgroundImage: "url('./src/assets/bgimage.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-75 h-[20rem]"></div>
      <div className="absolute inset-0 flex items-center justify-center h-[20rem] ">
        {/* Your content goes here */}
        <h1 className="text-white text-4xl font-bold">World News Center</h1>
        <button className="" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "🌕" : "🌙"}
        </button>
      </div>
      {/* country */}
      <div
        className="flex justify-center w-full px-20 py-6"
        value={country}
        onClick={handleCountryChange}
      >
        <ul className=" flex gap-10 country">
          <li
            className={`${
              activeLiCountry ===
              document.querySelector("ul.country li:nth-child(1)")
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            value="us"
          >
            United States
          </li>
          <li
            className={`${
              activeLiCountry ===
              document.querySelector("ul.country li:nth-child(2)")
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            value="gb"
          >
            United Kingdom
          </li>
          <li
            className={`${
              activeLiCountry ===
              document.querySelector("ul.country li:nth-child(3)")
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            value="ca"
          >
            Canada
          </li>
          <li
            className={`${
              activeLiCountry ===
              document.querySelector("ul.country li:nth-child(4)")
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            value="au"
          >
            Australia
          </li>
        </ul>
      </div>

      {/* category */}
      <div
        className="flex justify-center w-full px-20 py-6"
        value={category}
        onClick={handleCategoryChange}
      >
        <ul className=" flex gap-10 category">
          <li
            className={`${
              activeLiCategory ===
              document.querySelector("ul.category li:nth-child(1)")
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            value="general"
          >
            General
          </li>
          <li
            className={`${
              activeLiCategory ===
              document.querySelector("ul.category li:nth-child(2)")
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            value="business"
          >
            Business
          </li>
          <li
            className={`${
              activeLiCategory ===
              document.querySelector("ul.category li:nth-child(3)")
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            value="entertainment"
          >
            Entertainment
          </li>
          <li
            className={`${
              activeLiCategory ===
              document.querySelector("ul.category li:nth-child(4)")
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            value="health"
          >
            Health
          </li>
          <li
            className={`${
              activeLiCategory ===
              document.querySelector("ul.category li:nth-child(5)")
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            value="science"
          >
            Science
          </li>
          <li
            className={`${
              activeLiCategory ===
              document.querySelector("ul.category li:nth-child(6)")
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            value="sports"
          >
            Sports
          </li>
          <li
            className={`${
              activeLiCategory ===
              document.querySelector("ul.category li:nth-child(7)")
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            value="technology"
          >
            Technology
          </li>
        </ul>
      </div>

      {/* Where news update is */}

      <div className="w-full flex">
        <div className="w-full grid grid-col">
          {isLoading || (isSearching && isSearchLoading) ? (
            <div className="flex justify-center items-center h-screen">
              <InfinitySpin color="#dc2626" width={100} />
            </div>
          ) : // Your news.map logic here
          isSearching ? (
            searchNews.map((article, index) => (
              <div key={index} className="w-full px-10 py-6">
                <div
                  className="rounded-b-3xl h-lvh w-full overflow-hidden hover:transition-all dark:hover:transition-all shadow-lg"
                  style={{ height: "600px" }}
                >
                  <img
                    className="w-full h-2/3 "
                    src={article.urlToImage ? article.urlToImage : Bgimage}
                    alt={article.title}
                    onError={(e) => {
                      e.target.src = Bgimage;
                    }}
                  />

                  <div className="px-6 py-4 ">
                    <div className="font-bold text-xl">{article.title}</div>
                    <p className="">{article.description}</p>
                  </div>
                  <div className="flex items-baseline justify-between px-6">
                    <div className="text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900 px-3 py-1">
                      {article.source.name}
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferror"
                      className="font-bold text-white bg-rose-500 hover:bg-rose-600 hover:transition-all px-4 py-2"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            news.map((article, index) => (
              <div key={index} className="w-full px-10 py-6">
                <div
                  className="rounded-b-3xl h-lvh w-full overflow-hidden hover:transition-all dark:hover:transition-all shadow-lg"
                  style={{ height: "600px" }}
                >
                  <img
                    className="w-full h-2/3 "
                    src={article.urlToImage ? article.urlToImage : Bgimage}
                    alt={article.title}
                    onError={(e) => {
                      e.target.src = Bgimage;
                    }}
                  />

                  <div className="px-6 py-4 ">
                    <div className="font-bold text-xl">{article.title}</div>
                    <p className="">{article.description}</p>
                  </div>
                  <div className="flex items-baseline justify-between px-6">
                    <div className="text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900 px-3 py-1">
                      {article.source.name}
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferror"
                      className="font-bold text-white bg-rose-500 hover:bg-rose-600 hover:transition-all px-4 py-2"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sectionmain;
