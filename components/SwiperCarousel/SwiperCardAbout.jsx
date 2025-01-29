"use client";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";

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
    <div className="w-full bg-white m-0 p-0">
      <Swiper
        // install Swiper modules
        // breakpoints={{
        //     0: {

        //         slidesPerView: 1,
        //     },
        //     768: {
        //         width: 768,
        //         slidesPerView: 1,
        //     },
        //     1200: {
        //         width: 1200,
        //         slidesPerView: 1,
        //     },
        // }}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={1}
        className="m-0 p-0"
        navigation
        pagination={{ clickable: false }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide className=" w-full bg-white pb-[40px]">
          <Card className="py-4 bg-white p-0 m-0 shadow-none">
            <CardHeader className="">
              <div className="txt  p-4"></div>
            </CardHeader>
            <CardBody className="flex  pb-[30px] flex-col relative">
              {/* <div className='comments absolute right-1 top-1'>
                                        <div class="commemt commemt--2">
                                            <div className="commemt__fukidashi \" >
                                               <Image src='girl_1.png' loader={myLoader01} width={50} height={50}></Image>
                                                
                                            </div>
                                            
                                           <div className="commemt__fukidashi top-[-40px] mt-[-50px] z-[99999]" >
                                               <Image src='cap_1_2.svg' loader={myLoader01} width={150} height={150}></Image>
                                                
                                            </div>
                                            </div>
                                    </div> */}
              <Image
                loading="lazy"
                alt="Card background"
                className="rounded-xl"
                src="item_1_2.jpg"
                loader={myLoader01}
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
                src="item_1_3.jpg"
                loader={myLoader01}
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
                src="item_1_1.jpg"
                loader={myLoader01}
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
  );
};
