import { useState, useEffect } from "react";

const SectionSub = ({
  onCountryChange = () => {},
  onCategoryChange = () => {},
  selectedCountry,
  selectedCategory,
}) => {
  const [Category, setCategory] = useState(() => {
    const savedCategory = localStorage.getItem("selectedCategory");

    if (savedCategory != null) {
      return savedCategory;
    }

    return "us";
  });

  const [Country, setCountry] = useState(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry != null) {
      return savedCountry;
    }

    return "general";
  });

  const [news, setNews] = useState([]);
  useEffect(() => {
    // Fetch news based on selected country and category
    const fetchNews = async () => {
      try {
        const apiKey = "6ebc53abe0834d7181ab8e5494f825c3";
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${Country}&category=${Category}&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        onCountryChange(Country);
        onCategoryChange(Category);
        // Store fetched news in state
        // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [Country, Category]);
  console.log(Country);

  // Save To Local Storage the country and category selected by user;

  return (
    <div>
      {/* country */}
      <div
        className="flex justify-center w-full px-20 py-6"
        value={selectedCountry}
      >
        <ul className=" flex gap-10 country">
          <li
            className={`${
              selectedCountry === "us"
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            onClick={() => setCountry("us")}
          >
            United States
          </li>
          <li
            className={`${
              selectedCountry === "gb"
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            onClick={() => setCountry("gb")}
          >
            United Kingdom
          </li>
          <li
            className={`${
              selectedCountry === "ca"
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            onClick={() => setCountry("ca")}
          >
            Canada
          </li>
          <li
            className={`${
              selectedCountry === "au"
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            onClick={() => setCountry("au")}
          >
            Australia
          </li>
        </ul>
      </div>
      {/* catergory */}
      <div
        className="flex justify-center w-full px-20 py-6 "
        value={selectedCategory}
      >
        <ul className=" flex gap-10 category">
          <li
            className={`${
              selectedCategory === "general"
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            onClick={() => onCategoryChange("general")}
          >
            General
          </li>
          <li
            className={`${
              selectedCategory === "business"
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            onClick={() => onCategoryChange("business")}
          >
            Business
          </li>
          <li
            className={`${
              selectedCategory === "entertainment"
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            onClick={() => onCategoryChange("entertainment")}
          >
            Entertainment
          </li>
          <li
            className={`${
              selectedCategory === "science"
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            onClick={() => onCategoryChange("science")}
          >
            Science
          </li>
          <li
            className={`${
              selectedCategory === "sports"
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            onClick={() => onCategoryChange("sports")}
          >
            Sports
          </li>
          <li
            className={`${
              selectedCategory === "technology"
                ? "text-red-300"
                : "hover:text-red-600 hover:transition-all"
            }`}
            onClick={() => onCategoryChange("technology")}
          >
            Technology
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SectionSub;
