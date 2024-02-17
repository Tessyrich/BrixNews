import { useState } from "react";

import "./App.css";
import Sectionmain from "./components/sectionmain";

function App() {
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedCategory, setSelectedCategory] = useState("general");

  const handleCountryChange = (newCountry) => {
    setSelectedCountry(newCountry);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  return (
    <>
      <div className=" dark:bg-gray-950 dark:text-white h-full">
        <Sectionmain
          selectedCountry={selectedCountry}
          selectedCategory={selectedCategory}
        />
      </div>
    </>
  );
}

export default App;
