// pages/_app.js
import '../src/globals.css'; // 确保路径正确
import { NextUIProvider } from '@nextui-org/react'; // 如果使用 NextUI 的 Provider
import { CartProvider } from "../components/context/CartContext"; // 引入 CartProvider

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
    <CartProvider>
      <Component {...pageProps} />
        </CartProvider>
    </NextUIProvider>
  );
}

export default MyApp;
