"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@/components/Navbar/Navbar.jsx";
import Banner from "@/components/banner";
import Footer from "@/components/ui/footer.jsx";
import Head from "next/head";

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      {/* 全局 Head 設置 */}
      <Head>
        <title>星嶼童裝-韓系童裝｜小童、嬰幼兒服飾、兒童服飾配件｜台中童裝</title>
        <meta name="description" content="韓系童裝｜小童、嬰幼兒服飾、兒童服飾配件｜台中童裝" />
        <meta name="keywords" content="產品, 購物, 優惠" />
        <meta name="author" content="星嶼童裝" />
        <link rel="icon" href="/fstarislandbaby-icon.ico" />
        {/* Open Graph (Facebook & LinkedIn) */}
        <meta property="og:title" content="星嶼童裝-韓系童裝｜小童、嬰幼兒服飾、兒童服飾配件｜台中童裝" />
        <meta property="og:description" content="星嶼童裝-韓系童裝｜小童、嬰幼兒服飾、兒童服飾配件｜台中童裝" />
        <meta property="og:image" content="/default-og-image.jpg" />
        <meta property="og:url" content="https://www.starislandbaby.com" />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="星嶼童裝-韓系童裝｜小童、嬰幼兒服飾、兒童服飾配件｜台中童裝" />
        <meta name="twitter:description" content="韓系童裝｜小童、嬰幼兒服飾、兒童服飾配件｜台中童裝" />
        <meta name="twitter:image" content="/default-og-image.jpg" />
      </Head>

      <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <Navbar />
            {children}
          </NextThemesProvider>
        </NextUIProvider>
        <Banner />
        <Footer />
      </div>
    </>
  );
}
