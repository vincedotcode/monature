import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ChatHero() {
    return (
        <div className="relative w-full h-[400px]">
            <img src="/assets/aichat.jpg" alt="Hero" className="absolute inset-0 object-cover w-full h-full" />
            <div className="absolute inset-0 flex flex-col justify-center gap-4 p-4 md:gap-10 bg-black bg-opacity-50">
                <div className="grid gap-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-white">
                        Chat with Our AI
                    </h1>
                    <p className="max-w-[700px] text-gray-200 mx-auto">
                        Get instant answers to your questions about sustainable development goals and our community events. Start a conversation with our AI now!
                    </p>
                </div>
                <div className="text-center">
                    <Link href="/ai">
                        <Button variant="default" className="px-8 py-3">
                            Start Chatting
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
