import React from 'react';
import Link from 'next/link';
import { Calendar, Leaf, TreeDeciduous, Mountain, Locate, ChevronRightIcon, CheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";

interface EventProps {
    id?: string;
    name: string;
    description: string;
    date: string;
    location: string;
    latitude: number;
    longitude: number;
    beforePicture: string;
    afterPicture?: string;
}

const EventComponent: React.FC<EventProps> = ({
    id,
    name,
    description,
    date,
    location,
    beforePicture,
    afterPicture
}) => {
    const eventDate = new Date(date);
    const currentDate = new Date();
    const isUpcoming = currentDate < eventDate;

    return (
        <div className="w-full max-w-sm p-6 grid gap-6 rounded-lg hover:bg-muted transition-colors">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{name}</h3>
                <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 fill-primary" />
                    <TreeDeciduous className="w-5 h-5 fill-primary" />
                    <Mountain className="w-5 h-5 fill-primary" />
                </div>
            </div>
            <div className="grid gap-4">
                <img
                    src={isUpcoming ? beforePicture : afterPicture || beforePicture}
                    alt={name}
                    width={600}
                    height={400}
                    className="rounded-md object-cover aspect-[3/2]"
                />
                <div className="text-muted-foreground">
                    {description}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{format(eventDate, 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Locate className="w-4 h-4 text-muted-foreground" />
                    <span>{location}</span>
                </div>
            </div>
            {isUpcoming && <Badge variant="default">Upcoming</Badge>}
            <div className="mt-4">
                <Link href={`/events/${id}`}>
                    <AnimatedSubscribeButton
                        buttonColor="#000000"
                        buttonTextColor="#ffffff"
                        subscribeStatus={false}
                        initialText={
                            <span className="group inline-flex items-center">
                                View Event{" "}
                                <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        }
                        changeText={
                            <span className="group inline-flex items-center">
                                <CheckIcon className="mr-2 h-4 w-4" />
                                Viewing{" "}
                            </span>
                        }
                    />
                </Link>
            </div>
        </div>
    );
};

export default EventComponent;
