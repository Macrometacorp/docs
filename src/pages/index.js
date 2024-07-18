import React from 'react';
import Layout from '@theme/Layout';
import { GiFlowers } from "react-icons/gi";
import { MdOutlineArrowOutward } from "react-icons/md";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { FaHeadset } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";
import { useState } from "react";

export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
      <div className="mt-20 md:px-20 sm:px-8 md:px-4">
        <div className="  px-8 flex items-center justify-center flex-col gap-3 ">
          <h1 className="font-semibold text-purple-700 sm:text-2xl text-1xl">Documentation</h1>
          <p className="text-center text-gray-500 font-semibold  sm:text-1xl text-[12px]">This page aim to help you use Macrometer products and answer your questions</p>
          <form>
            <div className="relative">
              <HiMiniBars3 className="absolute top-4 left-3"/>
              <input type="text" placeholder="Search on documentation" className="lg:w-[600px] md:w-[400px] sm:w-[300px]  px-10 sm:py-3 py-2 rounded-full shadow-lg"/>
              <IoSearch className="absolute bottom-3 right-3 sm:text-2xl text-1xl text-purple-700"/>
            </div>  
          </form>
        </div>
      </div>
     

      <div className="md:px-20 sm:px-8 md:px-4 px-4  my-10">
        <div className="flex items-center gap-2 justify-between  sm:flex-row flex-col my-4">
          <div className="bg-white shadow-lg flex-1 text-center rounded-lg sm:px-4 px-2 sm:py-10 py-6 flex items-center flex-col gap-1">
            <GiFlowers className="text-purple-700 sm:text-2xl mb-3 text-1xl" />
            <h1 className="font-semibold sm:text-[16px] text-[13px] whitespace-nowrap">
              Getting started with PhotonIq
            </h1>
            <p className="text-[14px] sm:text-[17px]">Learn more about PhotonIq with a quickstart guide.</p>
          </div>
          <div className="bg-white shadow-lg flex-1 text-center rounded-lg sm:px-4 px-2 sm:py-10 py-6 flex items-center flex-col gap-1">
            <GiFlowers className="text-purple-700 sm:text-2xl mb-3 text-1xl" />
            <h1 className="font-semibold sm:text-[16px] text-[13px] whitespace-nowrap">
              Getting started with PhotonIq
            </h1>
            <p className="text-[14px] sm:text-[17px]">Learn more about PhotonIq with a quickstart guide.</p>
          </div>
        </div>




          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
            <div className=" bg-white shadow-lg rounded-lg px-2 sm:py-10 py-6 flex items-center text-center flex-col gap-1">
              <GiFlowers className="text-green-700 sm:text-2xl mb-3 text-1xl"/>
              <h1 className="font-semibold sm:text-[13px] text-[9px] whitespace-nowrap">Getting started with PhotonIq</h1>
              <p>Learn more about PhotonIq with a quickstart guide.</p>
            </div>

            <div className="bg-white shadow-lg rounded-lg px-2 sm:py-10 py-6 flex items-center text-center flex-col gap-1">
              <GiFlowers className="text-orange-700 sm:text-2xl mb-3 text-1xl"/>
              <h1 className="font-semibold sm:text-[13px] text-[9px] whitespace-nowrap">Getting started with PhotonIq</h1>
              <p>Learn more about PhotonIq with a quickstart guide.</p>
            </div>

            <div className="bg-white shadow-lg rounded-lg px-2 sm:py-10 py-6 flex items-center text-center flex-col gap-1">
              <GiFlowers className="text-orange-700 sm:text-2xl mb-3 text-1xl"/>
              <h1 className="font-semibold sm:text-[13px] text-[9px] whitespace-nowrap">Getting started with PhotonIq</h1>
              <p>Learn more about PhotonIq with a quickstart guide.</p>
            </div>

            <div className="bg-white shadow-lg rounded-lg px-2 sm:py-10 py-6 flex items-center text-center flex-col gap-1">
              <GiFlowers className="text-orange-700 sm:text-2xl mb-3 text-1xl"/>
              <h1 className="font-semibold sm:text-[13px] text-[9px] whitespace-nowrap">Getting started with PhotonIq</h1>
              <p>Learn more about PhotonIq with a quickstart guide.</p>
            </div>
          </div>



          <div className="my-10 bg-white shadow-lg rounded-lg p-3">
            <div className="flex items-center gap-2 justify-center">
                <FaHeadset className="text-green-600"/>
                <h1 className="flex items-center gap-2 text-gray-600">Still need help?<span className="black font-semibold text-purple-600 sm:text-[15px] text-[13px]">Submit and request here</span></h1>
            </div>
          </div>

          <div className="flex items-center justify-center flex-col gap-2">
            <h1 className="font-bold text-purple-600">Why Macrometa ?</h1>
            <p className="text-semibold text-gray-700 text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente id distinctio quis, ea voluptatum quidem.</p>
          </div>

          <div className="flex items-center gap-1 sm:flex-row flex-col flex-wrap my-4">
            <div className="bg-white shadow-lg flex-1 text-center rounded-lg px-4 py-14 flex items-center flex-col gap-1">
              <GiFlowers className="text-purple-700 sm:text-2xl mb-3 text-1xl" />
              <h1 className="font-semibold sm:text-[16px] text-[10px] whitespace-nowrap">
                Low Total Cost of Ownership
              </h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, eligendi?.</p>
            </div>
            <div className="bg-white shadow-lg flex-1 text-center rounded-lg px-4 py-14 flex items-center flex-col gap-1">
              <GiFlowers className="text-pink-700 sm:text-2xl mb-3 text-1xl" />
              <h1 className="font-semibold sm:text-[16px] text-[10px] whitespace-nowrap">
                Low-Latency Everywhere
              </h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, asperiores?</p>
            </div>
            <div className="bg-white shadow-lg flex-1 text-center rounded-lg px-4 py-14 flex items-center flex-col gap-1">
              <GiFlowers className="text-pink-700 sm:text-2xl mb-3 text-1xl" />
              <h1 className="font-semibold sm:text-[16px] text-[10px] whitespace-nowrap">
                Faster Time-to-Production
              </h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, asperiores?</p>
            </div>
        </div>
      </div>
    
      </Layout>

  );
}