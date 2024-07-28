"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Event, getAllEvents, deleteEvent } from '@/services/events';
import { getAllCategories, addCategory, deleteCategory, ForumCategory, AddForumCategory } from '@/services/category';
import { getAllCommunityGroups, addCommunityGroup, deleteCommunityGroup, CommunityGroup } from '@/services/Community';
import EventComponent from '@/components/admin/AdminEventCard';
import CategoryCard from '@/components/admin/CategoryCard';
import CommunityCard from '@/components/admin/AdminCommunityCard';
import { useToast } from '@/components/ui/use-toast';
import Loader from '@/components/loader';
import { LoadingButton } from '@/components/ui/loading-button';
import { CategoryDropdown } from '@/components/CategoryDropdown';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage, } from '@/components/ui/form';
import { useAuth } from '@/hooks/useUserData';
import AdminDonationCard from "@/components/admin/AdminDonationCard"; // Adjust the path as needed
import { getAllDonations, Donation, addDonation } from "@/services/donation";
import { AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogAction, AlertDialogDescription, AlertDialog } from "@/components/ui/alert-dialog";
const donationFormSchema = z.object({
    title: z.string().nonempty({ message: "Title is required" }),
    subHead: z.string().nonempty({ message: "Sub-head is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
    amount: z.number().positive({ message: "Amount must be positive" }),
});
// Define the form validation schema using Zod
const categoryFormSchema = z.object({
    name: z.string().nonempty({ message: "Category name is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
});

const communityFormSchema = z.object({
    name: z.string().nonempty({ message: "Community name is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
    categoryId: z.string().nonempty({ message: "Category is required" }),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;
type CommunityFormValues = z.infer<typeof communityFormSchema>;
type DonationFormValues = z.infer<typeof donationFormSchema>;


const AdminCard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<ForumCategory[]>([]);
    const [communityGroups, setCommunityGroups] = useState<CommunityGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    const [categoryLoading, setCategoryLoading] = useState<boolean>(false);
    const [communityLoading, setCommunityLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const { getUserData } = useAuth();
    const router = useRouter();
    const [donations, setDonations] = useState<Donation[]>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [events, categories, communityGroups] = await Promise.all([getAllEvents(), getAllCategories(), getAllCommunityGroups()]);
                setEvents(events);
                setCategories(categories);
                setCommunityGroups(communityGroups);
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error fetching data',
                    description: 'There was a problem fetching the data.',
                });
                setEvents([]);
                setCategories([]);
                setCommunityGroups([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [toast]);

    const handleDeleteEvent = async (id: string) => {
        try {
            await deleteEvent(id);
            const fetchData = async () => {
                setLoading(true);
                try {
                    const [events, categories, communityGroups] = await Promise.all([getAllEvents(), getAllCategories(), getAllCommunityGroups()]);
                    setEvents(events);
                    setCategories(categories);
                    setCommunityGroups(communityGroups);
                } catch (error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error fetching data',
                        description: 'There was a problem fetching the data.',
                    });
                    setEvents([]);
                    setCategories([]);
                    setCommunityGroups([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
            toast({
                variant: 'default',
                title: 'Event deleted successfully',
                description: 'The event has been deleted.',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error deleting event',
                description: 'There was a problem deleting the event.',
            });
        }
    };

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const data = await getAllDonations();
                setDonations(data);
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error fetching donations',
                    description: 'There was a problem fetching the donations.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);
    const { handleSubmit, register, formState: { errors }, reset } = useForm<DonationFormValues>({
        resolver: zodResolver(donationFormSchema),
    });

    const handleDeleteCommunityGroup = async (id: string) => {
        try {
            await deleteCommunityGroup(id);
            const fetchData = async () => {
                setLoading(true);
                try {
                    const [events, categories, communityGroups] = await Promise.all([getAllEvents(), getAllCategories(), getAllCommunityGroups()]);
                    setEvents(events);
                    setCategories(categories);
                    setCommunityGroups(communityGroups);
                } catch (error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error fetching data',
                        description: 'There was a problem fetching the data.',
                    });
                    setEvents([]);
                    setCategories([]);
                    setCommunityGroups([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error deleting community group',
                description: 'There was a problem deleting the community group.',
            });
        }
    };

    const categoryForm = useForm<CategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: "",
            description: "",
        }
    });

    const communityForm = useForm<CommunityFormValues>({
        resolver: zodResolver(communityFormSchema),
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
        }
    });



    const onSubmitCategory: SubmitHandler<CategoryFormValues> = async (data) => {
        setCategoryLoading(true);
        try {
            const addedCategory = await addCategory(data);
            const fetchData = async () => {
                setLoading(true);
                try {
                    const [events, categories, communityGroups] = await Promise.all([getAllEvents(), getAllCategories(), getAllCommunityGroups()]);
                    setEvents(events);
                    setCategories(categories);
                    setCommunityGroups(communityGroups);
                } catch (error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error fetching data',
                        description: 'There was a problem fetching the data.',
                    });
                    setEvents([]);
                    setCategories([]);
                    setCommunityGroups([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchData(); toast({
                variant: 'default',
                title: 'Category added successfully',
                description: 'The new category has been added.',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error adding category',
                description: 'There was a problem adding the category.',
            });
        } finally {
            setCategoryLoading(false);
            setCategoryModalOpen(false);
        }
    };
    const onSubmit: SubmitHandler<DonationFormValues> = async (data) => {
        try {
            const newDonation = await addDonation(data);
            toast({
                variant: 'default',
                title: 'Donation added successfully',
                description: 'The new donation has been added.',
            });
            const fetchDonations = async () => {
                try {
                    const data = await getAllDonations();
                    setDonations(data);
                } catch (error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error fetching donations',
                        description: 'There was a problem fetching the donations.',
                    });
                } finally {
                    setLoading(false);
                }
            };

            fetchDonations();
            reset();
            setDialogOpen(false);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error adding donation',
                description: 'There was a problem adding the donation.',
            });
        }
    };
    const onSubmitCommunity: SubmitHandler<CommunityFormValues> = async (data) => {
        setCommunityLoading(true);
        try {
            const admin = getUserData();
            const communityGroupData = {
                name: data.name,
                description: data.description,
                category: data.categoryId,
            };
            const addedCommunityGroup = await addCommunityGroup(communityGroupData, admin?._id);
            const fetchData = async () => {
                setLoading(true);
                try {
                    const [events, categories, communityGroups] = await Promise.all([getAllEvents(), getAllCategories(), getAllCommunityGroups()]);
                    setEvents(events);
                    setCategories(categories);
                    setCommunityGroups(communityGroups);
                } catch (error) {
                    toast({
                        variant: 'destructive',
                        title: 'Error fetching data',
                        description: 'There was a problem fetching the data.',
                    });
                    setEvents([]);
                    setCategories([]);
                    setCommunityGroups([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
            toast({
                variant: 'default',
                title: 'Community group added successfully',
                description: 'The new community group has been added.',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error adding community group',
                description: 'There was a problem adding the community group.',
            });
        } finally {
            setCommunityLoading(false);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [events, categories, communityGroups] = await Promise.all([getAllEvents(), getAllCategories(), getAllCommunityGroups()]);
                setEvents(events);
                setCategories(categories);
                setCommunityGroups(communityGroups);
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error fetching data',
                    description: 'There was a problem fetching the data.',
                });
                setEvents([]);
                setCategories([]);
                setCommunityGroups([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }

    const handleSelectCategory = (categoryId: string) => {
        communityForm.setValue("categoryId", categoryId);
    };

    const navigateToAddEvent = () => {
        router.push('/admin/event');
    };

    return (
        <div className='p-4'>
            <Card className='p-4'>
                <Tabs defaultValue="events" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="events">Events</TabsTrigger>
                        <TabsTrigger value="community">Community</TabsTrigger>
                        <TabsTrigger value="categories">Categories</TabsTrigger>
                        <TabsTrigger value="donations">Donations</TabsTrigger>
                    </TabsList>
                    <TabsContent value="events">
                        <Card>
                            <CardHeader>
                                <CardTitle>Events</CardTitle>
                                <CardDescription>
                                    Manage your events here. Click save when you are done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className='flex justify-end'>
                                    <Button onClick={navigateToAddEvent} className="mb-4 w-1/3">Add Event</Button>
                                </div>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {events.length > 0 ? (
                                            events.map(event => (
                                                <EventComponent key={event._id} _id={event._id} {...event} onDelete={handleDeleteEvent} />
                                            ))
                                        ) : (
                                            <p className="col-span-full text-center">No events found.</p>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="community">
                        <Card>
                            <CardHeader>
                                <CardTitle>Community</CardTitle>
                                <CardDescription>
                                    Manage your community here. Click save when you are done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Form {...communityForm}>
                                    <form onSubmit={communityForm.handleSubmit(onSubmitCommunity)} className="space-y-4">
                                        <FormField
                                            control={communityForm.control}
                                            name="name"
                                            render={({ field, fieldState }) => (
                                                <FormItem>
                                                    <FormLabel>Community Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Enter community name" />
                                                    </FormControl>
                                                    {fieldState.error && (
                                                        <FormMessage>{fieldState.error.message}</FormMessage>
                                                    )}
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={communityForm.control}
                                            name="description"
                                            render={({ field, fieldState }) => (
                                                <FormItem>
                                                    <FormLabel>Community Description</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Enter community description" />
                                                    </FormControl>
                                                    {fieldState.error && (
                                                        <FormMessage>{fieldState.error.message}</FormMessage>
                                                    )}
                                                </FormItem>
                                            )}
                                        />
                                        <div className="space-y-1">
                                            <FormLabel htmlFor="categoryDropdown">Select Category</FormLabel>
                                            <CategoryDropdown onSelectCategory={handleSelectCategory} />
                                        </div>
                                        <CardFooter>
                                            <LoadingButton type="submit" loading={communityLoading}>Save changes</LoadingButton>
                                        </CardFooter>
                                    </form>
                                </Form>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                    {communityGroups.length > 0 ? (
                                        communityGroups.map(group => (
                                            <CommunityCard key={group._id} group={group} onDelete={handleDeleteCommunityGroup} />
                                        ))
                                    ) : (
                                        <p className="col-span-full text-center">No community groups found.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="categories">
                        <Card>
                            <CardHeader>
                                <CardTitle>Categories</CardTitle>
                                <CardDescription>
                                    Manage your categories here. Click save when you are done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <LoadingButton onClick={() => setCategoryModalOpen(true)} loading={categoryLoading} className="mb-4">Add Category</LoadingButton>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <div className="space-y-4">
                                        {categories.length > 0 ? (

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                {categories.map(category => (
                                                    <CategoryCard key={category._id} category={category} onDelete={handleDeleteCategory} />
                                                ))}
                                            </div>



                                        ) : (
                                            <p>No categories found.</p>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="donations">
                        <Card>
                            <CardHeader>
                                <CardTitle>Donations</CardTitle>
                                <CardDescription>
                                    Manage your SDG Donations accordingly.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" className="mb-4">Add Donation</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Add Donation</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Fill out the form below to add a new donation.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="space-y-4">
                                                <div>
                                                    <Input
                                                        placeholder="Enter title"
                                                        {...register("title")}
                                                    />
                                                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                                                </div>
                                                <div>
                                                    <Input
                                                        placeholder="Enter sub-head"
                                                        {...register("subHead")}
                                                    />
                                                    {errors.subHead && <p className="text-red-500">{errors.subHead.message}</p>}
                                                </div>
                                                <div>
                                                    <Input
                                                        placeholder="Enter description"
                                                        {...register("description")}
                                                    />
                                                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                                                </div>
                                                <div>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter amount"
                                                        {...register("amount", { valueAsNumber: true })}
                                                    />
                                                    {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
                                                </div>
                                            </div>
                                            <AlertDialogFooter className='my-4'>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction type="submit">Add</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </form>
                                    </AlertDialogContent>
                                </AlertDialog>

                                {loading ? (
                                    <Loader />
                                ) : (
                                    donations.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {donations.map(donation => (
                                                <AdminDonationCard
                                                    key={donation._id}
                                                    donation={donation}
                                                    onDelete={(id) => setDonations(donations.filter(d => d._id !== id))}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="col-span-full text-center">No donations found.</p>
                                    )
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </Card>

            {categoryModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <Card className="p-4 max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle>Add Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...categoryForm}>
                                <form onSubmit={categoryForm.handleSubmit(onSubmitCategory)} className="space-y-4">
                                    <FormField
                                        control={categoryForm.control}
                                        name="name"
                                        render={({ field, fieldState }) => (
                                            <FormItem>
                                                <FormLabel>Category Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Enter category name" />
                                                </FormControl>
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={categoryForm.control}
                                        name="description"
                                        render={({ field, fieldState }) => (
                                            <FormItem>
                                                <FormLabel>Category Description</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Enter category description" />
                                                </FormControl>
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="ghost" onClick={() => setCategoryModalOpen(false)}>Cancel</Button>
                                        <LoadingButton loading={categoryLoading} type="submit">Add Category</LoadingButton>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AdminCard;
