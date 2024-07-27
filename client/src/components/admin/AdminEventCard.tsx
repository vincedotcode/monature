import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Leaf, TreeDeciduous, Mountain, Locate } from 'lucide-react';
import { format } from 'date-fns';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventProps {
    _id?: string;
    name: string;
    description: string;
    date: string;
    location: string;
    latitude: number;
    longitude: number;
    beforePicture: string;
    afterPicture?: string;
    onDelete: (id: string) => void;
}

const EventComponent: React.FC<EventProps> = ({
    _id,
    name,
    description,
    date,
    location,
    beforePicture,
    afterPicture,
    onDelete
}) => {
    const eventDate = new Date(date);
    const currentDate = new Date();
    const isUpcoming = currentDate < eventDate;
    const [showDialog, setShowDialog] = useState(false);

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
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the event.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => _id && onDelete(_id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default EventComponent;
