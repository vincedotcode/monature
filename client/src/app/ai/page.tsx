import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ChatHero from "@/components/ai/ChatHero";
import Chat from "@/components/ai/chat";
export default function Event() {
    return (
        <>
            <Navbar />
            <ChatHero />
            <Chat />
            <Footer />
        </>
    );
}