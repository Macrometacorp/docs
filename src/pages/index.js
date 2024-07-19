import React from 'react';
import Layout from '@theme/Layout';
import photoniqicon from '/img/photoniqicon.png'
import gdnicon from '/img/gdnicon.png'
import releasenotes from '/img/releasenotesicon.png'
import tutorials from '/img/tutorials.png'
import support from '/img/supportrequest.png'
import glossary from '/img/glossary.png'
import faq from '/img/faq.png'

export default function Hello() {
  return (
    <Layout title="Home Page" description="Macrometa Home" className="bg-gray-50">
      <div className="mt-20 md:px-20 sm:px-8 md:px-4">
        <div className="  px-8 flex items-center justify-center flex-col gap-3 ">
          <h1 className="font-semibold text-indigo-500 sm:text-4xl text-4xl"> Documentation</h1>
          <p className="text-center text-gray-700 font-medium  sm:text-xl text-[12px] w-2/3">Welcome to the Macrometa Documentation. This page aims to get you started using our suite of products and answer your questions</p>
        </div>
      </div>
     

      <div className="md:px-8 sm:px-6  md:px-4 px-4  my-10">
        <div className=" flex flex-col gap-2 justify-center items-center sm:flex-row my-4 align-center">
          <div className="bg-white shadow-md flex-1 text-center sm:px-4 px-1 sm:py-10 py-6 flex items-center flex-col gap-1 border rounded border-slate-300">
            <img src={photoniqicon} className="text-purple-700 sm:text-2xl mb-3 text-1xl" />
            <h1 className="font-semibold sm:text-[18px] text-[13px] whitespace-nowrap"><a href='https://www.macrometa.com/docs/photoniq/'> Get started with PhotonIQ</a>
            </h1>
            <p className="text-[14px] sm:text-[17px] text-gray-700 w-3/4">Start improving website SEO, search engine rankings, and many more with our PhotonIQ services</p>
          </div>
          <div className="bg-white shadow-md flex-1 text-center sm:px-4 px-2 sm:py-10 py-6 flex items-center flex-col gap-1 border rounded border-slate-300">
          <img src={gdnicon} className="text-purple-700 sm:text-2xl mb-3 text-1xl" />
            <h1 className="font-semibold sm:text-[18px] text-[13px] whitespace-nowrap"><a href='https://www.macrometa.com/docs/'>Build and Deploy with Macrometa GDN</a>
            </h1>
            <p className="text-[14px] sm:text-[17px] text-gray-700 w-3/4">Start building and deploying globally available applications with our edge network to over 175 countries</p>
            <a href='/index'/>
          </div>
        </div>




          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
            <div className=" bg-white shadow-md border rounded border-slate-300 px-2 sm:py-10 py-6 flex items-center text-center flex-col gap-1">
            <img src={tutorials} className="text-purple-700 sm:text-2xl mb-3 text-1xl" />
              <h1 className="font-semibold sm:text-[16px] text-[9px] whitespace-nowrap"><a href='https://www.macrometa.com/docs/tutorials/'>Tutorials</a></h1>
              <p className='text-gray-700'>Learn from our tutorials and start building</p>
            </div>

            <div className="bg-white shadow-md border rounded border-slate-300 px-2 sm:py-10 py-6 flex items-center text-center flex-col gap-1">
            <img src={glossary} className="text-purple-700 sm:text-2xl mb-3 text-1xl" />
              <h1 className="font-semibold sm:text-[16px] text-[9px] whitespace-nowrap"><a href='https://www.macrometa.com/docs/references/glossary'>Glossary</a></h1>
              <p className='text-gray-700'>Learn and know our product language to ensure seamless use.</p>
            </div>

            <div className="bg-white shadow-md border rounded border-slate-300 px-2 sm:py-10 py-6 flex items-center text-center flex-col gap-1">
            <img src={faq} className="text-purple-700 sm:text-2xl mb-3 text-1xl" />
              <h1 className="font-semibold sm:text-[16px] text-[9px] whitespace-nowrap"><a href='https://support.macrometa.com/hc/en-us/articles/15797660147597-Playground-Support-in-Community-Slack'>FAQs</a></h1>
              <p className='text-gray-700'>Learn while getting answers to your questions</p>
            </div>

            <div className="bg-white shadow-md border rounded border-slate-300 px-2 sm:py-10 py-6 flex items-center text-center flex-col gap-1">
            <img src={releasenotes} className="text-purple-700 sm:text-2xl mb-3 text-1xl" />
              <h1 className="font-semibold sm:text-[16px] text-[9px] whitespace-nowrap"><a href='https://www.macrometa.com/docs/release-notes/'>Release Notes</a></h1>
              <p className='text-gray-700'>Get all the information on our latest releases</p>
            </div>
          </div>



          <div className="my-10 bg-white p-3">
            <div className="flex items-center gap-2 justify-center shadow-md bg-white rounded border-slate-300 px-2 sm:py-2 py-4 flex items-center text-center flex-row gap-1 sm:flex-row">
            <img src={support} className=''/>
                <h1 className="flex items-center gap-4 text-gray-700 text-lg">Still need help?<span className="black font-semibold text-indigo-500 sm:text-[15px] text-[13px]"><a href='https://support.macrometa.com/hc/en-us/requests/new?'>Submit and request</a></span></h1>
            </div>
          </div>

          
      </div>
    
      </Layout>

  );
}