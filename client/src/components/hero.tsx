"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import FlipText from "@/components/magicui/flip-text";

export default function HeroSectionCentredWithImage() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden py-24 lg:py-32">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <FlipText
              className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-black dark:text-white md:text-7xl md:leading-[5rem]"
              word="Nano-Frontiers: Reshaping Tech"
            />
            <p className="mt-3 text-xl text-muted-foreground">
              Nano-computing breaks barriers, unlocking new tech horizons.
            </p>
          </div>
          <div className="mt-10 relative max-w-5xl mx-auto">
            <div className="relative w-full h-96"> {/* Set a specific height */}
              <Image
                src="/assets/hero.jpg"
                className="rounded-xl"
                alt="Image Description"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="absolute bottom-12 -start-20 -z-[1] w-48 h-48 bg-gradient-to-b from-primary-foreground via-primary-foreground to-background p-px rounded-lg">
              <div className="w-48 h-48 rounded-lg bg-background/10" />
            </div>
            <div className="absolute -top-12 -end-20 -z-[1] w-48 h-48 bg-gradient-to-t from-primary-foreground via-primary-foreground to-background p-px rounded-full">
              <div className="w-48 h-48 rounded-full bg-background/10" />
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
