"use client";

import Link from "next/link";
import { ChevronLeft, CalendarIcon, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/helper/darkmode";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from '@/components/ui/loading-button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

import { uploadImage } from '@/services/image'; // Adjust the path as needed
import { addEvent } from '@/services/events';
import { useAuth } from '@/hooks/useUserData'; // Adjust the path as needed

const MyMap = dynamic(() => import('@/components/Map'), { ssr: false });

const eventFormSchema = z.object({
  name: z.string().nonempty({ message: "Event name is required" }),
  description: z.string().nonempty({ message: "Event description is required" }),
  date: z.date({
    required_error: "Event date is required.",
  }),
  location: z.string().nonempty({ message: "Event location is required" }),
  latitude: z.number().min(-90).max(90, "Invalid latitude."),
  longitude: z.number().min(-180).max(180, "Invalid longitude."),
  beforePicture: z.any().optional(),
  afterPicture: z.any().optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

export default function CreateEvent() {
  const router = useRouter();
  const { getUserData } = useAuth();
  const userData = getUserData();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      description: "",
      date: new Date(),
      location: "",
      latitude: 0,
      longitude: 0,
      beforePicture: null,
      afterPicture: null,
    }
  });

  const watchedDate = watch("date");

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageUploading(true);
      try {
        const response = await uploadImage(file);
        setImageUrl(response.imageUrl);
        toast({
          title: "Success!",
          description: "Image uploaded successfully!",
          variant: "default",
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message || 'Failed to upload image',
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: 'An unexpected error occurred',
            variant: "destructive",
          });
        }
      } finally {
        setImageUploading(false);
      }
    }
  };

  async function handleRemoveImage() {
    if (imageUrl) {
      setImageUploading(true);
      try {
        // Call remove image service
        setImageUrl(null);
        toast({
          title: "Success!",
          description: "Image removed successfully!",
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to remove image",
          variant: "destructive",
        });
      } finally {
        setImageUploading(false);
      }
    }
  }

  function handleLocationSelect(position: [number, number]) {
    setValue("latitude", position[0]);
    setValue("longitude", position[1]);
  }

  const onSubmit: SubmitHandler<EventFormValues> = async (data) => {
    if (!userData) {
      toast({
        title: "Error",
        description: "User not authenticated",
        variant: "destructive",
      });
      return;
    }

    if (imageUrl) {
      data.beforePicture = imageUrl;
    }
    try {
      const newEvent = await addEvent(data, userData._id);
      toast({
        title: "Event Created",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(newEvent, null, 2)}</code>
          </pre>
        ),
      });
      // Redirect or reset form after successful submission
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating the event",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center flex-col">
        <div className="self-start mb-16 mt-3 flex justify-between w-full">
          <Link href="/admin">
            <Button className="mx-3">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <div className="mx-3">
            <ModeToggle />
          </div>
        </div>
        <Card className="mx-auto max-w-2xl w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Create Event</CardTitle>
            <CardDescription>
              Fill out the form below to create a new event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name">Event Name</label>
                <Input id="name" type="text" placeholder="Enter event name" {...register("name")} />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="description">Event Description</label>
                <Input id="description" type="text" placeholder="Enter event description" {...register("description")} />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
              </div>
              <div>
                <label htmlFor="date">Event Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !watchedDate && "text-muted-foreground"
                      )}
                    >
                      {watchedDate ? (
                        format(watchedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      selected={watchedDate}
                      onSelect={(date) => setValue("date", date as Date)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-red-500">{errors.date.message}</p>}
              </div>
              <div>
                <label htmlFor="location">Event Location</label>
                <Input id="location" type="text" placeholder="Enter event location" {...register("location")} />
                {errors.location && <p className="text-red-500">{errors.location.message}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="map" className="my-2">Select Location on Map</label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={'outline'}>View Map</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Map Location</DialogTitle>
                      <DialogDescription>Select the location of the event on the map.</DialogDescription>
                    </DialogHeader>
                    <MyMap initialPosition={[-20.3484, 57.5522]} zoom={10} onLocationSelect={handleLocationSelect} />
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <label htmlFor="picture">Before Picture</label>
                <div className="flex items-center gap-2">
                  <Input id="picture" type="file" onChange={handleImageUpload} disabled={imageUploading} />
                  {imageUrl && (
                    <Button type="button" variant="ghost" onClick={handleRemoveImage}>
                      <Trash className="mr-2 h-4 w-4" /> Remove
                    </Button>
                  )}
                </div>
                {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2 w-full h-auto rounded" />}
              </div>
              <LoadingButton type="submit" className="w-full" loading={imageUploading}>Create Event</LoadingButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
