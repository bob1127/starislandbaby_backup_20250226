import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../Layout";
// Swiper imports
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import CarouselThumbs from "../../components/SwiperSliders/UH1Slider";
import { Select, SelectItem } from "@heroui/react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SwiperCore from "swiper";
import parse from "html-react-parser";
import Image from "next/image"; // Import Image component

const WP_API_BASE_URL = process.env.NEXT_PUBLIC_WP_API_BASE_URL;

export async function getStaticPaths() {
  const url = `https://starislandbaby.com/test/wp-json/wc/v3/products?consumer_key=ck_ec41b174efc5977249ffb5ef854f6c1fdba1844b&consumer_secret=cs_d6c8d7ba3031b522ca93e6ee7fb56397b8781d1f`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error("API 请求失败:", response.status);
    return { paths: [], fallback: "blocking" };
  }

  const products = await response.json();
  const paths = products.map((product) => {
    return { params: { slug: encodeURIComponent(product.slug) } };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

//
export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    const url = `https://starislandbaby.com/test/wp-json/wc/v3/products?consumer_key=ck_ec41b174efc5977249ffb5ef854f6c1fdba1844b&consumer_secret=cs_d6c8d7ba3031b522ca93e6ee7fb56397b8781d1f&slug=${slug}`;
    const response = await fetch(url);

    if (!response.ok) {
      return { notFound: true };
    }

    const data = await response.json();

    // 在這裡解碼 API 回傳的 slug，確保匹配
    const matchedProduct = data.find(
      (product) => decodeURIComponent(product.slug) === decodeURIComponent(slug)
    );

    if (!matchedProduct) {
      return { notFound: true };
    }

    return {
      props: {
        product: matchedProduct,
      },
      revalidate: 2,
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      notFound: true,
    };
  }
}

const ProductPage = ({ product }) => {
  const [selectedAttributes, setSelectedAttributes] = useState({
    color:
      product.default_attributes.find((attr) => attr.name === "color")
        ?.option || "",
    size:
      product.default_attributes.find((attr) => attr.name === "size")?.option ||
      "",
  });
  const [quantity, setQuantity] = useState(1); // State for the quantity
  const [thumbsSwiper, setThumbsSwiper] = useState(null); // Initialize thumbsSwiper state

  // Calculate total price
  const totalPrice = product.price * quantity; // Calculate total price based on quantity

  // const handleAttributeChange = (e) => {
  //   const { name, value } = e.target;
  //   setSelectedAttributes((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  // 根據顏色和尺寸選擇變體 ID
  const getVariantId = () => {
    const { color, size } = selectedAttributes;

    // 獲取顏色和尺寸的選項
    const colorOptions = product.attributes.find(
      (attr) => attr.name === "color"
    ).options;
    const sizeOptions = product.attributes.find(
      (attr) => attr.name === "size"
    ).options;

    // 查找顏色和尺寸的索引
    const colorIndex = colorOptions.indexOf(color);
    const sizeIndex = sizeOptions.indexOf(size);

    if (colorIndex === -1 || sizeIndex === -1) {
      return null; // 顏色或尺寸不在選項中，返回 null
    }

    // 變體ID的順序假設是基於顏色和尺寸的組合進行排列的
    const variations = product.variations;

    // 通常變體 ID 的順序可能是：顏色的第一個選項搭配尺寸的第一個選項，依此類推
    // 假設顏色是第1個選項，尺寸是第2個選項
    // 計算變體 ID 的索引：colorIndex * sizeOptions.length + sizeIndex
    const variantIndex = colorIndex * sizeOptions.length + sizeIndex;

    // 返回對應的變體 ID，如果變體數組中沒有這個索引，則返回 null
    return variations[variantIndex] || null;
  };
  // const CoCartAPI = require("@cocart/cocart-rest-api").default;

  // const CoCart = new CoCartAPI({
  //   url: "https://starislandbaby.com/test",
  //   consumerKey: "ck_ec41b174efc5977249ffb5ef854f6c1fdba1844b",
  //   consumerSecret: "cs_d6c8d7ba3031b522ca93e6ee7fb56397b8781d1f",
  // });

  const router = useRouter(); // 使用 Next.js 的 router
  const siteUrl = "https://starislandbaby.com/test"; // 你的 WooCommerce 網站 URL

  const handleAddToCart = () => {
    const variantId = getVariantId(); // 取得變體 ID

    const addToCartUrl = `${siteUrl}/cart/?add-to-cart=${variantId}&quantity=${quantity}`;

    // 讓 Next.js 跳轉到 WooCommerce 的購物車頁面
    window.open(addToCartUrl, "_blank"); // 在新標籤頁開啟
  };

  const description = product.description || "";

  // Custom parsing function to replace <img> tags with Next.js <Image> component
  const customParser = (html) => {
    return parse(html, {
      replace: (domNode) => {
        if (domNode.name === "img") {
          const { src, alt, width, height } = domNode.attribs;

          // 設定預設寬高，如果 HTML 中有提供的話就使用
          const imgWidth = width || 600; // 預設寬度600px
          const imgHeight = height || 400; // 預設高度400px

          return (
            <Image
              src={src}
              alt={alt || "Product Image"}
              width={parseInt(imgWidth)} // 使用圖片的寬度
              height={parseInt(imgHeight)} // 使用圖片的高度
              layout="responsive" // 自動調整大小，根據容器調整
              priority={true}
            />
          );
        }
      },
    });
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!product) return <div>Product not found.</div>;
  return (
    <Layout>
      <Head>
        <title>
          {product.name} | 星嶼童裝 | 韓系童裝服飾、小童、嬰幼兒服飾
        </title>
        <meta name="description" content={product.short_description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.short_description} />
        <meta property="og:image" content={product.images[0].src} />
      </Head>
      <h1>{product.name}</h1>
      <div className="flex flex-col" data-aos="fade-up">
        <div className="product_top_info px-[20px] sm:px-[50px] xl:px-[100px] pt-[160px]">
          <div className="flex lg:flex-row flex-col">
            <div className="w-full lg:w-1/2 p-2 lg:p-8 flex-col mx-auto flex justify-center items-center">
              {/* Main Image Swiper */}
              <section className="w-full ">
                <div className="container">
                  <Swiper
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{
                      swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="h-full w-full"
                  >
                    {product.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="flex h-full w-[90%] lg:w-[80%] mx-auto items-center justify-center">
                          <Image
                            width={400}
                            height={300}
                            src={image.src}
                            priority={true}
                            loading="eager"
                            alt={image.alt || `Product Image ${index}`}
                            className=""
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={12}
                    breakpoints={{
                      0: {
                        slidesPerView: 4,
                      },
                      768: {
                        slidesPerView: 5,
                      },
                      1920: {
                        slidesPerView: 6,
                      },
                    }}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="thumbs mt-3 w-full"
                  >
                    {product.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <button className="flex h-full w-full items-center justify-center">
                          <Image
                            width={400}
                            height={300}
                            src={image.src}
                            priority={true}
                            loading="eager"
                            alt={image.alt || `Thumbnail ${index}`}
                            className=""
                          />
                        </button>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </section>
            </div>

            {/* Product Information */}
            <div className="product_info mt-[80px] p-2 lg:p-8 w-full lg:w-1/2 flex flex-col justify-center">
              <div className="flex justify-between">
                <div className="flex w-[50%] flex-col">
                  <h1>商品名稱：{product.name}</h1>
                  <p className="text-[22px] mt-4">價格: ${product.price} .NT</p>
                  {/* Short Description */}
                  {product.short_description && (
                    <div className="short-description text-[16px] py-5 mt-4">
                      {parse(product.short_description)}
                    </div>
                  )}
                </div>
                <div className=" w-[50%]">
                  <Button
                    className=" !bg-transparent !font-bold !text-[#4a4a4a] !text-[16px] duration-250 !hover:text-black"
                    onPress={onOpen}
                  >
                    尺寸表
                  </Button>
                  <Modal
                    isOpen={isOpen}
                    className=" !z-[999999999] !mt-[10%]"
                    onOpenChange={onOpenChange}
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col p-10 gap-1">
                            尺寸表
                          </ModalHeader>
                          <ModalBody>
                            <img src="/images/S__4751370.jpg" alt="" />
                          </ModalBody>
                          <ModalFooter></ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              </div>

              {/* Color and Size Selectors */}
              {product.attributes.find((attr) => attr.name === "color") && (
                <div className="flex gap-2">
                  {product.attributes
                    .find((attr) => attr.name === "color")
                    .options.map((option, index) => (
                      <button
                        key={index}
                        className={`px-4 mt-[30px] py-2 rounded-md ${
                          selectedAttributes.color === option
                            ? "bg-[#B4746B] text-white"
                            : "border border-black"
                        }`}
                        onClick={() =>
                          setSelectedAttributes({
                            ...selectedAttributes,
                            color: option,
                          })
                        }
                      >
                        {option}
                      </button>
                    ))}
                </div>
              )}

              {/* Size Selector */}
              {product.attributes.find((attr) => attr.name === "size") && (
                <div className="flex gap-2 mt-4">
                  {product.attributes
                    .find((attr) => attr.name === "size")
                    .options.map((option, index) => (
                      <button
                        key={index}
                        className={`px-4  py-2 rounded-md ${
                          selectedAttributes.size === option
                            ? "bg-[#B4746B] text-white"
                            : "border border-black"
                        }`}
                        onClick={() =>
                          setSelectedAttributes({
                            ...selectedAttributes,
                            size: option,
                          })
                        }
                      >
                        {option}
                      </button>
                    ))}
                </div>
              )}

              {/* Quantity Selector and Add to Cart Button */}
              <div className="mt-4">
                <div className="mt-6 rounded-full">
                  <label
                    htmlFor="quantity"
                    className="text-sm  font-medium text-gray-700"
                  >
                    購買數量：
                  </label>
                  <br></br>
                  <div className=" items-center mt-2 border rounded-full p-3 inline-flex overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-gray-600 hover:text-gray-900  focus:outline-none  "
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-16 text-center px-2 py-1 text-lg font-semibold text-gray-700 bg-white border-0   focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-900  focus:outline-none  "
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-2 mt-[40px] font-medium bg-[#B4746B] text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                >
                  加入購物車
                </button>

                <div className="total-price mt-4">金額總計: ${totalPrice}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex px-[10vw] xl:px-[20vw] w-full flex-col">
          <Tabs aria-label="Options">
            <Tab key=" 商品說明" title=" 商品說明">
              <Card>
                <CardBody>
                  <div className="product_content]">
                    <h2 className="font-bold text-xl text-[#B4746B]"></h2>
                    <div className="py-[20px]">{customParser(description)}</div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="購買須知" title="購買須知">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="其他資訊" title="其他資訊">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
        {/* Render Product Description with custom Image handling */}
      </div>
    </Layout>
  );
};

export default ProductPage;
