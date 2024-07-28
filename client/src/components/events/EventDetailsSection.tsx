"use client";

import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getEventById, Event, registerForEvent } from "@/services/events";
import ParticipantComponent from "@/components/events/ParticipantCard";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useUserData";
import dynamic from "next/dynamic";
import EventMap from "@/components/events/EventMap";
import Loader from "@/components/loader";

const EventDetailsPage: React.FC = () => {
    const { id } = useParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const { getUserData } = useAuth();
    const userData = getUserData();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventDetails = await getEventById(id as string);
                setEvent(eventDetails);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchEventDetails();
    }, [id]);

    const handleRegister = async () => {
        if (!userData) {
            toast({
                title: "Error",
                description: "User not found. Please log in.",
                variant: "destructive",
            });
            return;
        }

        try {
            await registerForEvent(id as string, userData._id);
            const updatedEvent = await getEventById(id as string);
            setEvent(updatedEvent);
            toast({
                title: "Success",
                description: "Registered for the event successfully!",
                variant: "default",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: (err as Error).message,
                variant: "destructive",
            });
        }
    };

    const isUserParticipant = event?.participants?.some(participant => participant._id === userData?._id);

    if (loading) return <> <Loader /> </>;
    if (error) return <div>Error: {error}</div>;

    return (
        <main className="flex-1">
            <div className="relative w-full h-[400px]">
                <img src={event?.beforePicture} alt="Hero" className="absolute inset-0 object-cover w-full h-full" />
                <div className="absolute inset-0 flex flex-col justify-center gap-4 p-4 md:gap-10 bg-black bg-opacity-50">
                    <div className="grid gap-4 text-center">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-white">
                            {event?.name}
                        </h1>
                        <p className="max-w-[700px] text-gray-200 mx-auto">
                            {event?.description}
                        </p>
                    </div>
                    <div className="text-center space-y-4">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="default" className="px-8 py-3">
                                    {isUserParticipant ? "You are already registered" : "I want to register to this event"}
                                </Button>
                            </AlertDialogTrigger>
                            {!isUserParticipant && (
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to register for this event?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action will add you to the list of participants.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleRegister}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            )}
                        </AlertDialog>
                    </div>
                </div>
            </div>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container space-y-12 px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Participants</div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet our Participants</h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Trusted by the best teams in the world. We help teams of all sizes.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {event?.participants && event.participants.length > 0 ? (
                            event.participants.map((participant, index) => (
                                <ParticipantComponent
                                    key={index}
                                    name={participant.name}
                                    email={participant.email}
                                    avatarUrl={participant.avatarUrl}
                                />
                            ))
                        ) : (
                            <Card className="w-full">
                                <CardHeader className="flex items-center gap-4 p-4">
                                    <Avatar className="bg-primary text-primary-foreground">
                                        <AvatarImage src="/placeholder-user.jpg" />
                                        <AvatarFallback>NP</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold">No Participants</h3>
                                        <p className="text-sm text-muted-foreground">Be the first to join!</p>
                                    </div>
                                </CardHeader>
                            </Card>
                        )}
                    </div>
                </div>
            </section>

            <EventMap longitude={event?.longitude || 57.5522} latitude={event?.latitude || 20.3484} />
           
        </main>
    );
};

export default EventDetailsPage;
