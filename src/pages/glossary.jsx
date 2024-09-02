import Layout from "@theme/Layout";
import { useState, useEffect } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import React from "react";


const App = () => {
  const glossarys = [
    {
      id: 1,
      title: "API gateway",
      content:
        "An API gateway is a crucial component in modern software development and architecture, often described as the 'front door' for applications to access data and functionalities from backend services. It serves as an intermediary between client applications and backend services, managing complex operations such as request routing, authorization, monitoring, and traffic management.",
    },
    {
      id: 2,
      title: "Accessibility",
      content:
        "Accessibility is a practice centered around inclusivity, aiming to design products, services, and environments that are usable by everyone. It's not just about accommodating people with disabilities; it also focuses on enhancing the user experience for all individuals. This includes those using mobile devices or those with slow internet connections. It's a moral and legal responsibility for developers and designers to ensure their work is accessible.",
    },
    {
      id: 3,
      title: "Angular",
      content:
        "Angular is an open-source JavaScript framework, developed and maintained by Google, that provides a standard structure and additional features to simplify web and mobile application development.",
    },
    {
      id: 4,
      title: "Backend as a Service",
      content:
        "Backend as a Service (BaaS) is a cloud computing model that simplifies app development, offering efficiency, scalability, and cost-effective solutions for developers.",
    },
    {
      id: 5,
      title: "Cache invalidation",
      content:
        "Cache invalidation is a critical process in computer systems that ensures the removal or updating of stale data, enhancing performance and accuracy.",
    },
    {
      id: 6,
      title: "Client Side Rendering (CSR)",
      content:
        "Client Side Rendering (CSR) is a pivotal aspect of modern web development, ensuring a seamless and interactive user experience by rendering content in the browser.",
    },
    {
      id: 6,
      title: "Dlient Side Rendering (CSR)",
      content:
        "Client Side Rendering (CSR) is a pivotal aspect of modern web development, ensuring a seamless and interactive user experience by rendering content in the browser.",
    },
  ];

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
          <h1 className="md:text-5xl mb-4 font-bold text-4xl text-indigo-500">Macrometa Glossary</h1>
          <p className="md:text-center md:w-[700px] w-full text-gray-700 md:text-[20px] text-[22px]">
           Essential terminologies for understanding Macrometa's advanced technological framework. Let this be your guide to the edge computing
            world.
          </p>
        </div>

        <nav
          className={`overflow-x-auto py-2 ${isFixed ? "fixed top-0 left-0 right-0 bg-white shadow-md z-10" : ""
            }`}
        >
          <ul className="flex gap-2 lg:justify-center justify-start text-[14px] whitespace-nowrap">
            {/* Display all letters from A to Z */}
            {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(
              (letter) => (
                <li
                  key={letter}
                  className={`rounded-full p-4 w-8 h-8 flex items-center justify-center cursor-pointer ${activeLetter === letter
                      ? "border border-gray-700 bg-gray-700 text-white"
                      : "text-gray-700"
                    } ${usedLetters.includes(letter)
                      ? "cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                    }`}
                  onClick={() =>
                    usedLetters.includes(letter) && scrollToLetter(letter)
                  } // Only scroll if the letter is used
                >
                  {letter}
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="my-10 mb-20">
          <div className="mb-4 flex items-center justify-between gap-36">
            <div className="lg:flex hidden flex-col gap-1 text-nowrap">
              <p className="flex text-nowrap items-center gap-1 font-semibold text-indigo-500">
                <span>
                  <IoBookOutline />
                </span>
                All glossary items
              </p>
              <div className="w-5 h-[1px] bg-gray-400"></div>
            </div>
            <div className="sm:mx-16 mx-0 w-full h-[1px] bg-gray-500"></div>
          </div>
          <div className="flex lg:gap-36 gap-0">
            <div>
              {glossarys.map((glossary) => {
                const { title, id } = glossary;
                return (
                  <div key={id} className="mt-2">
                    <p className="lg:inline hidden text-nowrap text-gray-700">
                      {title}
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
                  <div key={id} className="flex flex-col gap-1 mb-4 p-3">
                    <h1
                      id={`glossary-${firstLetter}`} // Assign an id to the element
                      className="md:text-3xl text-2xl font-bold mb-2"
                    >
                      {title}
                    </h1>
                    <p className="md:text-[17px] text-[19px] text-gray-700">
                      {content.substring(0, 130)}
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