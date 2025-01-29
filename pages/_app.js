// pages/_app.js
import '../src/globals.css'; // 确保路径正确
import { NextUIProvider } from '@nextui-org/react'; // 如果使用 NextUI 的 Provider

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
