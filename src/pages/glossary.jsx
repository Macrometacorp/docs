import Layout from "@theme/Layout";
import React, { useEffect, useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import glossaryData from "../data/glossaryData";
import Markdown from 'react-markdown';


const glossarys = glossaryData.sort((a, b) => a.title.localeCompare(b.title));

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const App = () => {
  // State to track the active letter and scroll position
  const [activeLetter, setActiveLetter] = useState("A"); // Initialize with 'A'
  const [isFixed, setIsFixed] = useState(false);

  // Get unique letters from glossary terms
  const usedLetters = Array.from(
    new Set(glossarys.map((g) => g.title[0].toUpperCase()))
  );

  // Function to handle scrolling to a specific letter
  const scrollToLetter = (letter) => {
    const element = document.getElementById(`glossary-${letter}`);
    if (element) {
      // Calculate the offset to account for the fixed header height
      const headerHeight = document.querySelector("nav").offsetHeight; // or use a fixed value if the height is known
      const offset = headerHeight + 20; // 20px for some additional spacing, adjust as needed

      window.scrollTo({
        top: element.offsetTop - offset, // Adjust scroll position
        behavior: "smooth",
      });

      setActiveLetter(letter); // Set the active letter
    }
  };

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 60) {
        // Adjust the threshold as needed
        setIsFixed(true);
      } else {
        setIsFixed(false);
        if (scrollPosition === 0) {
          setActiveLetter("A"); // Reset active letter to "A" when scrolled back to the very top
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout
      title="Glossary"
      description="Macrometa Glossary"
      wrapperClassName="bg-custom-gray"
    >
      <div className="lg:px-16 px-6">
        <div className="mt-20 mb-12 flex gap-2 flex-col md:items-center items-start">
          <h1 className="md:text-5xl mb-4 font-bold text-4xl text-indigo-500">
            Macrometa Glossary
          </h1>
          <p className="md:text-center md:w-[700px] w-full md:text-[20px] text-[22px]">
            Essential terminologies for understanding and working with
            Macrometa's services. Let this be your guide to the edge computing
            world.
          </p>
        </div>

        <nav 
          className={`custom-nav overflow-x-auto py-2 ${
          isFixed
          ? "fixed top-14 md:py-4 mt-0 py-2 left-0 right-0 bg-white shadow-lg z-10"
          : ""
          }`}
        >
          <ul className="flex gap-2 lg:justify-center justify-start text-[14px] whitespace-nowrap">
            {/* Display all letters from A to Z */}
            {Array.from({ length: 26 }, (_, i) =>
              String.fromCharCode(65 + i)
            ).map((letter) => (
              <li
                key={letter}
                className={`rounded-full p-4 w-8 h-8 flex items-center justify-center cursor-pointer ${
                  activeLetter === letter
                    ? "border border-indigo-500 bg-indigo-500 text-white"
                    : ""
                } ${
                  usedLetters.includes(letter)
                    ? "cursor-pointer"
                    : "text-disable cursor-not-allowed"
                }`}
                onClick={() =>
                  usedLetters.includes(letter) && scrollToLetter(letter)
                } // Only scroll if the letter is used
              >
                {letter}
              </li>
            ))}
          </ul>
        </nav>

        <div className="my-10 mb-20">
          <div className="mb-4 flex items-center justify-between ">
            <div className="lg:flex hidden flex-col gap-1 text-nowrap">
              <h1 className="flex text-nowrap items-center w-full text-[17px] gap-1 font-semibold text-indigo-500">
                <span>
                  <IoBookOutline size={18} />
                </span>
                All glossary terms
              </h1>
              <div className="w-5 h-[1px] bg-gray-400"></div>
            </div>
            <div className="sm:mx-16 mx-0 w-[900px] h-[1px] bg-gray-500"></div>
          </div>
          <div className="flex lg:gap-36 gap-0">
            <div>
              {glossarys.map((glossary) => {
                const { title, id } = glossary;
                return (
                  <div key={id} className="mt-2">
                    <p className="lg:inline hidden text-nowrap">
                      {capitalizeFirstLetter(title)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="w-[650px]">
              {glossarys.map((glossary) => {
                const { content, title, id } = glossary;
                const firstLetter = title[0].toUpperCase(); // Get the first letter of the title
                return (
                  <div key={id} className="flex flex-col gap-1 mb-2 p-3">
                    <h1
                      id={`glossary-${firstLetter}`} // Assign an id to the element
                      className="md:text-3xl text-2xl font-bold mb-1"
                    >
                      {capitalizeFirstLetter(title)}
                    </h1>
                    <p className="md:text-[17px] text-[19px]">
                    <Markdown>{content}</Markdown>

                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
