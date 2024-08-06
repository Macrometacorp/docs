import Layout from "@theme/Layout";
import React, { useState } from "react";

const App = () => {
  const [selectedTag, setSelectedTag] = useState("All");

  const notes = [
    {
      id: 1, date: "August 26, 2024", tag: "PhotonIQ", Product: "Prerender v1.2.1", whatsnew: "What's New",
      whatsNewContents: [ "Sync service for better connection and fault tolerance.", "Auth service for role-based access control.", "Editable GUI for better configuration management.", "Added Follow Redirect settings to manage redirect behavior."],
      Improvement: "Improvement", improvementContents: [ "Reduced load on GDN server aggregating and serving metrics every minute instead of pushing per request.", "Added new URL tags to the URL block list.", "Removed the entire cache purge feature." ],
      bugFix: "Bug Fixes", bugFixContents: [],
    },

    {
      id: 2, date: "August 26, 2024", tag: "GDN", Product: "GDN v0.18.0 ", whatsnew: "What's New",
      whatsNewContents: [ "Create collections with strong consistency.", "Improvements to the web console for better management.", "New AWS S4 target for connection", "New API endpoint to Stream workers", "New Global API endpoint to Fabrics" ], 
      Improvement: "Improvement", improvementContents: [ "New Group ID API Endpoints", "Enhanced Error Handling for Stream Workers", "Stream workers support for all collection types.", "Addition of Akamai EdgeWorkers code bundles" ],
       bugFix: "Bug Fixes", bugFixContents: ["Corrected field order and capitalization on the Invite User signup page.", "Delete subscriptions only at stream worker deletion, not unpublish.", "Fixed Regex for http.status.code in http-call-response function."]},
  ];

  const filteredNotes = selectedTag === "All" 
  ? notes 
  : notes.filter((note) => note.tag === selectedTag);
  

  return (
    <Layout>
    <div className="max-w-[1150px] mx-auto px-6 md:px-10 mt-10">
      <header className="flex sm:flex-row flex-col gap-2 sm:items-center justify-between items-start my-14">
        <h1 className="sm:text-4xl text-2xl sm:font-extrabold font-semibold">
          Release Notes
        </h1>
        <ul className="flex items-center gap-3">

          <li className={`list-none py-[4px] px-[8px] text-[14px] rounded-md cursor-pointer ${
              selectedTag === "All"  ? "bg-[#6767E5] text-white"  : "bg-[#edf0f2] text-[#687887]" }`}
              onClick={() => setSelectedTag("All")}> All </li>

          <li className={`list-none py-[4px] px-[8px] text-[14px] rounded-md cursor-pointer ${
               selectedTag === "PhotonIQ" ? "bg-[#6767E5] text-white" : "bg-[#edf0f2] text-[#687887]"}`}
               onClick={() => setSelectedTag("PhotonIQ")} > PhotonIQ </li>

          <li className={`list-none py-[4px] px-[8px] text-[14px] rounded-md cursor-pointer ${
              selectedTag === "GDN" ? "bg-[#6767E5] text-white" : "bg-[#edf0f2] text-[#687887]" }`}
            onClick={() => setSelectedTag("GDN")}> GDN </li>
        </ul>
      </header>
      <div className="mt-6">
        <div className="pb-20 md:pb-24 w-full max-w-screen-xl xl:mx-auto">
          <div className="relative min-h-[600px] w-full">
            <div className="absolute bottom-0 left-0 top-2 w-[2px] bg-[#6767E5] md:left-[25%] after:absolute after:inset-x-0 after:bottom-0 after:h-48 after:bg-gradient-to-b after:from-gray-100 after:to-white"></div>
            {filteredNotes.map((note) => {
              let { id, date, tag, Product, whatsnew, whatsNewContents, Improvement, improvementContents, bugFix, bugFixContents } = note;
              return (
                <div key={id} className="ml-3 grid grid-cols-1 pb-20 md:ml-0 md:grid-cols-4" >
                  <div className="relative col-span-1 mb-4 flex flex-row items-center justify-between md:mb-0 md:flex-col md:items-start md:justify-start">
                    <div className="text-gray-600 md:mb-1 whitespace-nowrap">
                      {date}
                    </div>
                    <span className="bg-[#6767E5] w-fit flex-initial rounded-md px-1.5 py-0.5 text-sm text-gray-100">
                      {tag}
                    </span>
                    <div className="absolute left-[-31px] top-1.5 h-4 w-4 rounded-full border-[2px] border-gray-200 bg-white md:left-auto md:right-[-9px]"></div>
                  </div>

                  <div className="col-span-3 sm:ml-20 ml-0">
                    <h1 className="text-2xl font-semibold">{Product}</h1>
                    <div className="flex flex-col space-y-2 my-4">
                      <div className="font-bold">{whatsnew}</div>
                      <div className="flex flex-col gap-y-3">
                        <div className="text-base">
                          {whatsNewContents.map((whatsNewContent, index) => (
                            <ul key={index} className="ml-3">
                              <li className="relative text-[16px] before:absolute before:-left-6 before:top-2 before:h-2 before:w-2 before:rounded-full before:border-2 before:border-gray-300">
                                {whatsNewContent}
                              </li>
                            </ul>
                          ))}
                        </div>
                      </div>

                      <div className="font-bold">{Improvement}</div>
                      <div className="flex flex-col gap-y-3">
                        <div className="text-base">
                          {improvementContents.map(
                            (improvementContent, index) => (
                              <ul key={index} className="ml-3">
                                <li className="relative text-[16px] before:absolute before:-left-6 before:top-2 before:h-2 before:w-2 before:rounded-full before:border-2 before:border-gray-300">
                                  {improvementContent}
                                </li>
                              </ul>
                            )
                          )}
                        </div>
                      </div>

                      {bugFixContents.length > 0 && (
                      <div className="font-bold">{bugFix}</div>
                      )}
                      <div className="flex flex-col gap-y-3">
                        <div className="text-base">
                          {bugFixContents.map((bugFixContent, index) => (
                            <ul key={index} className="ml-3">
                              <li className="relative text-[16px] before:absolute before:-left-6 before:top-2 before:h-2 before:w-2 before:rounded-full before:border-2 before:border-gray-300">
                                {bugFixContent}
                              </li>
                            </ul>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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