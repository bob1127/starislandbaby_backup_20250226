"use client";

import Image from "next/image";
export default function App() {
  return (
    <div className="h-auto">
      <a
        href="/"
        className="Logo  rounded-[50px] block py-2  text-center w-[80px] text-[30px] font-extrabold  px-3 text-black"
      >
        <Image
          src="/images/company-logo.png"
          placeholder="empty"
          loading="lazy"
          alt="company-logo"
          width={80}
          height={80}
        ></Image>
      </a>
    </div>
  );
}
