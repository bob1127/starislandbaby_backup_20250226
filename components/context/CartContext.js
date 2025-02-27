import { createContext, useState, useContext, useEffect } from "react";

// 创建一个空的购物车 context
const CartContext = createContext();

// CartProvider 组件，用于包裹应用并提供购物车上下文
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // 侧边栏打开状态

  // 确保只有在客户端执行时才使用 localStorage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);

    // 如果购物车不为空，自动打开侧边栏
    if (storedCartItems.length > 0) {
      setIsOpen(true);
    }
  }, []);

  // 每次 cartItems 更新时重新计算总价
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  // 在 cartItems 发生变化时，确保侧边栏在有商品时自动打开
  const addToCart = (product) => {
    console.log("添加商品到购物车:", product);
    if (!product.color || !product.size) {
      console.warn("商品缺少颜色或尺寸资料", product);
      return;
    }

    // 检查是否已经有相同的商品在购物车中
    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.color === product.color &&
        item.size === product.size
    );

    if (existingItem) {
      // 如果已经有相同商品，则更新数量
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === existingItem.id &&
          item.color === existingItem.color &&
          item.size === existingItem.size
            ? { ...item, quantity: item.quantity + product.quantity } // 增加数量
            : item
        )
      );
    } else {
      // 如果没有相同商品，则新增商品到购物车
      setCartItems((prevItems) => [...prevItems, product]);
    }

    // 添加商品到购物车后，直接打开侧边栏
    setIsOpen(true);
    console.log("商品已添加，侧边栏已打开");
    console.log("当前侧边栏状态 isOpen:", true);  // 添加这行来查看 isOpen 状态
  };

  // 删除商品
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

  // 清空购物车
  const clearCart = () => {
    setCartItems([]); // 清空购物车
    localStorage.removeItem("cartItems"); // 清除 localStorage 中的购物车资料
    setIsOpen(false); // 清空购物车后关闭侧边栏
  };

  // 修改商品数量
  const updateQuantity = (productId, color, size, newQuantity) => {
    if (newQuantity <= 0) return; // 防止数量为 0 或负数

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
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalPrice,
      isOpen, // 提供 isOpen 状态
      setIsOpen // 提供控制 isOpen 的函数
    }}>
      {children}
    </CartContext.Provider>
  );
};

// 自定义 Hook，方便其他组件使用购物车数据
export const useCart = () => useContext(CartContext);
