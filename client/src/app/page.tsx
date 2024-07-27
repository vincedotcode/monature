import React from "react";
import Image from "next/image";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import GoalsSection from "@/components/goals/GoalsSection";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <GoalsSection />
      <Footer />

    </>
  );
}