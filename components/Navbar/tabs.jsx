// Import necessary modules and components

"use client";
import React, { useRef, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import NavbarMobile from "../../components/NavbarTestSideBar";
import { motion } from "framer-motion";
import Logo from "./Logo.jsx";
import Image from "next/image.js";
import Navbar01 from "../../components/NavbarTest.jsx";
import SidebarNav from "../../components/SideBar.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

// import MobileMenu from "../mobileMenu/index.jsx";
import Marquee from "react-fast-marquee";
import DropDown from "../../components/DropdownMenu.jsx";
// Define SlideTabsExample component
export const SlideTabsExample = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <>
      <div className="top-0 mt-[-40px]  pt-8 pb-2 flex mx-auto left-[40%]   justify-center bg-white flex-col items-center fixed  w-[100%] z-[999999]">
        <div className="top px-2 sm:px-10  lg:bg-[#fff] flex justify-center items-center w-full py-1">
          <div className=" hidden w-1/2 sm:w-[15%]  sm:flex justify-center">
            <Logo />
          </div>

          <div className="Logo-section   sm:block flex justify-center flex-row w-[100%] ">
            <div className="w-1/3 flex justify-center">
              <Navbar
                className="!bg-transparent !backdrop-blur-0 block sm:hidden"
                onMenuOpenChange={setIsMenuOpen}
              >
                <NavbarContent
                  className="hidden sm:flex  gap-4"
                  justify="center"
                >
                  <NavbarItem>
                    <Link color="foreground" href="#">
                      Features
                    </Link>
                  </NavbarItem>
                  <NavbarItem isActive>
                    <Link aria-current="page" href="#">
                      Customers
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link color="foreground" href="#">
                      Integrations
                    </Link>
                  </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                  <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden !pt-4"
                  />
                </NavbarContent>
                <NavbarMenu className="!pt-20">
                  <NavbarMobile />
                </NavbarMenu>
              </Navbar>
            </div>
            <div className="w-1/3 flex justify-center">
              <Navbar
                className="!bg-transparent ml-3 !backdrop-blur-0 block mx-auto sm:hidden"
                onMenuOpenChange={setIsMenuOpen}
              >
                {" "}
                <NavbarContent>
                  <NavbarBrand>
                    <Logo />
                  </NavbarBrand>
                </NavbarContent>
              </Navbar>
            </div>
            <div className="w-1/3 flex justify-center items-center">
              <a href="https://starislandbaby.com/test/cart">
                {" "}
                <Image
                  src="/images/online-shopping.png"
                  placeholder="empty"
                  className="w-[34px] mt-4 h-[34px] block sm:hidden"
                  width={40}
                  height={40}
                  alt="cart-logo"
                  loading="lazy"
                ></Image>
              </a>
            </div>

            {/* */}
            <div className=" hidden lg:flex w-1/2 mx-auto justify-around">
              <div className="flex pt-4 pb-2 justify-center">
                <Swiper
                  direction="vertical"
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  loop={true}
                  className="h-[20px]  justify-center flex items-center"
                  modules={[Autoplay]}
                >
                  <SwiperSlide className="flex justify-center">
                    <div className="text-center text-[14.5px]">
                      全館單筆消費|滿999享單次超取免運
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="flex justify-center">
                    <div className="text-center text-[14.5px]">
                      點我加入官方line
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="flex justify-center">
                    <div className="text-center text-[14.5px]">
                      當月小壽星|快來領生日禮🎂
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="Logo-section pr-8   flex justify-center items-center w-[10%] ">
            <div className="icon-wrap hidden lg:flex  pr-[30px]  items-center">
              <Link
                href="https://www.facebook.com/profile.php?id=61569146001285"
                className="w-[22px] h-[22px] mx-1"
              >
                <Image
                  src="/images/facebook-app-symbol.png"
                  alt="icon"
                  placeholder="empty"
                  loading="lazy"
                  width={25}
                  height={25}
                ></Image>
              </Link>
              <Link
                href="https://line.me/R/ti/p/@391huuts"
                className="w-[22px] h-[22px] mx-1"
              >
                <Image
                  src="/images/line (2).png"
                  alt="icon"
                  placeholder="empty"
                  loading="lazy"
                  width={20}
                  className="ml-1"
                  height={20}
                ></Image>
              </Link>
              <Link
                href="https://www.instagram.com/starisland_baby2022?igsh=MXVkeWExOXBsdWx1NQ%3D%3D&utm_source=qr"
                className="w-[22px] h-[22px] mx-1"
              >
                <Image
                  src="/images/instagram (1).png"
                  alt="icon"
                  className="ml-3"
                  placeholder="empty"
                  loading="lazy"
                  width={16}
                  height={16}
                ></Image>
              </Link>
              <Link
                href="https://starislandbaby.com/test/my-account/"
                className="w-[22px] h-[22px] mx-1"
              >
                <Image
                  src="/images/user.png"
                  alt="icon"
                  className="ml-3"
                  placeholder="empty"
                  loading="lazy"
                  width={16}
                  height={16}
                ></Image>
              </Link>
              <Link
                href="https://starislandbaby.com/test/cart/"
                className="w-[24px] h-[24px] mx-2"
              >
                <Image
                  src="/images/online-shopping.png"
                  alt="icon"
                  className="ml-3"
                  placeholder="empty"
                  loading="lazy"
                  width={16}
                  height={16}
                ></Image>
              </Link>
            </div>
            <div className="top-0  hidden right-3 left-auto z-[999999999] sm:block lg:hidden fixed w-[100vw]">
              <div className="absolute right-0  top-5">
                <SidebarNav />
              </div>
            </div>
          </div>
        </div>
        <div className="bottom   bg-[#676662] w-full hidden lg:flex justify-center  items-center">
          <div className="marquee fixed bg-white notice-modal mx-auto w-[100vw] rounded-[5px] py-1   flex flex-row p-1 bg-whote  justify-center top-0">
            {/* <div className="flex justify-center">
              <Marquee>
                <b className="text-center text-[12px]">
                  星嶼童裝新上線！ 折扣優惠請查看詳情
                </b>
              </Marquee>
            </div> */}
          </div>
          <div className="Logo-section w-1/2 sm:w-[10%]  flex justify-center"></div>
          <div className="mobile-menu block sm:hidden w-1/2"></div>
          <div className="Logo-section  sm:block flex  mx-auto   flex-row  w-[100%] xl:w-[80%] ">
            <div className="flex flex-row">
              <Navbar01 />
            </div>
          </div>
          <div className="Logo-section   flex justify-center items-center w-[10%] "></div>
        </div>
      </div>
    </>
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
