"use client";
// import styles from "./page.module.scss";
import { useEffect, useState } from "react";
// import { AnimatePresence } from "framer-motion";
// import Preloader from "../components/toys05/Preloader";
import Layout from "./Layout.js";
import Link from "next/link";
import BabyProducts from "@/components/BabyProducts";
import CategoriesProducts from "@/components/ＣategorieProducts";

import SmallChildrenProducts from "@/components/SmallChildrenProducts"; // 引入你的新組件
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
import Marquee from "react-fast-marquee";
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

  useEffect(() => {
    const font = new FontFace(
      "ResourceHanRoundedCN-Heavy",
      "url(/fonts/ResourceHanRoundedCN-Heavy.ttf)"
    );

    font
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        if (carouselRef.current) {
          carouselRef.current.style.fontFamily =
            "ResourceHanRoundedCN-Heavy, sans-serif";
        }
      })
      .catch((error) => {
        console.log("字體加載失敗:", error);
      });
  }, []);
  return (
    <Layout>
      <div className="bg-[#e0d5c8] ">
        <div className="section-hero px-0 sm:px-[30px] md:px-[80px] xl:px-[200px] pb-[50px]  md:pb-[100px] pt-[150px] md:pt-[220px] xl:pt-[300px]">
          <Image
            width={1920}
            src="/images/S__4800521.jpg"
            height={658}
            placeholder="empty"
            className="rounded-none md:rounded-[20px] xl:rounded-[50px]"
            alt="hero-img"
            loading="lazy"
          ></Image>
          {/* <video
            loop
            autoPlay
            muted
            playsInline
            preload="auto"
            className="w-full h-auto"
          >
            <source
              src="https://www.woollykids.com/cdn/shop/videos/c/vp/b4dcb6c541e94bb1bd44e6364c0ebdc9/b4dcb6c541e94bb1bd44e6364c0ebdc9.HD-1080p-7.2Mbps-26447959.mp4?v=0"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video> */}
        </div>
        {/* <SmallChildrenProducts /> */}
        <section className="section_main_category mt-[20px] 2xl:mt-[50px] ">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-[80%] mx-auto">
            <div className="hover:scale-105 hover:rotate-6 duration-300">
              <Link href="/images/LINE_ALBUM_2025211_250212_1-removebg-preview.png">
                <Image
                  src="/images/LINE_ALBUM_2025211_250214_3-removebg-preview.png"
                  placeholder="empty"
                  loading="lazy"
                  width={400}
                  height={400}
                ></Image>
              </Link>
            </div>

            <div className="hover:scale-105 hover:rotate-6 duration-300">
              <Link href="/category/infants/">
                <Image
                  src="/images/LINE_ALBUM_2025211_250214_4-removebg-preview.png"
                  placeholder="empty"
                  loading="lazy"
                  width={400}
                  height={400}
                ></Image>
              </Link>
            </div>

            <div className="hover:scale-105 hover:rotate-6 duration-300">
              <Link href="/category/parent-childfootwear/">
                {" "}
                <Image
                  src="/images/LINE_ALBUM_2025211_250214_2.png"
                  placeholder="empty"
                  loading="lazy"
                  width={400}
                  height={400}
                ></Image>
              </Link>
            </div>
            <div className="hover:scale-105 hover:rotate-6 duration-300">
              <Link href="/category/small-children/">
                {" "}
                <Image
                  src="/images/LINE_ALBUM_2025211_250214_5.png"
                  placeholder="empty"
                  loading="lazy"
                  width={400}
                  height={400}
                ></Image>
              </Link>
            </div>
          </div>
        </section>
        <section
          className="section_Hero"
          data-aos-delay="7000"
          data-aos="fade-up"
        >
          <SwiperCarouselHero />
        </section>

        <div className="mt-10">
          <SmallChildrenProducts />
        </div>
        <div className="mt-10">
          {" "}
          <BabyProducts />
        </div>
        <div className="mt-10">
          {" "}
          <CategoriesProducts />
        </div>

        <main className=" px-0 lg:px-[100px]  2xl:px-[220px] relative">
          {/* <PopupAd /> */}
          {/* <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence> */}

          <section
            data-aos="fade-up"
            className="section_banner py-[100px] flex  flex-col lg:flex-row"
          >
            <div className=" w-full lg:w-1/2 flex p-5 justify-center items-center">
              <Link href="/category/skirt-small-children" className="w-full">
                <Image
                  src="/images/S__4644872.jpg"
                  className="rounded-xl"
                  alt="half-banner"
                  placeholder="empty"
                  loading="lazy"
                  width={800}
                  height={600}
                ></Image>
              </Link>
            </div>

            <div className="w-full lg:w-1/2 flex p-5 justify-center items-center">
              <Link href="/category/skirt-small-children" className="w-full">
                <Image
                  src="/images/S__4644873.jpg"
                  alt="half-banner"
                  className="rounded-xl"
                  placeholder="empty"
                  loading="lazy"
                  width={800}
                  height={600}
                ></Image>
              </Link>
            </div>
          </section>
          <section className="section-littleChildren">
            <div className="grid grid-cols-5 gap-2  "></div>
          </section>
          <div className="left  px-5 border-green">
            <div className="bg-[#e0d5c8] ">
              <SwiperCard />
            </div>
          </div>
          <Parallax
            className="mt-[100px] hidden pb-[100px] fill-[#b5b5b5]"
            bgImage={backgroundImage}
            strength={500}
          >
            <section
              data-aos="fade-up"
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
          {/* <section
            data-aos="fade-up"
            className="section_brand_story relative py-[100px] flex flex-col xl:flex-row justify-center"
          >
            <div className="sm:w-[80%] mx-auto w-[90%] xl:w-1/3 flex justify-center"></div>
            <div clasaName="sm:w-[80%] mx-auto relative w-[90%] xl:w-1/3 flex flex-col items-center justify-center">
              <Image
                src="/images/品牌故事.webp"
                placeholder="empty"
                alt="品牌故事"
                loading="lazy"
                className="w-[90%] sm:w-[80%] xl:w-full mx-auto"
                width={800}
                height={1300}
              ></Image>
            </div>
            <div className="sm:w-[80%] mx-auto w-[90%] xl:w-1/3 flex justify-center">
            
            </div>
          </section> */}
          {/* <section className="rounded-[30px]  px-[10px] md:px-[50px] xl:px-[100px] 2xl:px-[140px] relative z-[99999] bg-[#e0d5c8] py-[100px]">
          <div>
            <div className="txt p-8">
              <h4 className="text-[32px] font-semibold">Premium Speakers</h4>
              <h5>Bring Quality Sound into Your Home</h5>
            </div>
            <div className="bottom-wrap flex flex-col lg:flex-row p-[15px] lg:p-8">
              <div className="left relative w-full lg:w-[32%] pb-5 lg:pb-0 border border-black pr-0 lg:pr-6">
                <Image
                  src="/images/S__4644888.png"
                  fill
                  data-aos="fade-right"
                  data-aos-delay="450"
                  placeholder="empty"
                  className="rounded-xl w-[500px]"
                  loading="lazy"
                ></Image>
              </div>
              <div className="right  md:p-[50px] lg:p-[0px] p-[0px] w-full lg:w-[68%]">
                <div
                  data-aos="fade-up"
                  data-aos-delay="650"
                  className="card rounded-2xl flex flex-col justify-center h-full  items-center  p-5 "
                >
                  <div className="title">
                    <b className="text-center bg-[#666666] text-[18px] font-bold text-white ">
                      我們的品牌故事
                    </b>
                    <p className="text-center">Premium Speakers</p>

                    <p></p>
                  </div>
           
                </div>
              </div>
            </div>
          </div>
        </section> */}

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
          <section className="flex flex-col py-[50px]  my-5">
            <div>
              <h2 data-aos="fade-up" className="text-[7vmin]">
                夏天即將來臨！
              </h2>
              <p
                data-aos="fade-up"
                className="text-[14px] mt-4 w-[80%] text-center mx-auto"
              >
                對於初夏到盛夏的童裝，最重要的是在炎熱的季節裡功能性和舒適性，例如容易調節體溫和防水。
                當然，設計要符合大人小孩的喜好、價格合理也很重要。 B:Ming by
                BEAMS 和 BEAMS MINI 的童裝可以滿足爸爸媽媽們所有這些願望。
                本期我們將介紹最適合夏季出遊的單品和最佳裝束，如露營、海灘和公園。
                今年夏天將會非常炎熱，但不要讓烈日阻擋您享受時尚的步伐 ♡
                HAMBURGER SHOP CAMP SEA TRAVEL
              </p>
            </div>
            <Marquee className="h-[420px]">
              <div className="flex ">
                <div className="w-[250px] mx-3 border-3 rounded-xl border-white">
                  <Image
                    width={300}
                    height={400}
                    placeholder="empty"
                    className="m-2 rounded-xl"
                    alt="marquee-img"
                    src="/images/l_7.png"
                  ></Image>
                </div>
                <div className="w-[250px] mx-3 border-3 rounded-xl border-white">
                  <Image
                    width={300}
                    height={400}
                    placeholder="empty"
                    className="m-2 rounded-xl"
                    alt="marquee-img"
                    src="/images/l_2.png"
                  ></Image>
                </div>
                <div className="w-[250px] mx-3 border-3 rounded-xl border-white">
                  <Image
                    width={300}
                    height={400}
                    placeholder="empty"
                    className="m-2 rounded-xl"
                    alt="marquee-img"
                    src="/images/l_8.png"
                  ></Image>
                </div>
                <div className="w-[250px] mx-3 border-3 rounded-xl border-white">
                  <Image
                    width={300}
                    height={400}
                    placeholder="empty"
                    className="m-2 rounded-xl"
                    alt="marquee-img"
                    src="/images/l_6.png"
                  ></Image>
                </div>
                <div className="w-[250px] mx-3 border-3 rounded-xl border-white">
                  <Image
                    width={300}
                    height={400}
                    placeholder="empty"
                    className="m-2 rounded-xl"
                    alt="marquee-img"
                    src="/images/l_5.png"
                  ></Image>
                </div>
                <div className="w-[250px] mx-3 border-3 rounded-xl border-white">
                  <Image
                    width={300}
                    height={400}
                    placeholder="empty"
                    className="m-2 rounded-xl"
                    alt="marquee-img"
                    src="/images/l_4.png"
                  ></Image>
                </div>
                <div className="w-[250px] mx-3 border-3 rounded-xl border-white">
                  <Image
                    width={300}
                    height={400}
                    placeholder="empty"
                    className="m-2 rounded-xl"
                    alt="marquee-img"
                    src="/images/l_3.png"
                  ></Image>
                </div>
                <div className="w-[250px] mx-3 border-3 rounded-xl border-white">
                  <Image
                    width={300}
                    height={400}
                    placeholder="empty"
                    className="m-2 rounded-xl"
                    alt="marquee-img"
                    src="/images/l_1.png"
                  ></Image>
                </div>
              </div>
            </Marquee>
          </section>
          {/* <section className="section-feature flex">
            <div className="w-1/2 flex justify-center  items-center">
              <Image
                src="/images/look_6_1.jpg"
                width={600}
                height={1000}
                placeholder="empty"
                loading="lazy"
              ></Image>
            </div>
            <div className="w-1/2 flex justify-center  items-center"></div>
          </section> */}
          <section className="section_banner px-5 ">
            <Image
              src="/images/S__4644870.jpg"
              placeholder="empty"
              alt="banner"
              loading="lazy"
              className="rounded-2xl"
              width="1800"
              height="700"
            />
          </section>

          <section className="section_DragCarousel pb-10 mt-[100px] bg-[#e0d5c8]">
            <DragCarousel />
          </section>
        </main>
      </div>
    </Layout>
  );
}
