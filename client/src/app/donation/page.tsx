import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CommunityHero from "@/components/community/CommunityHero";
import DonationSecion from "@/components/donation/DonationSection";
export default function Event() {
    return (
        <>
            <Navbar />
            <CommunityHero />
            <DonationSecion />
            <Footer />
        </>
    );
}