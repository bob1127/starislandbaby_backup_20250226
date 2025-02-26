"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const CartPage = () => {
  const [cart, setCart] = useState(null);

 useEffect(() => {
   const fetchCart = async () => {
     try {
       const res = await fetch("/api/cart"); // 改為請求本地 API
       const data = await res.json();
       console.log("Cart Data:", data); // 輸出資料，檢查是否正確
       setCart(data);
     } catch (error) {
       console.error("無法獲取購物車資料:", error);
     }
   };
   fetchCart();
 }, []);


  if (!cart) return <p>載入中...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl">購物車</h1>
      {cart.items.length > 0 ? (
        <ul>
          {cart.items.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} - ${item.totals.line_total}
            </li>
          ))}
        </ul>
      ) : (
        <p>購物車是空的</p>
      )}
      <Link
        href="/checkout"
        className="bg-green-500 text-white px-4 py-2 mt-4 inline-block"
      >
        前往結帳
      </Link>
    </div>
  );
};

export default CartPage;
