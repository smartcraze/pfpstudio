"use client";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";

import { FileUpload } from "@/components/ui/file-upload";

export function HeroScrollDemo({ onFileSelect }: { onFileSelect?: (file: File) => void }) {
  const handleFileUpload = (files: File[]) => {
    if (files.length > 0 && onFileSelect) {
      onFileSelect(files[0]);
    }
  };

  const TitleComponent = (
    <>
      <h1 className="text-3xl md:text-4xl font-semibold text-black dark:text-white mb-8 text-center">
        Create Stunning Profile Pictures <br />
        <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none block">
          That Stand Out
        </span>
      </h1>
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-neutral-100 dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg mb-8">
        <FileUpload onChange={handleFileUpload} />
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
