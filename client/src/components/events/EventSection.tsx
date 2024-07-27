"use client";

import React, { useEffect, useState } from 'react';
import EventComponent from '@/components/events/EventCard'; // Adjust the path if needed
import { Event, getAllEvents } from '@/services/events'; // Adjust the path if needed
import { useToast } from '@/components/ui/use-toast';
import Loading from '@/components/loader';
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";

const GetAllEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const events = await getAllEvents();
                setEvents(events);
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error fetching events',
                    description: 'There was a problem fetching the events.',
                });
                setEvents([]); // Ensure events is always an array
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [toast]);

    return (
        <div className="container mx-auto">
            {loading ? (
                <Loading />
            ) : (
                <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                    <DotPattern
                        className={cn(
                            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                        )}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {events.length > 0 ? (
                                events.map(event => (
                                    <EventComponent key={event._id} {...event} id={event._id} />
                                ))
                            ) : (
                                <p>No events found.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetAllEvents;
