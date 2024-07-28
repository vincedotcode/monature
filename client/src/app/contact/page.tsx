import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact/ContactForm";
export default function Event() {
    return (
        <>
            <Navbar />
            <div className="m-8">
                <ContactForm />
            </div>
            <Footer />
        </>
    );
}