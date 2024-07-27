import React from "react";
import Image from "next/image";
import EventDetailsPage from "@/components/events/EventDetailsSection";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
    return (
        <>
            <Navbar />
            <EventDetailsPage />
            <Footer />
        </>
    );
}