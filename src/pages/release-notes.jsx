import Layout from "@theme/Layout";
import React, { useState } from "react";
import Markdown from "react-markdown";


const App = () => {
  const [selectedTag, setSelectedTag] = useState("All");

  const notes = [
    {
      id: 8, date: "March, 2025", tag: "Workspaces", Product: "Workspaces v1.2.3", whatsnew: "What's new",
      whatsNewContents: [], 
      Improvement: "Improvement", improvementContents: ["Cloud Workspaces Client: Improve the Workspaces Client to allow users to launch the Native VDI client externally.", "VDI Networking: Update VDI networking to improve file downloading for large projects."],
       bugFix: "Bug fixes", bugFixContents: [],
      deprecation: "Deprecations", deprecationContents: [],
      dynamicText: "See the links to",
       blogPostTitle1: "download the latest MAC", blogPostLink1:"https://d1fmld87hoi9ya.cloudfront.net/installers/release/mac/vdi/MacrometaVDIInstaller-v1.2.3.pkg",
       blogPostTitle2: "Windows native client installer", blogPostLink2: "https://d1fmld87hoi9ya.cloudfront.net/installers/release/win/vdi/MacrometaVDIInstaller-v1.2.3.exe"
      },
    {
      id: 7, date: "February, 2025", tag: "Workspaces", Product: "Workspaces v1.2.2", whatsnew: "What's new",
      whatsNewContents: ["Workspaces Assistant: Maximize Workspaces with help from Workspaces Assistant, an AI-powered chatbot that answers all your questions and helps you navigate the Workspaces toolbox."], 
      Improvement: "Improvement", improvementContents: ["Mac Native Client: MacOS users can launch their virtual desktops with the VDI native client, offering them more options for using the Workspaces environment. While this feature works seamlessly for Chrome and Firefox browsers, Safari users may encounter an issue and are advised to use other browsers while we work on a fix which will be available in a subsequent release."],
       bugFix: "Bug fixes", bugFixContents: [],
      deprecation: "Deprecations", deprecationContents: [],
      dynamicText: "To start using the service,",
       blogPostTitle1: "see our Cloud Workspaces quickstart guide", blogPostLink1:"https://www.macrometa.com/docs/workspaces/workspace-management",
      },
    {
      id: 7, date: "February, 2025", tag: "Workspaces", Product: "Workspaces v1.2.1", whatsnew: "What's new",
      whatsNewContents: ["User Feedback: Use this feedback survey to provide feedback on your experience using Cloud Workspaces to help improve your experience "], 
      Improvement: "Improvement", improvementContents: ["Analytics reporting: Addition of VDI User metrics for granular-level reporting. Admin users can find this data under the `Users` section of the `Desktop and Users` tab in Admin management. "],
       bugFix: "Bug fixes", bugFixContents: [],
      deprecation: "Deprecations", deprecationContents: [],
      dynamicText: "To know more,",
       blogPostTitle1: "see how the Workspaces analytics page helps admin users to monitor usage", blogPostLink1:"https://www.macrometa.com/docs/workspaces/analytics",
      },
    {
      id: 6, date: "February, 2025", tag: "Workspaces", Product: "Workspaces v1.2.0", whatsnew: "What's new",
      whatsNewContents: [ "Analytics for monitoring: The new Workspaces now offers an analytics dashboard for administrative users to track and monitor the performance of your VDIs. By filtering through variables like assigned and unassigned users and used desktops, these users can now track and optimize the use of their Workspaces tools.", "VDI USB Support for access management: This version features a pop-up screen that enables VDI users to enable/disable drives and other mass storage devices to access their VDI remote sessions. Thus, it prevents the mounting of unauthorized storage devices that could corrupt virtual desktops."], 
      Improvement: "Improvement", improvementContents: ["User reboot button: Reboot your VDI sessions with the new reboot button in case of any interruptions.", "Faster performance and improved user experience: Upload large files to your virtual desktops without worrying about performance lags or interruptions to your current session. " ],
       bugFix: "Bug fixes", bugFixContents: [],
      deprecation: "Deprecations", deprecationContents: [],
      dynamicText: "",
       blogPostTitle1: "Check out our guide to using Cloud Workspaces", blogPostLink1:"https://www.macrometa.com/docs/workspaces/workspace-management",
      },
    {
      id: 5, date: "January, 2025", tag: "PhotonIQ", Product: "EDS v2.1", whatsnew: "What's new",
      whatsNewContents: [ "C8QL Query Support: This new version allows you to query and filter your data using C8QL, an alternative GDN query language to interact with your organizational data", "Additional flag to specify whether or not to return query with the query results ."], 
      Improvement: "Improvement", improvementContents: [],
       bugFix: "Bug fixes", bugFixContents: [],
      deprecation: "Deprecations", deprecationContents: ["Event publishing API no longer supported"],
      dynamicText: "",
       blogPostTitle1: "Follow the event service quickstart guide to begin", blogPostLink1:"https://www.macrometa.com/docs/photoniq/event-delivery/getting-started-event-delivery",
      },
    {
      id: 4, date: "December 30, 2024", tag: "Workspaces", Product: "Workspaces v1.1.0",
      whatsnew: "What's new", whatsNewContents: ["User and Host Management in Workspace: Workspace admins can now manage users and hosts(VDIs) more effectively to optimize resource allocation. The new `Users & Hosts` dashboard allows admins to assign or unassign users to specific hosts, reassign VDIs to other users, and filter hosts by assignment status or type.", "Added functionality to ensure each user is assigned a single host."],
      Improvement: "Improvement", improvementContents: ["Enhanced performance on the admin page by adding indexes to the `sessions` and `session_assignments` , enabling faster filtering and query execution."],
      bugFix: "Bug fixes", bugFixContents: [],
      deprecation: "Deprecations", deprecationContents: [],
      dynamicText: "Check out",
      blogPostTitle1:"our Workspaces Admin guide" , blogPostLink1: "https://www.macrometa.com/docs/workspaces/workspace-management",

 },
    {
      id: 3, date: "September, 2024", tag: "PhotonIQ", Product: "Prerender v1.2.4",
      whatsNewContents: [],
      Improvement: "Improvement", improvementContents: [ "Security updates: Enhanced security protocols for better data safety, security and performance."],
      bugFix: "Bug fixes", bugFixContents: [],
      deprecation: "Deprecations", deprecationContents: [],
      dynamicText: "",
      blogPostTitle1: "See the Prerender documentation to get started" , blogPostLink1: "https://www.macrometa.com/docs/photoniq/prerendering",

 },
    {
      id: 2, date: "August 16, 2024", tag: "PhotonIQ", Product: "Prerender v1.2.1", whatsnew: "What's new",
      whatsNewContents: [ "Connection: use our new Sync service for better connection and fault tolerance. Consolidate multiple Prerender services into a single WebSocket connection with the Sync service to reduce network overhead and improve performance.", "Authentication: Auth service for role-based access control. Manage and control access to the service to improve security and ease future auditing processes.", "Configuration: Editable GUI for better configuration management. This GUI also democratizes access to the service, ensuring technical and non-technical users use and manage their Prerender instance.", "Flexibility: Added Follow Redirect settings to manage redirect behavior. Achieve better flexibility by defining how the Prerender handles your redirects."],
      Improvement: "Improvement", improvementContents: [ "Resource consumption: Improve resource efficiency by reducing the load on the GDN server by aggregating and serving metrics every minute instead of pushing per request.", "Security: Reduce the occurrence of malware and phishing attacks with our newly added URL tags to the URL block list.", "Auditing: Prevent the complete removal of previous renders with the removal of the entire cache purge feature." ],
      bugFix: "Bug fixes", bugFixContents: [],
      deprecation: "Deprecations", deprecationContents: [],
      dynamicText: "See our",
      blogPostTitle1:"latest Prerender v1.2.1 blog post for more information on the benefits" , blogPostLink1: "https://www.macrometa.com/blog/photoniq-prerender-v1-2-2-update",

 },

    {
      id: 1, date: "February - May, 2024", tag: "GDN", Product: "GDN v0.18.0 ", whatsnew: "What's new",
      whatsNewContents: [ "Create collections with strong consistency.", "Improvements to the web console for better management.", "New AWS S4 target for connection", "New API endpoint to Stream workers", "New Global API endpoint to Fabrics" ], 
      Improvement: "Improvement", improvementContents: [ "New Group ID API Endpoints", "Enhanced Error Handling for Stream Workers", "Stream workers support for all collection types.", "Addition of Akamai EdgeWorkers code bundles" ],
       bugFix: "Bug fixes", bugFixContents: ["Corrected field order and capitalization on the Invite User signup page.", "Delete subscriptions only at stream worker deletion, not unpublish.", "Fixed Regex for http.status.code in http-call-response function."],
       deprecation: "Deprecations", deprecationContents: [],
       dynamicText: "Check out",
       blogPostTitle1: "our GDN v0.18.0 release page for more information", blogPostLink1:"https://www.macrometa.com/docs/release-notes/release-notes-0-18-0",
      },
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

          <li className={`list-none py-[4px] px-[8px] text-[14px] rounded-md cursor-pointer ${
              selectedTag === "Workspaces" ? "bg-[#6767E5] text-white" : "bg-[#edf0f2] text-[#687887]" }`}
            onClick={() => setSelectedTag("Workspaces")}> Workspaces </li>
        </ul>
      </header>
      <div className="mt-6">
        <div className="pb-20 md:pb-24 w-full max-w-screen-xl xl:mx-auto">
          <div className="relative min-h-[600px] w-full">
            <div className="absolute bottom-0 left-0 top-2 w-[2px] bg-[#6767E5] md:left-[25%] after:absolute after:inset-x-0 after:bottom-0 after:h-48 after:bg-gradient-to-b after:from-gray-100 after:to-white"></div>
            {filteredNotes.map((note) => {
              let { id, date, tag, Product, whatsnew, whatsNewContents, Improvement, improvementContents, bugFix, bugFixContents, deprecation, deprecationContents, blogPostTitle1, blogPostLink1, blogPostTitle2, blogPostLink2, dynamicText } = note;
              return (
                <div key={id} className="ml-3 grid grid-cols-1 pb-20 md:ml-0 md:grid-cols-4" >
                  <div className="relative col-span-1 mb-4 flex flex-row items-center justify-between md:mb-0 md:flex-col md:items-start md:justify-start">
                    <div className=" md:mb-1 whitespace-nowrap">
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
                      
                      {whatsNewContents.length > 0 && (
                      <div className="font-bold">{whatsnew}</div>
                      )}
                      <div className="flex flex-col gap-y-3">
                        <div className="text-base">
                          {whatsNewContents.map((whatsNewContent, index) => (
                            <ul key={index} className="ml-3">
                              <li className="relative text-[16px] before:absolute before:-left-6 before:top-2 before:h-2 before:w-2 before:rounded-full before:border-2 before:border-gray-300">
                               <Markdown>{whatsNewContent}</Markdown>
                              </li>
                            </ul>
                          ))}
                        </div>
                      </div>

                      {improvementContents.length > 0 && (
                      <div className="font-bold">{Improvement}</div>
                      )}
                      <div className="flex flex-col gap-y-3">
                        <div className="text-base">
                          {improvementContents.map(
                            (improvementContent, index) => (
                              <ul key={index} className="ml-3">
                                <li className="relative text-[16px] before:absolute before:-left-6 before:top-2 before:h-2 before:w-2 before:rounded-full before:border-2 before:border-gray-300">
                                   <Markdown>{improvementContent}</Markdown>
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
                                <Markdown>{bugFixContent}</Markdown>
                              </li>
                            </ul>
                          ))}
                        </div>
                      </div>
                      {deprecationContents.length > 0 && (
                      <div className="font-bold">{deprecation}</div>
                      )}
                      <div className="flex flex-col gap-y-3">
                        <div className="text-base">
                          {deprecationContents.map((deprecationContent, index) => (
                            <ul key={index} className="ml-3">
                              <li className="relative text-[16px] before:absolute before:-left-6 before:top-2 before:h-2 before:w-2 before:rounded-full before:border-2 before:border-gray-300">
                                <Markdown>{deprecationContent}</Markdown>
                              </li>
                            </ul>
                          ))}
                        </div>
                      </div>
                    </div>


                    {(blogPostLink1 || blogPostLink2) && (
    <p>
        {dynamicText && <>{dynamicText} </>}
        {blogPostLink1 && (
            <>
                <a href={blogPostLink1}>{blogPostTitle1}</a>
            </>
        )}
        {blogPostLink1 && blogPostLink2 && " and "}
        {blogPostLink2 && (
            <>
                <a href={blogPostLink2}>{blogPostTitle2}</a>.
            </>
        )}
    </p>
)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <center class="font-semibold text-[15px]"><p>  To learn more about past releases, see the official <a href="/docs/releases/">Releases pack</a>.</p>
      </center>    
    </div>
    </Layout>
  );
};

export default App;
