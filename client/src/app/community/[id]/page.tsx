import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CommunityHero from "@/components/community/CommunityHero";
import PostSection from "@/components/community/posts/PostSection";

export default function Event() {
    return (
        <>
            <Navbar />
            <CommunityHero />
            < PostSection />
            <Footer />
        </>
    );
}