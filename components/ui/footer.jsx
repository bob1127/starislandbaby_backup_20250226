import Logo from "./logo";
// import { Cloudinary } from "@cloudinary/url-gen";
import Image from "next/image";

import footerMobile from "./footerMobile.jsx";

// const myLoader = ({ src, width, quality, placeholder }) => {
//   return `https://www.ultraehp.com/images/Products-Detail-Img/UH-2/${src}?w=${width}?p=${placeholder}`
// }

const myLoader = ({ src, width, quality, placeholder }) => {
  return `https://www.ultraehp.com/images/footer/${src}?w=${width}?p=${placeholder}`;
};

export default function Footer() {
  return (
    <div className="block">
      <footer className="md:py-[80px] py-[20px] lg:py-[180px] w-full px-[15px] md:px-[30px] lg:px-[90px] bg-[#676662]  flex-col md:flex-row flex justify-center">
        <div className="top-section p-[30px] lg:p-[10px] w-full md:w-1/2 border  border-white">
          <div className="logo py-[30px]">
            <b className="text-[26px] mb-[20px] font-bold">Niko and ...</b>
          </div>
          <div className="link-button-wrap flex flex-wrap  ">
            <a
              href=""
              className="w-auto m-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black"
            >
              play{" "}
            </a>
            <a
              href=""
              className="w-auto m-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black"
            >
              Music
            </a>
            <a
              href=""
              className="w-auto m-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black"
            >
              Local
            </a>
            <a
              href=""
              className="w-auto m-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black"
            >
              Travel
            </a>
            <a
              href=""
              className="w-auto m-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black"
            >
              play
            </a>
            <a
              href=""
              className="w-auto m-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black"
            >
              play{" "}
            </a>
          </div>
          <div className="input">
            <from>
              <input
                type="text"
                className="border-2 text-[12px] h-[50px] py-1 mt-[20px] w-[100%] rounded-[30px] border-black"
                placeholder="text input"
              />
            </from>
          </div>
          <div className="keywords mt-[20px] flex flex-wrap">
            <div className="p-1">
              <a
                href=""
                className="w-auto m-2 mt-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black mx-2 py-2"
              >
                play ⚽
              </a>
            </div>
            <div className="p-1">
              <a
                href=""
                className="w-auto m-2 mt-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black mx-2 py-2"
              >
                play ⚽
              </a>
            </div>
            <div className="p-1">
              <a
                href=""
                className="w-auto m-2 mt-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black mx-2 py-2"
              >
                play ⚽
              </a>
            </div>
            <div className="p-1">
              <a
                href=""
                className="w-auto m-2 mt-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black mx-2 py-2"
              >
                play ⚽
              </a>
            </div>
            <div className="p-1">
              <a
                href=""
                className="w-auto m-2 mt-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black mx-2 py-2"
              >
                play ⚽
              </a>
            </div>
            <div className="p-1">
              <a
                href=""
                className="w-auto m-2 mt-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black mx-2 py-2"
              >
                play ⚽
              </a>
            </div>
            <div className="p-1">
              <a
                href=""
                className="w-auto m-2 mt-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black mx-2 py-2"
              >
                play ⚽
              </a>
            </div>
            <div className="p-1">
              <a
                href=""
                className="w-auto m-2 mt-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black mx-2 py-2"
              >
                play ⚽
              </a>
            </div>
            <div className="p-1">
              <a
                href=""
                className="w-auto m-2 mt-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black mx-2 py-2"
              >
                play ⚽
              </a>
            </div>
            <div className="p-1">
              <a
                href=""
                className="w-auto m-2 mt-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black mx-2 py-2"
              >
                play ⚽
              </a>
            </div>
            <div className="p-1">
              <a
                href=""
                className="w-auto m-2 mt-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black mx-2 py-2"
              >
                play ⚽
              </a>
            </div>
            <div className="p-1">
              <a
                href=""
                className="w-auto m-2 mt-2 px-3 inline-blockblock mr-[15px] hover:bg-black bg-white hover:text-white duration-100 py-[2px] border-1  border-black rounded-[30px] text-black mx-2 py-2"
              >
                play ⚽
              </a>
            </div>
          </div>
        </div>
        <div className="bottom-section flex-col flex justify-center items-center lg:flex-row md:w-1/2 w-full p-[30px] lg:p-[10px] border border-white">
          <div className="left  w-full lg:w-[60%] pr-5">
            <div className="txt flex justify-center flex-col items-center">
              <p className="text-[14px] w-2/3 font-bold text-white">
                ニコアンドのアイデアや クリエイティブを活かした 様々な取り組み。
              </p>

              <a href="" className="text-[12px] hover:text-gray-100">
                niko and ... EDIT HOUSE ⛔︎
              </a>
              <br />
              <a href="" className="text-[12px] mt-3 hover:text-gray-100">
                niko and ... EDIT HOUSE ⛔︎
              </a>
            </div>
          </div>
          <div className="right w-full flex justify-center items-center lg:w-[40%]">
            <img
              className="w-[200px] h-[200px]"
              src="https://www.nikoand.jp/wp-content/uploads/2024/07/UP_main_SQ-1024x1024.jpg"
              alt=""
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
