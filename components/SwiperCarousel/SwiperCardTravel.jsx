"use client";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const myLoader01 = ({ src, width, quality, placeholder }) => {
  return `https://cdn1.beams.co.jp/special/kids_summer_2024/assets/images/chapter_1/${src}?w=${width}?p=${placeholder}`;
};
const food01 = ({ src, width, quality, placeholder }) => {
  return `https://cdn1.beams.co.jp/special/kids_summer_2024/assets/images/chapter_1/${src}?w=${width}?p=${placeholder}`;
};
export default () => {
  // const sliderRef = useRef(null);
  // const handlePrev = useCallback(() => {
  //     if (!sliderRef.current) return;
  //     sliderRef.current.swiper.slidePrev();
  // }, []);

  // const handleNext = useCallback(() => {
  //     if (!sliderRef.current) return;
  //     sliderRef.current.swiper.slideNext();
  // }, []);

  return (
    <>
      <div className=" e-full  m-0 p-0">
        <Swiper
          // install Swiper modules

          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            500: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={1}
          className="m-0 p-0"
          navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide className=" bg-white">
            <Card className="py-4 bg-white p-0 m-0 shadow-none">
              <CardHeader className="">
                <div className="txt  p-4"></div>
              </CardHeader>
              <CardBody className=" pb-[30px]">
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="/images/截圖-2024-12-05-晚上9.47.32.png"
                  width={500}
                  height={300}
                />
                <div className="description">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <a
                    href=""
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </a>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" bg-white">
            <Card className="py-4 bg-white p-0 m-0 shadow-none">
              <CardHeader className="">
                <div className="txt  p-4"></div>
              </CardHeader>
              <CardBody className=" pb-[30px]">
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="/images/截圖-2024-12-05-晚上9.47.11.png"
                  width={500}
                  height={300}
                />
                <div className="description">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <a
                    href=""
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </a>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" bg-white">
            <Card className="py-4 bg-white p-0 m-0 shadow-none">
              <CardHeader className="">
                <div className="txt  p-4"></div>
              </CardHeader>
              <CardBody className=" pb-[30px]">
                <Image
                  loading="lazy"
                  alt="Card background"
                  className=""
                  src="/images/截圖-2024-12-05-晚上9.46.54.png"
                  width={500}
                  height={300}
                />
                <div className="description">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <a
                    href=""
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </a>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" bg-white">
            <Card className="py-4 bg-white p-0 m-0 shadow-none">
              <CardHeader className="">
                <div className="txt  p-4"></div>
              </CardHeader>
              <CardBody className=" pb-[30px]">
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="/images/截圖-2024-12-05-晚上9.46.28.png"
                  width={500}
                  height={300}
                />
                <div className="description">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <a
                    href=""
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </a>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" bg-white">
            <Card className="py-4 bg-white p-0 m-0 shadow-none">
              <CardHeader className="">
                <div className="txt  p-4"></div>
              </CardHeader>
              <CardBody className=" pb-[30px]">
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="/images/截圖-2024-12-05-晚上9.47.32.png"
                  width={500}
                  height={300}
                />
                <div className="description">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <a
                    href=""
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </a>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" bg-white">
            <Card className="py-4 bg-white p-0 m-0 shadow-none">
              <CardHeader className="">
                <div className="txt  p-4"></div>
              </CardHeader>
              <CardBody className=" pb-[30px]">
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="/images/截圖-2024-12-05-晚上9.47.11.png"
                  width={500}
                  height={300}
                />
                <div className="description">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <a
                    href=""
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </a>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" bg-white">
            <Card className="py-4 bg-white p-0 m-0 shadow-none">
              <CardHeader className="">
                <div className="txt  p-4"></div>
              </CardHeader>
              <CardBody className=" pb-[30px]">
                <Image
                  loading="lazy"
                  alt="Card background"
                  className=""
                  src="/images/截圖-2024-12-05-晚上9.46.54.png"
                  width={500}
                  height={300}
                />
                <div className="description">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <a
                    href=""
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </a>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
          <SwiperSlide className=" bg-white">
            <Card className="py-4 bg-white p-0 m-0 shadow-none">
              <CardHeader className="">
                <div className="txt  p-4"></div>
              </CardHeader>
              <CardBody className=" pb-[30px]">
                <Image
                  loading="lazy"
                  alt="Card background"
                  className="rounded-xl"
                  src="/images/截圖-2024-12-05-晚上9.46.28.png"
                  width={500}
                  height={300}
                />
                <div className="description">
                  <b className="text-black">Price: $250</b>
                  <p className="text-[12px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, illum?
                  </p>
                  <a
                    href=""
                    className="border border-black text-black p-2 text-[12px] font-bold rounded-[30px] w-[190px]"
                  >
                    BUY NOW
                  </a>
                </div>
              </CardBody>
            </Card>
          </SwiperSlide>
        </Swiper>
        {/* <div className="prev-arrow" onClick={handlePrev} />
            <div className="next-arrow" onClick={handleNext} /> */}
      </div>
      <div className="bg-white w-full min-h-[200px] flex items-center justify-center">
        <button className="px-6 py-2 font-medium bg-buy-dark text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
          More
        </button>
      </div>
    </>
  );
};
