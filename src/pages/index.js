import Layout from "@theme/Layout";
import React from "react";
import faq from "/img//faq.png";
import gdnicon from "/img/gdnicon.png";
import glossary from "/img/glossary.png";
import photoniqicon from "/img/photoniqicon.png";
import releasenotes from "/img/releasenotesicon.png";
import support from "/img/supportrequest.png";
import tutorials from "/img/tutorials.png";

const a = [
  {
    title: "Get started with PhotonIQ",
    subtitle: `Improve website SEO, search engine rankings, and many more with PhotonIQ.`,
    href: "https://macrometa.com/docs/photoniq/",
    icon: photoniqicon,
  },
  {
    title: "Build and deploy with Macrometa GDN",
    subtitle: `Build and deploy globally available applications with our edge network.`,
    href: "https://macrometa.com/docs/",
    icon: gdnicon,
  },
];
const b = [
  {
    title: "Tutorials",
    subtitle: "Learn from our tutorials and start building.",
    href: "https://macrometa.com/docs/tutorials",
    icon: tutorials,
  },
  {
    title: "Glossary",
    subtitle: "Master our product language for seamless use.",
    href: "https://macrometa.com/docs/references/glossary",
    icon: glossary,
  },
  {
    title: "FAQs",
    subtitle: "Learn while getting answers to your questions.",
    href: "https://support.macrometa.com/hc/en-us/articles/15797660147597-Playground-Support-in-Community-Slack",
    icon: faq,
  },
  {
    title: "Release notes",
    subtitle: "Get all the information on our latest releases.",
    href: "https://macrometa.com/docs/release-notes",
    icon: releasenotes,
  },
];

export default function Hello() 
  {
    return (
    <Layout
      title="Home Page"
      description="Macrometa Home"
       wrapperClassName="bg-custom-gray"
    >
      <div className="max-w-[1208px] mt-20 my-20 px-6 mx-auto">
        <div className="px-8 flex items-center justify-center flex-col gap-3 ">
          <h1 className="font-semibold text-indigo-500 sm:text-4xl text-3xl">
            Documentation
          </h1>
          <p className="text-center  sm:text-xl text-[12px] w-2/3 text-lg">
            Welcome to the Macrometa documentation. 
            This page aims to help you get started using our suite of products and to answer any questions you may have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[40px]">
          {a.map((item, i) => (
            <div
              key={i}
              className="card-land flex flex-col text-center justify-center items-center py-[32px] px-[32px] lg:px-[114px] border rounded-2xl border-slate-300 shadow-md"
            >
              <img
                src={item.icon}
                className="text-purple-700 sm:text-2xl text-1xl"
              />
              <h1 className="font-semibold sm:text-[18px] text-[13px] mt-[20px] mb-[4px] text-gray-700 text-lg">
                <a className="text-gray-700" href={item.href}>{item.title}</a>
              </h1>
              <p className="text-[14px] sm:text-[17px] text-gray-600 text-md">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-[40px]">
          {b.map((item, i) => (
            <div
              key={i}
              className=" card-land flex flex-col text-center justify-center items-center py-[32px] px-[21px] rounded-2xl border border-slate-300 shadow-md"
            >
              <img
                src={item.icon}
                className="sm:text-2xl text-1xl"
              />
              <h1 className="font-semibold sm:text-[18px] text-[13px] mt-[20px] mb-[4px] text-gray-600 text-lg">
                <a className="text-gray-700" href={item.href}>{item.title}</a>
              </h1>
              <p className="text-[14px] sm:text-[17px] text-gray-500 text-md">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="card-land flex text-center justify-center items-center py-[32px] rounded-2xl border border-slate-300 shadow-md">
            <img src={support} className="" />
            <h1 className="ml-3 mb-0 items-center text-gray-700 sm:text-[15px] text-[13px] text-md">
              Still need help?
              <a
                href="https://support.macrometa.com/hc/en-us/requests/new?"
                className="help ml-1 text-indigo-500 sm:text-[15px] text-[13px] text-md"
              >
                Submit a request
              </a>
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
