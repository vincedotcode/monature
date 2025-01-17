import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DonationHero from "@/components/donation/DonationHero";
import DonationSecion from "@/components/donation/DonationSection";
export default function Event() {
    return (
        <>
            <Navbar />
            <DonationHero />
            <DonationSecion />
            <Footer />
        </>
    );
}