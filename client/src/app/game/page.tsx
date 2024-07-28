import React from "react";
import Image from "next/image";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MemoryGame from "@/components/game/MemoryCard";

export default function Home() {
    return (
        <>
            <Navbar />
            <MemoryGame />
            <Footer />
        </>
    );
}