// import { useState } from "react";

// import "./App.css";
// import Sectionmain from "./components/sectionmain";
// import Nav from "./components/nav";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// function App() {
//   const [selectedCountry, setSelectedCountry] = useState("us");
//   const [selectedCategory, setSelectedCategory] = useState("general");

//   const handleCountryChange = (newCountry) => {
//     setSelectedCountry(newCountry);
//   };

//   const handleCategoryChange = (newCategory) => {
//     setSelectedCategory(newCategory);
//   };

//   return (
//     <>
//       <Router>
//         <div className=" dark:bg-gray-950 dark:text-white h-full">
//           <Nav />
//           <Routes>
//             <Route
//               exact
//               path="/"
//               element={
//                 <Sectionmain
//                   selectedCountry={selectedCountry}
//                   selectedCategory={selectedCategory}
//                 />
//               }
//             />
//             {/* <Route path="/About" element={<About />} /> */}
//           </Routes>
//         </div>
//       </Router>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Mainlayout from "./layout/mainlayout";
import Home from "./pages/Home";
import About from "./pages/AboutUs/index";
import Channel from "./pages/Channel/channel";

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedCategory, setSelectedCategory] = useState("general");

  const handleCountryChange = (newCountry) => {
    setSelectedCountry(newCountry);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  return (
    <BrowserRouter>
      <div className=" dark:bg-gray-950 dark:text-white h-full">
        <Routes>
          <Route element={<Mainlayout />}>
            <Route
              path="/"
              element={
                <Home
                  selectedCountry={selectedCountry}
                  selectedCategory={selectedCategory}
                />
              }
            />
            <Route path="/luxnews/about" element={<About />} />
            <Route path="/luxnews/channel" element={<Channel />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
