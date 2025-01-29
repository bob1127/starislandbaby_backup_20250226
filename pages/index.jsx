"use client";
// import styles from "./page.module.scss";
import { useEffect, useState } from "react";
// import { AnimatePresence } from "framer-motion";
// import Preloader from "../components/toys05/Preloader";
import Layout from "./Layout.js";

// import Landing from "../components/toys05/Landing";
// import Projects from "../components/toys05/Projects";
// import Description from "../components/toys05/Description";
// import Link from "next/link";
import Example from "../components/Drag/Example.jsx";
// import HeroSlider from "../components/HeroSlider/page";
// import Marquee from "react-fast-marquee";
import Tabs from "../components/ui/Tabs.jsx";
import EmblaCarousel from "../components/EmblaCarouselToys/index.jsx";
import PopupAd from "../components/PopupAd.jsx";
// import Double from "../components/two-colum/Double.jsx";

import SwiperCard from "../components/SwiperCarousel/SwiperCardTravel.jsx";
import SwiperCarouselHero from "../components/SwiperCarouselFood/index.jsx";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from "@nextui-org/react";
import { Typewriter } from "react-simple-typewriter";
import ShiftTime from "../components/ShiftingCountdown/index.jsx";
// import VideoComponent from '../components/VideoComponents/VideoComponent.jsx'
// import SmoothParallaxScroll from "../components/SmoothParallaxScroll/index.js";
import { Parallax } from "react-parallax";
// import SwiperCarousel from "../components/SwiperCarousel/SwiperCardAbout.jsx";
// import SwiperCarousel01 from "../components/SwiperCarousel/SwiperCard.jsx";
// import SwiperCarousel02 from "../components/SwiperCarousel/SwiperCardFood.jsx";
import DragCarousel from "../components/DragCarousel/index.tsx";
// import JsonLd from "../components/JsonLd.jsx";
// import YoutubeUH1 from "../components/VideoPlayer/UH1.jsx";
// import TabMenu from "../components/SVGtext.jsx";
// import ParallaxImage from "../components/ParallaxImage/page.jsx";
// import { ReactLenis } from "@studio-freight/react-lenis";

// import Magnetic from "../../../common/Magnetic";
// import Rounded from "../../../common/RoundedButton";
// import SlidingImages from "../components/toys05/SlidingImages";
// import Contact from "../components/toys05/Contact";
import Image from "next/image";
const backgroundImage = "/images/S__23085150.png";
const myLoader = ({ src, width, quality, placeholder }) => {
  return `https://www.dot-st.com/static/docs/nikoand/pages/2022_city_creek_v2/assets/images/${src}?w=${width}?p=${placeholder}`;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <Layout>
      <main className="bg-[#ece2d9]">
        <PopupAd />
        {/* <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence> */}
        <div>
          <div className="bg-white">
            <div className="sideBar  z-[999999] bottom-[23%] right-[-90%] fixed inline-flex  h-[1px]  flex-col justify-center  items-center ">
              <Image
                src="/imaghes/chap_2 (3).gif"
                width={70}
                height={70}
                placeholder="empty"
                alt="side-gif"
                loading="lazy"
              ></Image>
              <p className="font-bold px-4 inline-block rotate-[90deg]  bg-blue-300  text-[13px] ml-[64px] text-black">
                CHAPTER-1 KIDS COORRDINATE 8DAYS{" "}
              </p>

              <div className="fixLink mt-[150px] w-[90px] pc is-visible">
                <span class="link">
                  <svg
                    id="_レイヤー_2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 195 195"
                  >
                    <path
                      class="cls-1"
                      d="m0,173.67456c0,11.77771,9.54772,21.32544,21.32544,21.32544h152.34912c11.77771,0,21.32544-9.54772,21.32544-21.32544V21.32544c0-11.77771-9.54772-21.32544-21.32544-21.32544"
                    >
                      <Image
                        src="/imaghes/chap_2 (3).gif"
                        width={70}
                        height={70}
                        placeholder="empty"
                        alt="side-gif"
                        loading="lazy"
                      ></Image>
                    </path>
                  </svg>
                </span>{" "}
                <div className="absolute border border-green-400  top-[65%] right-[52px] rotate-[-45deg] z-[99999999]">
                  <p className="text text-white text--1 font-extabold  text-[16px] f-Futura-Demi">
                    ONLINE SHOP
                  </p>{" "}
                  <p className="text text-white text--1  text-[11px] f-Futura-Demi">
                    関連アイテムを
                  </p>
                </div>{" "}
                <span class="yajirushi"></span>
              </div>
            </div>
          </div>
        </div>
        <section
          className="section_Hero mt-10"
          data-aos-delay="7000"
          data-aos="fade-up"
        >
          <SwiperCarouselHero />
        </section>
        <section className="section_DragCarousel">
          <DragCarousel />
        </section>
        <Parallax
          className="mt-[100px] pb-[100px] fill-[#b5b5b5]"
          bgImage={backgroundImage}
          strength={500}
        >
          <section
            className="section_Timer 

 bg-cover bg-center mt-[30px] py-[20px]"
          >
            <div className="flex flex-col justify-center items-center">
              <div className="txt">
                <div></div>
                <h1
                  style={{
                    fontSize: "50px",
                    fontWeight: "800",
                    paddingTop: "5rem",
                    color: "white",
                    margin: "auto 0",
                    fontWeight: "normal",
                  }}
                >
                  星嶼童裝{" "}
                  <Typewriter
                    words={[
                      "用心嚴選",
                      "正韓服飾",
                      "質料優質",
                      "倒數計時特價!",
                    ]}
                    loop={55}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={80}
                    delaySpeed={1400}
                    className="custom-typewriter text-[#ee3030] text-[40px] font-extrabold"
                  />
                  <h2 style={{ color: "red", fontWeight: "bold" }}>
                    {/* Style will be inherited from the parent element */}
                  </h2>
                </h1>
              </div>
              <div className="bottom_txt mx-auto w-full lg:w-[700px]">
                <p className="text-gray-100 mt-3 mb-[40px] mx-auto text-[12px] w-2/3 text-center  font-normal ">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Ullam sequi quo obcaecati! Sequi reprehenderit accusamus
                  eligendi nihil nulla excepturi ea, optio tenetur iusto
                  voluptates fugit omnis quam animi nobis ullam.
                </p>
                <div className="flex justify-center items-center">
                  <Example />
                </div>
                <a
                  href="/"
                  className="flex hover:bg-white hover:text-black duration-500 mx-auto flex-col border-2 border-white rounded-[50px] w-[220px] py-2 text-white justify-center items-center mt-[30px]"
                >
                  Go Instagram
                </a>
              </div>
            </div>
            <div>
              <ShiftTime />
            </div>
          </section>
        </Parallax>
        <section className="rounded-[30px]  px-[10px] md:px-[50px] xl:px-[100px] 2xl:px-[140px] relative z-[99999] bg-white mt-[-100px] py-[100px]">
          <div>
            <div className="txt p-8">
              <h4 className="text-[32px] font-semibold">Premium Speakers</h4>
              <h5>Bring Quality Sound into Your Home</h5>
            </div>
            <div className="bottom-wrap flex flex-col lg:flex-row p-[15px] lg:p-8">
              <div className="left relative w-full lg:w-[62%] pb-5 lg:pb-0  pr-0 lg:pr-6">
                <div className="absolute  top-10 scale-1/2 left-[30px]  bg-[#fbc029]">
                  產品名稱 NT. 1,500
                </div>
                <Image
                  src="/images/IMG_5675.jpg"
                  width={1000}
                  height={420}
                  data-aos="fade-right"
                  data-aos-delay="450"
                  placeholder="empty"
                  className="rounded-xl"
                  loading="lazy"
                ></Image>
              </div>
              <div className="right  md:p-[50px] lg:p-[0px] p-[0px] w-full lg:w-[38%]">
                <div
                  data-aos="fade-up"
                  data-aos-delay="650"
                  className="card rounded-2xl flex flex-col justify-center items-center h-full p-5 border-2 border-gray-800"
                >
                  <div className="title">
                    <b className="text-center bg-[#666666] text-[18px] font-bold text-white">
                      GOODS FOR HAMBURGER SHOP
                    </b>
                    <p className="text-center">Premium Speakers</p>
                  </div>
                  <div className="slider">{/* <SwiperCarousel /> */}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full  flex-col  md:flex-row flex justify-center items-center   bg-white ">
          <div className="left w-full md:w-1/2 border border-green">
            <div>
              <div className="top">
                <div className="title py-4 flex mx-auto  w-2/3 justify-center items-center flex-col">
                  <h4 className="text-[32px] font-extrabold text-center">
                    將高功能性和美感融入日常設計中。
                  </h4>
                  <b className="text-[14px] text-center">
                    採用奢華雙層編織的高度耐用纖維
                    CORDURA®︎設計。透過改變襯裡線的粗細，從穿上袖子的那一刻起，您就可以感受到皮膚的溫暖和柔軟。褲子是休閒褲型，沒有中心摺痕。
                  </b>
                  {/* <Link
                      href="/toys"
                      className="text-[12px] border border-black mt-2 py-1 px-2 text-center w-[100px] block"
                    >
                      {" "}
                      More
                    </Link> */}
                </div>
              </div>
              <div className="bottom"></div>
            </div>
            <div className="">
              <SwiperCard />
            </div>
          </div>

          <div className="right overflow-hidden relative w-full md:w-1/2 border border-green">
            <div className="absolute w-full h-full top-0 left-0 z-[99] bg-[#333] opacity-50"></div>
            <img src="/images/IMG_5675.jpg" className="w-full "></img>
            <div className="txt left-[10%] bottom-[20%] absolute z-[99999]">
              <div className="flex mx-auto flex-col justify-center items-center">
                <b
                  data-aos="fade-up"
                  className="font-extrabold text-white text-[22px]"
                >
                  SAMPLE
                </b>

                <p
                  data-aos="fade-up"
                  className="text-white text-[16px] font-normal"
                >
                  CREAT DERECT
                </p>
                <p
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="font-light w-3/4 text-center text-[13px] text-white"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima rerum facilis exercitationem nisi aut rem odio veniam
                  dolores
                </p>
                <a
                  href=""
                  className="text-[#85dc1c] font-bold w-[180px] text-center py-2 duration-75 mt-4 hover:text-[#fff] hover:bg-[#85dc1c] px-4 border border-[#85dc1c]"
                >
                  {" "}
                  READ MORE
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <section className="mt-[100px] hidden md:block">
        <div className="txt">
          <h1
            data-aos="zoom-in-up"
            data-aos-delay="650"
            className="text-[50px] text-center leading-normal font-extrabold text-black"
          >
            {" "}
            ENJOY THE TIME <br />
            KIDS & DULTS
          </h1>
          <Link
            href="/"
            className="w-[200px] font-extrabold py-2  border-2 mx-auto text-center border-black"
          >
            BUY
          </Link>
        </div>
        <iframe
          src="https://my.spline.design/nintendoswitchcopy-90747e739d7d06f2a2ae34d6bf3789bd/"
          frameborder="0"
          width="100%"
          height="600px"
        ></iframe>

        <div className="flex left flex-row w-full">
          <div className="left w-1/2">
            <img></img>
          </div>
          <div className="right w-1/2">
            <h1 className="text-[50px] font-extrabold">LOREM</h1>
          </div>
        </div>
        <div className="left"></div>
      </section> */}
        {/* <section className="h-[100vh]">
        <Double />
      </section> */}

        <section className="mt-[350px]">
          <div className="relative">
            <div className="absolute  top-[-100px] w-full left-0 ">
              <div className="flex">
                <div className="left w-1/2 relative">
                  <Image
                    src="/images/S__23085144.png"
                    placeholder="empty"
                    width={250}
                    height={250}
                    className="absolute h-auto left-5 w-[250px] z-[1] top-[-120px]"
                    loading="lazy"
                    alt="planet"
                  ></Image>
                  {/* <Image
                  src="/images/截圖-2024-12-05-晚上9.46.54.png"
                  placeholder="empty"
                  width={250}
                  height={250}
                  className="absolute h-auto left-[10%] w-[250px] z-[1] top-[-100px]"
                  loading="lazy"
                  alt="planet"
                ></Image> */}
                </div>
                <div className="right w-1/2 relative">
                  <Image
                    src="/images/fantastic_hare_36410_Planet_Solid_Color_Background_6576d313-40aa-4ead-8f00-7e9ec156890e.png"
                    placeholder="empty"
                    width={400}
                    height={400}
                    className="absolute h-auto right-5 w-[400px] z-[1] top-[-120px]"
                    loading="lazy"
                    alt="planet"
                  ></Image>
                </div>
              </div>
            </div>
            <div className="mt-[80px] relative z-[999]">
              <EmblaCarousel />
            </div>
          </div>
        </section>
        {/* <section className="section_Hero">
        <HeroSlider />
      </section> */}
        <section className="section_Products_Tabs relative  mt-[100px] flex">
          <div className="main-img border border-black w-[220px]  absolute top-[6%] left-[2%] ">
            <Image
              src="/images/S__45544757.png"
              alt="main-img01"
              placeholder="empty"
              loading="lazy"
              width={220}
              height={400}
            ></Image>
          </div>
          <Tabs />
        </section>
      </main>
    </Layout>
  );
}
