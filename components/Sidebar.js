import { useState } from "react";
import { useCart } from "./context/CartContext";
import { motion } from "framer-motion";

import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import {Button} from "@heroui/react";
const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "/images/line (2).png",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "/images/line (2).png",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "/images/line (2).png",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "/images/line (2).png",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
     "/images/line (2).png",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
    "/images/line (2).png",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // 控制側邊欄顯示與否
  const { cartItems, totalPrice, removeFromCart, updateQuantity } = useCart();

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // 切換側邊欄的開關
  };

  // 將側邊欄中的商品轉換為 WooCommerce 需要的格式
  const getWooCommerceFormData = () => {
    const addToCartIds = [];
    const quantities = [];

    // 獲取每個商品的ID和數量
    cartItems.forEach((item) => {
      addToCartIds.push(item.id);
      quantities.push(item.quantity);
    });

    return { addToCartIds, quantities };
  };

  // 生成 URL 並在提交表單前打印到 console
  const handleSubmit = (e) => {
    e.preventDefault(); // 防止表單實際提交

    const { addToCartIds, quantities } = getWooCommerceFormData();

    let url = "https://starislandbaby.com/test/cart/?add-to-cart=";

    // 添加所有商品 ID 和數量到 URL 中
    url += addToCartIds.join(",");
    url += "&quantity=" + quantities.join(",");

    console.log("生成的 URL:", url);

    // 跳轉到 WooCommerce 購物車頁面
    window.location.href = url;
  };

  return (
    <div className=" bg-gray-200 fixed w-[100vw] z-[99999999999] right-0 top-0">
       <div className="relative w-full flex">
          <button
        onClick={toggleSidebar}
        className=" top-1/2 absolute right-[560px] bg-blue-500 w-[50px] text-white p-2 rounded-l-md"
      >
        {isOpen ? "收起" : "展開"} 側邊欄
      </button>

        <motion.div
  className="sidebar absolute z-[99999999] top-0 right-0 w-[500px] bg-white  border  h-[100vh]"
  initial={{ x: '100%' }} // 初始位置在右側以外
  animate={{ x: isOpen ? 0 : '100%' }} // 當開啟時，從右側滑入；當關閉時，向右滑出
  transition={{ duration: 0.3 }}
>
   


        <h2>購物車</h2>
        {cartItems.length === 0 ? (
          <p>您的購物車是空的</p>
        ) : (
          <ul className="overflow-hidden relative flex flex-col">
            {cartItems.map((item, index) => (
              <li key={index} className="flex px-5  justify-center items-center w-full overflow-scroll !border-gray-200 gap-4 border-b py-2">
                {/* 商品圖片 */}
                <div className="img-wrap w-1/2">
                  <img src={item.image} alt={item.name} width={50} height={50} className="w-full" />
                </div>
                {/* 商品名稱 */}
                
                {/* 商品價格和數量 */}
                <div className="w-1/2 flex justify-between h-full">

                <div className="ml-auto text-right">
                  <div>
                  <span className="block font-bold">{item.name}</span>
                  <span>顏色: {item.color}</span>
                  <span>尺寸: {item.size}</span>
                </div>
                 <div>
                   <span>${item.price}</span>
                  <p>數量:
                    <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}>-</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}>+</button>
                  </p>
                  <button onClick={() => removeFromCart(item.id, item.color, item.size)} className="text-red-500">刪除</button>
                 </div>
                </div></div>
              </li>
            ))}
          </ul>
        )}
        <div className=" w-full text-left mt-3 pl-9 bottom-0 left-0 py-2 ">
          <p className="text-[20px] ">訂單總金額: ${totalPrice}</p>
        </div>

        {/* WooCommerce 加入購物車的表單 */}
        <form onSubmit={handleSubmit} className="p-4 flex ">
        {/* <ShinyButton className="w-full   py-2  !rounded-2xl bg-[#536b86] border">
  訂單 結帳去
</ShinyButton> */}
  <Button
   type="submit"
      className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      radius="full"
    >
      訂單 結帳去
    </Button>
 {/* <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div> */}
        </form>
     
      </motion.div>
       
       </div>

      {/* 控制側邊欄顯示與隱藏的按鈕 */}
  
    </div>
  );
};

export default Sidebar;


