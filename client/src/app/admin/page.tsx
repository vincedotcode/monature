import React from "react";
import Image from "next/image";
import AdminHero from "@/components/admin/AdminHero";
import AdminSection from "@/components/admin/AdminSection";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Admin() {
    return (
        <>
            <Navbar />
            <AdminHero />
            <AdminSection />
            <Footer />
        </>
    );
}