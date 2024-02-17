import React from "react";
import axios from "axios";
import Nav from "./nav";
import { InfinitySpin } from "react-loader-spinner";
import Bgimage from "../assets/bgimage.jpg";
import { useState, useEffect } from "react";
import SectionSub from "./SessionSub";

const Sectionmain = ({ onCountryChange, onCategoryChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);
  console.log("News:", news);
  const [SearchNews, setSearchNews] = useState([]);
  const [page, setPage] = useState(1);
  const [isSearchLoading, setisSearchLoading] = useState(true);
  const [SearchQuery, setSearchQuery] = useState("bitcoin");
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedCategory, setSelectedCategory] = useState("general");
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

    // Main news data
    const getTopHeadLines = async () => {
      setIsLoading(true);
      const params = {
        country: selectedCountry, // Use selectedCountry from props
        category: selectedCategory,
        page,
        apiKey,
      };
      // Country, Category,

      const response = await axios.get(
        "https://mocki.io/v1/2efd4a0e-3021-4569-8010-8a66569d9d56",
        {
          params,
        }
      );
      console.log(response);
      setNews(response.data.articles);

      setIsLoading(false);
    };

    // FOR Searching a particular news
    const searchForArticles = async () => {
      if (SearchQuery) {
        setisSearchLoading(true);
        const params = {
          selectedCategory,
          selectedCountry,
          q: SearchQuery,
          pageSize: 25,
          apiKey,
        };
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params,
        });
        setSearchNews(response.data.article);

        setSearchNews(false);
      }
    };

    // CALL FUNCTIONS
    getTopHeadLines();
    searchForArticles();

    // Body Toggle
    const body = document.querySelector("body");
    isDarkMode ? body.classList.add("dark") : body.classList.remove("dark");
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [selectedCategory, selectedCountry, SearchQuery, page, isDarkMode]);

  // Category, Country,~
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  //   FUNCTION FOR SEARCH

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  //   Function For Page Change
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="relative  w-full">
      <Nav />
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
      <SectionSub
        onCountryChange={handleCountryChange}
        onCategoryChange={handleCategoryChange}
        selectedCountry={selectedCountry}
        selectedCategory={selectedCategory}
      />
      {/* Where news update is */}

      <div className="w-full flex">
        <div className="w-full grid grid-col">
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <InfinitySpin color="#dc2626" width={100} />
            </div>
          ) : (
            // Your news.map logic here
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
