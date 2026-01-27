import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function TextHoverEffectDemo() {
  return (
    <div className=" flex items-center justify-center h-72 bg-gradient-to-b from-background/50 to-background/20 backdrop-blur-sm   rounded-2xl shadow-sm">
      <TextHoverEffect text="PFPSTUDIO" />
    </div>
  );
}
