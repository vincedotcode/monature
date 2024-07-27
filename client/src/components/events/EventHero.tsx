import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EnvironmentHero() {
    return (
        <div className="relative w-full h-[400px]">
            <img src="/assets/environment.jpg" alt="Hero" className="absolute inset-0 object-cover w-full h-full" />
            <div className="absolute inset-0 flex flex-col justify-center gap-4 p-4 md:gap-10 bg-black bg-opacity-50">
                <div className="grid gap-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-white">
                        Join Us in Making a Difference
                    </h1>
                    <p className="max-w-[700px] text-gray-200 mx-auto">
                        Participate in our cleanup and environment-helping events. Together, we can create a cleaner and greener world.
                    </p>
                </div>
                <div className="text-center">
                    <Button variant="default" className="px-8 py-3">
                        Contact Us to Add Your Event
                    </Button>
                </div>
            </div>
        </div>
    );
}
