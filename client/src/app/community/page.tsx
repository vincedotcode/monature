import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CommunityHero from "@/components/community/CommunityHero";
import CommunitySection from "@/components/community/CommunitySection";

export default function Event() {
    return (
        <>
            <Navbar />
            <CommunityHero />
            <CommunitySection />
            <Footer />
        </>
    );
}