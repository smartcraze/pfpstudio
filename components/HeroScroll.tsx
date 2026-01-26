"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Link from 'next/link';
import { Button } from "./ui/button";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white mb-8">
              Create Stunning Profile Pictures <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                That Stand Out
              </span>
            </h1>
            <div className="mb-8">
                 <Link href="/upload">
                    <Button size="lg" className="rounded-full text-lg px-8 py-6 shadow-xl hover:scale-105 transition-transform bg-foreground text-background hover:bg-foreground/90">
                        Start Creating Now
                    </Button>
                 </Link>
            </div>
          </>
        }
      >
        <Image
          src="/image.png"
          alt="Profile Picture Examples"
          width={1200}
          height={800}
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </ContainerScroll>
    </div>
  );
}
