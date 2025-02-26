import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import parse from "html-react-parser";

const ProductPage = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const totalPrice = product ? product.price * quantity : 0;

  const handleAddToCart = () => {
    console.log("加入購物車", { product, selectedAttributes, quantity });
  };

  return (
    <div className="product_top_info w-full  max-w-[50vw]">
      <div className="flex lg:flex-row flex-col">
        {/* 左側圖片區塊 */}
        <div className="w-full lg:w-1/2 p-2 lg:p-8 flex-col mx-auto flex justify-center items-center">
          <section className="w-full">
            <div className="container">
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
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
                        priority
                        loading="eager"
                        alt={image.alt || `Product Image ${index}`}
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
                  0: { slidesPerView: 4 },
                  768: { slidesPerView: 5 },
                  1920: { slidesPerView: 6 },
                }}
                freeMode
                watchSlidesProgress
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
                        priority
                        loading="eager"
                        alt={image.alt || `Thumbnail ${index}`}
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </div>

        {/* 右側商品資訊區塊 */}
        <div className="product_info mt-[80px] p-2 lg:p-8 w-full lg:w-1/2 flex flex-col justify-center">
          <div className="flex justify-between">
            <div className="flex w-[50%] flex-col">
              <h1>商品名稱：{product.name}</h1>
              <p className="text-[22px] mt-4">價格: ${product.price} .NT</p>
              {product.short_description && (
                <div className="short-description text-[16px] py-5 mt-4">
                  {parse(product.short_description)}
                </div>
              )}
            </div>
            <div className="w-[50%]">
              <Button
                className="!bg-transparent !font-bold !text-[#4a4a4a] !text-[16px]"
                onPress={() => setIsOpen(true)}
              >
                尺寸表
              </Button>
              <Modal
                isOpen={isOpen}
                className="!z-[999999999] !mt-[10%]"
                onOpenChange={setIsOpen}
              >
                <ModalContent>
                  <ModalHeader className="flex flex-col p-10 gap-1">
                    尺寸表
                  </ModalHeader>
                  <ModalBody>
                    <img src="/images/S__4751370.jpg" alt="Size Chart" />
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          </div>

          {/* 顏色選擇 */}
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

          {/* 尺寸選擇 */}
          {product.attributes.find((attr) => attr.name === "size") && (
            <div className="flex gap-2 mt-4">
              {product.attributes
                .find((attr) => attr.name === "size")
                .options.map((option, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-md ${
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

          {/* 數量選擇與加入購物車 */}
          <div className="mt-4">
            <div className="mt-6 rounded-full">
              <label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-700"
              >
                購買數量：
              </label>
              <div className="items-center mt-2 border rounded-full p-3 inline-flex shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 text-center px-2 py-1 text-lg font-semibold text-gray-700 bg-white border-0"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 mt-[40px] font-medium bg-[#B4746B] text-white transition-all shadow-[3px_3px_0px_black] hover:shadow-none"
            >
              加入購物車
            </button>
            <div className="total-price mt-4">金額總計: ${totalPrice}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
