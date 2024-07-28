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
            <div className="hidden sm:block justify-center">
              <FlipText
                className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-black dark:text-white md:text-7xl md:leading-[5rem]"
                word="Mo Nature: Sustainable Development Goals"
              />
            </div>
            <div className="block sm:hidden">
              <FlipText
                className="scroll-m-20 text-2xl font-extrabold tracking-tight text-black dark:text-white"
                word="Mo"
              />
              <FlipText
                className="scroll-m-20 text-2xl font-extrabold tracking-tight text-black dark:text-white"
                word="Nature:"
              />
              <FlipText
                className="scroll-m-20 text-2xl font-extrabold tracking-tight text-black dark:text-white"
                word="Sustainable"
              />
              <FlipText
                className="scroll-m-20 text-2xl font-extrabold tracking-tight text-black dark:text-white"
                word="Development"
              />
              <FlipText
                className="scroll-m-20 text-2xl font-extrabold tracking-tight text-black dark:text-white"
                word="Goals"
              />
            </div>
            <p className="mt-3 text-xl text-muted-foreground">
              Join us in our mission to promote sustainable development and protect our environment for future generations.
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
