import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useCart } from "../../components/context/CartContext";
import Layout from "../Layout";
// Swiper imports
import { CardStack } from "../../components/ui/card-stack";
import Accordion from "../../components/Accordion/Accordion.jsx";
import SwiperCard from "../../components/SwiperCarousel/SwiperCardTravel.jsx";
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
  const url = `https://starislandbaby.com/test/wp-json/wc/v3/products?consumer_key=ck_ec41b174efc5977249ffb5ef854f6c1fdba1844b&consumer_secret=cs_d6c8d7ba3031b522ca93e6ee7fb56397b8781d1f&per_page=100`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error("API 请求失败:", response.status);
    return { paths: [], fallback: "blocking" };
  }

  const products = await response.json();
  const paths = products
    .filter((product) => product.slug) // 只保留有有效 slug 的产品
    .map((product) => {
      console.log(`原始 slug: ${product.slug}`); // 可选：查看 slug 值
      return { params: { slug: product.slug } };
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
    console.log(`收到的 slug: ${slug}`); // 打印收到的 slug（URL 中的 slug）

    const url = `https://starislandbaby.com/test/wp-json/wc/v3/products?consumer_key=ck_ec41b174efc5977249ffb5ef854f6c1fdba1844b&consumer_secret=cs_d6c8d7ba3031b522ca93e6ee7fb56397b8781d1f&slug=${slug}`;
    const response = await fetch(url);

    if (!response.ok) {
      return { notFound: true };
    }

    const data = await response.json();

    // 你可以打印 API 返回的 slug（已解码的状态）
    data.forEach((product) => {
      console.log(
        `API 返回的 slug (解码后): ${decodeURIComponent(product.slug)}`
      ); // 打印解码后的 slug
    });

    // 解码并比较 slug
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
  const { addToCart } = useCart(); // 使用購物車的 addToCart 函數

  const [selectedAttributes, setSelectedAttributes] = useState({
    color:
      product.default_attributes.find((attr) => attr.name === "color")
        ?.option || "defaultColor", // 預設顏色
    size:
      product.default_attributes.find((attr) => attr.name === "size")?.option ||
      "defaultSize", // 預設尺寸
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

    const colorOptions =
      product.attributes.find((attr) => attr.name === "color")?.options || [];
    const sizeOptions =
      product.attributes.find((attr) => attr.name === "size")?.options || [];

    const colorIndex = colorOptions.indexOf(color);
    const sizeIndex = sizeOptions.indexOf(size);

    if (colorIndex === -1 || sizeIndex === -1) {
      return null; // 顏色或尺寸不在選項中，返回 null
    }

    const variations = product.variations;
    const variantIndex = colorIndex * sizeOptions.length + sizeIndex;

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
    if (!variantId) {
      alert("Please select a valid color and size.");
      return;
    }

    const cartProduct = {
      id: variantId,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0].src,
      color: selectedAttributes.color, // 直接使用 selectedAttributes 中的 color
      size: selectedAttributes.size, // 直接使用 selectedAttributes 中的 size
    };

    // 在這裡檢查 cartProduct 是否正確
    console.log("Adding to cart:", cartProduct);

    addToCart(cartProduct); // 將商品添加到購物車
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
  const CARDS = [
    {
      id: 0,
      name: "M張哲瑋",
      designation: "",
      content: (
        <p>
          These cards are amazing, in my project. Framer motion is a godsend ngl
          tbh fam 🙏
        </p>
      ),
    },
    {
      id: 1,
      name: "張哲瑋",
      designation: "",
      content: (
        <p>
          I dont like this Twitter thing, so that it can easily be confused with
          adult sites.
        </p>
      ),
    },
    {
      id: 2,
      name: "張哲瑋",
      designation: "",
      content: (
        <p>The first rule of is that you DO NOT TALK about fight club.</p>
      ),
    },
  ];

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
        <meta
          property="og:image"
          content={product.images?.[0]?.src || "/default-image.jpg"}
        />
      </Head>

      <div
        className="flex flex-col items-center   mx-auto sm:px-[50px] lg:px-[20px] 2xl:px-[200px]"
        data-aos="fade-up"
      >
        <div className="product_top_info w-full px-[20px] sm:px-[50px] xl:px-[100px] pt-[210px] sm:pt-[200px] xl:pt-[200px]">
          <div className="flex lg:flex-row flex-col justify-center items-center">
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
                        <div className="flex h-full w-[90%] xl:w-[80%] mx-auto items-center justify-center">
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
                    className="thumbs mt-3 w-[90%] xl:w-[80%] mx-auto"
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
            <div className="product_info mt-[40px] md:mt-[80px] p-2 lg:p-8 w-full lg:w-1/2 flex flex-col justify-center">
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
                    className=" !z-[999999999] bg-white overflow-scroll !static !mt-[8%]"
                    onOpenChange={onOpenChange}
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalBody>
                            <Image
                              width={500}
                              height={700}
                              className=""
                              src="/images/size-chart.jpg"
                              alt="尺寸表"
                              placeholder="empty"
                              loading="lazy"
                            />
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
                <div className="flex gap-2 flex-wrap mt-5 sm:w-[80%] w-full">
                  {product.attributes
                    .find((attr) => attr.name === "color")
                    .options.map((option, index) => (
                      <button
                        key={index}
                        className={`px-4 mt-[3px] py-2 rounded-md ${
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
                <div className="flex gap-2 mt-8 flex-wrap  w-full sm:w-[70%]">
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
                    className="text-md  font-bold text-gray-700"
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
                <div className="total-price text-md mt-4">
                  金額總計: ${totalPrice}
                </div>
                <button
                  onClick={handleAddToCart}
                  class="group mb-[50px] mt-5 relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white font-medium"
                >
                  <div class="inline-flex h-12 translate-y-0 items-center justify-center px-6 text-neutral-950 transition duration-500 group-hover:-translate-y-[150%]">
                    立即購買
                  </div>

                  <div class="absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
                    <span class="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-[#B4746B] text-white transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
                    <span class="z-10 text-white">添加至購物車</span>
                  </div>
                </button>
                <Accordion />
                <div className="payment mt-8 border border-gray-200 w-[500px] rounded-[20px] p-8">
                  <b className="font-bold text-[20px]">支付方式</b>
                  <div>
                    <img
                      src="/images/Payment-Icons-1-removebg-preview.png"
                      alt=""
                      className="w-[60%]"
                    />
                  </div>
                </div>

                <div className="mb-5 h-[200px] flex items-center justify-center w-full">
                  <CardStack items={CARDS} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex px-[10vw] xl:px-[10vw] w-full flex-col">
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
                  <Image
                    src="/images/term.png"
                    placeholder="empty"
                    loading="lazy"
                    className="max-w-[600px]"
                    width={600}
                    height={800}
                    alt="購買資訊"
                  ></Image>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>

          <h2 cl>你可能也會喜歡</h2>
          <SwiperCard />
        </div>

        {/* Render Product Description with custom Image handling */}
      </div>
      {/* <Lens /> */}
    </Layout>
  );
};

export default ProductPage;
