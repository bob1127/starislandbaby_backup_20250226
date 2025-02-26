import { createContext, useState, useContext, useEffect } from "react";

// 創建一個空的購物車 context
const CartContext = createContext();

// CartProvider 組件，用於包裹應用並提供購物車上下文
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // 確保只有在客戶端執行時才使用 localStorage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  // 更新 localStorage 中的購物車資料
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // 計算總價
  const calculateTotalPrice = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // 每次 cartItems 更新時計算總價
  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  // 添加商品到購物車
  // 添加商品到購物車
const addToCart = (product) => {
  if (!product.color || !product.size) {
    console.warn("商品缺少顏色或尺寸資料", product);
    return;
  }

  // 檢查是否已經有相同的商品在購物車中
  const existingItem = cartItems.find(
    (item) =>
      item.id === product.id &&
      item.color === product.color &&
      item.size === product.size
  );

  if (existingItem) {
    // 如果已經有相同商品，則更新數量
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === existingItem.id &&
        item.color === existingItem.color &&
        item.size === existingItem.size
          ? { ...item, quantity: item.quantity + product.quantity } // 增加數量
          : item
      )
    );
  } else {
    // 如果沒有相同商品，則新增商品到購物車
    setCartItems((prevItems) => [...prevItems, product]);
  }
};


  // 刪除商品
// 刪除商品
const removeFromCart = (productId, color, size) => {
  const updatedCartItems = cartItems.filter(
    (item) =>
      item.id !== productId ||
      item.color !== color ||
      item.size !== size
  );
  setCartItems(updatedCartItems);
  // 更新 localStorage
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
};

// 清空購物車
const clearCart = () => {
  setCartItems([]); // 清空購物車
  localStorage.removeItem("cartItems"); // 清除 localStorage 中的購物車資料
};

  // 修改商品數量
  const updateQuantity = (productId, color, size, newQuantity) => {
    if (newQuantity <= 0) return; // 防止數量為 0 或負數

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// 自訂 Hook，方便其他組件使用購物車資料
export const useCart = () => useContext(CartContext);
