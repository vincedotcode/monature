"use client";

import { useEffect, useState, useCallback } from "react";
import DonationComponent from "@/components/donation/DonationCard";
import { getAllDonations, Donation } from "@/services/donation"; // Adjust the path as needed
import Loader from "@/components/loader";
export default function Component() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDonations = useCallback(async () => {
        try {
            const data = await getAllDonations();
            setDonations(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDonations();
    }, [fetchDonations]);

    if (loading) {
        return <> <Loader /></>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 text-center">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Donations
                    </h2>
                    <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Support our various causes by donating. Your contribution will make a significant impact in our community.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {donations.map((donation) => (
                        <DonationComponent key={donation._id} donation={donation} onDonationSuccess={fetchDonations} />
                    ))}
                </div>
            </div>
        </section>
    );
}
