import React from "react";
import Image from "next/image";
import EnvironmentHero from "@/components/events/EventHero";
import Navbar from "@/components/navbar";
import EventSection from "@/components/events/EventSection";
import Footer from "@/components/footer";

export default function Event() {
    return (
        <>
            <Navbar />
            <EnvironmentHero />
            <div className="mt-3">
                <div className="text-center mt-8 p-2">
                    <h2 className="text-2xl font-bold">Join Our Events</h2>
                    <p className="text-gray-600 mt-2">
                        Participate in our events and make a difference in the environment. Connect with like-minded individuals and help us create a sustainable future.
                    </p>
                </div>
                <EventSection />

            </div>
            <Footer />
        </>
    );
}
