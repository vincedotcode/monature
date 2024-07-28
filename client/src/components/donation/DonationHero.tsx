import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DonationHero() {
    return (
        <div className="relative w-full h-[400px]">
            <img src="/assets/donation.jpg" alt="Hero" className="absolute inset-0 object-cover w-full h-full" />
            <div className="absolute inset-0 flex flex-col justify-center gap-4 p-4 md:gap-10 bg-black bg-opacity-50">
                <div className="grid gap-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-white">
                        Support Our Cause
                    </h1>
                    <p className="max-w-[700px] text-gray-200 mx-auto">
                        Your donations help us organize more events and initiatives to protect the environment. Together, we can make a big impact.
                    </p>
                </div>
                <div className="text-center">
                    <Link href="/contact">
                        <Button variant="default" className="px-8 py-3">
                            Contact Us To Host A Donation
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
