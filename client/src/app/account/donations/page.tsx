"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/helper/darkmode";
import { useAuth } from '@/hooks/useUserData';
import { getDonationByUser, Donation } from "@/services/donation";
import Loader from "@/components/loader";  // Ensure the path is correct for your Loader component

const MyDonations = () => {
    const { getUserData } = useAuth();
    const user = getUserData();
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            getDonationByUser(user._id)
                .then(setDonations)
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [user]);

    return (
        <div className="h-screen">
            <div className="flex items-center justify-center flex-col">
                <div className="self-start mb-16 mt-3 flex justify-between w-full">
                    <Link href="/">
                        <Button className="mx-3">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                    </Link>
                    <div className="mx-3">
                        <ModeToggle />
                    </div>
                </div>
                <Card className="w-full max-w-2xl mb-3">
                    <CardHeader>
                        <CardTitle className="text-2xl">My Donations</CardTitle>
                        <CardDescription>
                            View All Your Donations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : donations.length > 0 ? (
                            donations.map(donation => (
                                <DonationCard key={donation._id} donation={donation} />
                            ))
                        ) : (
                            <p>No donations found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const DonationCard = ({ donation }: { donation: Donation }) => (
    <Card className="w-full mb-4">
        <CardHeader>
            <CardTitle>{donation.title}</CardTitle>
            <CardDescription>{donation.subHead}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>{donation.description}</p>
            <p>Amount to be Donated: ${donation.amountToBeDonated}</p>
            <p>Donations Received: ${donation.donationsReceived}</p>
        </CardContent>
    </Card>
);

export default MyDonations;
