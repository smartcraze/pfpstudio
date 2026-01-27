"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Link from 'next/link';
import { Button } from "./ui/button";
import Image from "next/image";
import { NoiseBackground } from "./ui/noise-background";

export function HeroScrollDemo() {
  const TitleComponent = (
    <>
      <h1 className="text-3xl md:text-4xl font-semibold text-black dark:text-white mb-8 text-center">
        Create Stunning Profile Pictures <br />
        <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none block">
          That Stand Out
        </span>
      </h1>
      <div className="mb-8 text-center">
        <Link href="/upload">
          <NoiseBackground
            containerClassName="w-fit p-2 rounded-full mx-auto"
            gradientColors={[
              "rgb(255, 100, 150)",
              "rgb(100, 150, 255)",
              "rgb(255, 200, 100)",
            ]}
          >
            <Button className="h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]">
              Start Creating &rarr;
            </Button>
          </NoiseBackground>
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="hidden md:block">
        <ContainerScroll titleComponent={TitleComponent}>
          <Image
            src="/image.png"
            alt="Profile Picture Examples"
            width={1200}
            height={800}
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </ContainerScroll>
      </div>

      <div className="md:hidden flex flex-col items-center px-4 pt-10 pb-20">
        {TitleComponent}
        <div className="mt-8 w-full rounded-[30px] border-4 border-[#6C6C6C] p-2 bg-[#222222] shadow-2xl">
          <div className="overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
            <Image
              src="/image.png"
              alt="Profile Picture Examples"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
