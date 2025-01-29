"use client";


import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "../components/Navbar/Navbar.jsx";
import Banner from "@/components/banner";
import Footer from "@/components/ui/footer.jsx";

// 根佈局組件
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
  );
}
