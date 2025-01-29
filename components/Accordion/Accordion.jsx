"use client"
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { CldVideoPlayer } from 'next-cloudinary';
export default function App() {
    // const defaultContent =
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <Accordion variant="splitted">
            <AccordionItem className="" key="1" aria-label="Accordion 1" title="Step-1">

                <p className="dark:text-white">收集一號袋檢測呼吸樣品</p>
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Step-2">
                <p className="dark:text-white">將一號袋插入UP100</p>

                <video className="w-full" src="https://www.ultraehp.com/video/hero-video%20-%20HD%201080p.mov" type="video/mov" lazy-video="" data-video-responsive="" playsinline="" prop="" loop="" autoplay=""></video>
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="步驟3.">
                <p className="dark:text-white">引用口服尿素並等待</p>
                <video className="w-full" src="https://www.ultraehp.com/video/hero-video%20-%20HD%201080p.mov" type="video/mov" lazy-video="" data-video-responsive="" playsinline="" prop="" loop="" autoplay=""></video>
            </AccordionItem>
            <AccordionItem key="4" aria-label="Accordion 4" title="Step-4">
                <p className="dark:text-white">收集二號袋檢測呼吸樣本</p>
                <video className="w-full" src="https://www.ultraehp.com/video/hero-video%20-%20HD%201080p.mov" type="video/mov" lazy-video="" data-video-responsive="" playsinline="" prop="" loop="" autoplay=""></video>
            </AccordionItem>
            <AccordionItem key="5" aria-label="Accordion 5" title="Step-5">
                <p className="dark:text-white">將二號袋插入UP100 </p>
                <video className="w-full" src="https://www.ultraehp.com/video/hero-video%20-%20HD%201080p.mov" type="video/mov" lazy-video="" data-video-responsive="" playsinline="" prop="" loop="" autoplay=""></video>
            </AccordionItem>
            <AccordionItem key="6" aria-label="Accordion 6" title="Step-6">
                <p className="dark:text-white">取得檢驗成果</p>
                <video className="w-full" src="https://www.ultraehp.com/video/hero-video%20-%20HD%201080p.mov" type="video/mov" lazy-video="" data-video-responsive="" playsinline="" prop="" loop="" autoplay=""></video>
            </AccordionItem>
        </Accordion>
    );
}
