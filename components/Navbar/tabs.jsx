// Import necessary modules and components

"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo.jsx";
import Link from "next/link.js";
import Image from "next/image.js";
import MobileMenu from "../mobileMenu/index.jsx";
import Marquee from "react-fast-marquee";
import DropDown from "../../components/DropdownMenu.jsx";
// Define SlideTabsExample component
export const SlideTabsExample = () => {
  return (
    <div className="bg-[#676662]  pt-8 pb-2 flex mx-auto left-[40%]   justify-center  items-center fixed  w-[100%] z-[999999]">
      <div className="marquee fixed bg-white notice-modal mx-auto w-[100vw] rounded-[5px] py-1   flex flex-row p-1 bg-whote  justify-center top-0">
        <div className="flex justify-center">
          <Marquee>
            <b className="text-center text-[12px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam veritatis
            </b>
          </Marquee>
        </div>
      </div>
      <div className="Logo-section w-1/2 sm:w-[15%]  flex justify-center">
        <Logo />
      </div>
      <div className="mobile-menu block sm:hidden w-1/2"></div>
      <div className="Logo-section hidden sm:block w-[60%] ">
        <DropDown />
      </div>
      <div className="Logo-section   flex justify-center items-center w-[20%] ">
        <div className="absolute right-0 top-4 z-[99999999999989899999999999999]">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

// Define SlideTabs component
const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((prevPosition) => ({
          ...prevPosition,
          opacity: 0,
        }));
      }}
      className="relative mx-auto md:flex w-fit  rounded-full bg-white p-1   hidden "
    >
      {/* Render each tab with dynamic properties */}

      {/* Render the cursor with its position animated */}
      <Cursor position={position} />
    </ul>
  );
};

// Define Tab component
const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (ref.current) {
          const { width } = ref.current.getBoundingClientRect();
          setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
        }
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-[13.8px] uppercase text-white mix-blend-difference md:px-5 md:py-1 "
    >
      {children}
    </li>
  );
};

// Define Cursor component
const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-3 rounded-full bg-black md:h-7"
    />
  );
};
