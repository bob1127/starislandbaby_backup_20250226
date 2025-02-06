"use client";
// import styles from "./page.module.scss";
import { useEffect, useState } from "react";
// import { AnimatePresence } from "framer-motion";
// import Preloader from "../components/toys05/Preloader";
import Layout from "./Layout.js";
import Link from "next/link";
// import SidebarNav from "../components/SideBar.jsx";
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
// import { Link } from "lucide-react";
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
      <main className="bg-[#e0d5c8] relative">
        {/* <PopupAd /> */}
        {/* <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence> */}

        <section
          className="section_Hero mt-10"
          data-aos-delay="7000"
          data-aos="fade-up"
        >
          <SwiperCarouselHero />
        </section>
        <section className="section_main_category ">
          <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-3 w-[80%] mx-auto">
            <div>
              <Link href="/category/categories/">
                <Image
                  src="/images/category/LINE_ALBUM_202523_250204_1_0.webp"
                  placeholder="empty"
                  loading="lazy"
                  width={400}
                  height={400}
                ></Image>
              </Link>
            </div>

            <div>
              <Link href="/category/small-children/">
                {" "}
                <Image
                  src="/images/category/LINE_ALBUM_202523_250204_2_0.webp"
                  placeholder="empty"
                  loading="lazy"
                  width={400}
                  height={400}
                ></Image>
              </Link>
            </div>
            <div>
              <Link href="/category/infants/">
                <Image
                  src="/images/category/LINE_ALBUM_202523_250204_3_0.webp"
                  placeholder="empty"
                  loading="lazy"
                  width={400}
                  height={400}
                ></Image>
              </Link>
            </div>
            <div>
              <Link href="/category/gift/">
                {" "}
                <Image
                  src="/images/category/LINE_ALBUM_202523_250204_4_0.webp"
                  placeholder="empty"
                  loading="lazy"
                  width={400}
                  height={400}
                ></Image>
              </Link>
            </div>
            <div>
              <Link href="/category/parent-childfootwear/">
                {" "}
                <Image
                  src="/images/category/LINE_ALBUM_202523_250204_5_0.webp"
                  placeholder="empty"
                  loading="lazy"
                  width={400}
                  height={400}
                ></Image>
              </Link>
            </div>
            <div>
              <Link href="/category/">
                {" "}
                <Image
                  src="/images/category/LINE_ALBUM.png"
                  placeholder="empty"
                  loading="lazy"
                  width={400}
                  height={400}
                ></Image>
              </Link>
            </div>
          </div>
        </section>

        {/* <section className="section_DragCarousel">
          <DragCarousel />
        </section> */}
        <Parallax
          className="mt-[100px] hidden pb-[100px] fill-[#b5b5b5]"
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
        <section className="rounded-[30px]  px-[10px] md:px-[50px] xl:px-[100px] 2xl:px-[140px] relative z-[99999] bg-[#e0d5c8] py-[100px]">
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
                    <b className="text-center bg-[#666666] text-[18px] font-bold text-white ">
                      GOODS FOR HAMBURGER SHOP
                    </b>
                    <p className="text-center">Premium Speakers</p>
                    <p></p>
                  </div>
                  <div className="slider">{/* <SwiperCarousel /> */}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full  flex-col  md:flex-row flex justify-center items-center   bg-[#e0d5c8] ">
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
            <div className="bg-[#e0d5c8] ">
              <SwiperCard />
            </div>
          </div>

          <div className="right bg-[#e0d5c8]  overflow-hidden relative w-full md:w-1/2 border border-green">
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

        {/* <section className="section_Hero">
        <HeroSlider />
      </section> */}
        {/* <section className="section_Products_Tabs relative  mt-[100px] flex">
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
        </section> */}
        <button class="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 font-medium text-neutral-200 transition-all duration-300 hover:w-32">
          <div class="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">
            Hover me
          </div>
          <div class="absolute right-3.5">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      </main>
    </Layout>
  );
}
