"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createDonationPayment, addUserDonation } from "@/services/donation";
import Loader from "@/components/loader"; // Assume you have a loader component
import { useAuth } from "@/hooks/useUserData"; // Assume you have a useAuth hook
import confetti from "canvas-confetti";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export interface Donor {
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  amountDonated: number;
  _id: string;
  donatedAt: string;
}

export interface Donation {
  _id: string;
  title: string;
  subHead: string;
  description: string;
  amountToBeDonated: number;
  donationsReceived: number;
  donors: Donor[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface DonationComponentProps {
  donation: Donation;
  onDonationSuccess?: () => void; // Function to emit value to parent on success
}

const DonationComponent: React.FC<DonationComponentProps> = ({ donation, onDonationSuccess }) => {
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showCancelAlert, setShowCancelAlert] = useState<boolean>(false);
  const [confettiTriggered, setConfettiTriggered] = useState<boolean>(false);
  const { getUserData } = useAuth();
  const user = getUserData();
  const router = useRouter();

  const totalDonors = donation.donors.length;
  const percentageRaised = ((donation.donationsReceived / donation.amountToBeDonated) * 100).toFixed(2);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('success') && !confettiTriggered) {
      const storedAmount = sessionStorage.getItem('donationAmount');
      if (storedAmount) {
        setDonationAmount(Number(storedAmount));
        setShowSuccessAlert(true);
        triggerConfetti();
        if (onDonationSuccess) {
          onDonationSuccess();
          if (user) {
            handleAddUserDonation(Number(storedAmount));
          }
        }
        setConfettiTriggered(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 5000);
        searchParams.delete('success');

      }
    } else if (searchParams.has('cancel')) {
      setShowCancelAlert(true);
      setTimeout(() => {
        setShowCancelAlert(false);
      }, 5000);
      searchParams.delete('cancel');
    }
  }, [onDonationSuccess, user, confettiTriggered, router]);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleDonate = async () => {
    if (donationAmount <= 0 || !user) return;

    setLoading(true);
    sessionStorage.setItem('donationAmount', donationAmount.toString());

    try {
      const checkoutUrl = await createDonationPayment(user.email, donationAmount);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Failed to create checkout session", error);
      setLoading(false);
    }
  };

  const handleAddUserDonation = async (amount: number) => {
    if (!user || !donation) return;

    try {
      await addUserDonation(donation._id, user._id, amount);
    } catch (error) {
      console.error("Failed to add user donation", error);
    }
  };

  return (
    <Card className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{donation.title}</h2>
            <p className="text-muted-foreground md:text-xl/relaxed">{donation.description}</p>
          </div>
          <div className="rounded-lg bg-card p-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">Total Donated</p>
                <p className="text-3xl font-bold">${donation.donationsReceived}</p>
              </div>
              <div className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Goal: ${donation.amountToBeDonated}
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Total Donors: {totalDonors}</p>
              <p>Percentage Raised: {percentageRaised}%</p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <Input 
                type="number" 
                placeholder="Enter amount" 
                className="flex-1" 
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
              />
              <Button type="button" onClick={handleDonate} disabled={loading}>
                {loading ? <Loader /> : "Donate"}
              </Button>
            </div>
          </div>
        </div>
        {showSuccessAlert && (
          <Alert className="mt-6">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Thank you for your donation!</AlertTitle>
            <AlertDescription>
              Your generous donation helps us to continue our mission.
            </AlertDescription>
          </Alert>
        )}
        {showCancelAlert && (
          <Alert variant="destructive" className="mt-6">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Donation Cancelled</AlertTitle>
            <AlertDescription>
              Your donation was cancelled. Please try again if you wish to contribute.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  );
};

export default DonationComponent;
