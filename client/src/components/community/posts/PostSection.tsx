"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from 'next/navigation';
import { getPostsByCommunityGroup, ForumPost, addPost, AddForumPost } from "@/services/post";
import ForumPostComponent from "@/components/community/posts/PostCard"; // Adjust the path as necessary
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useUserData";
import { LoadingButton } from "@/components/ui/loading-button"; // Adjust the path as necessary

const ForumPostSection: React.FC = () => {
    const { id } = useParams();
    const { getUserData } = useAuth();
    const { toast } = useToast();
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const fetchPosts = useCallback(async () => {
        try {
            const posts = await getPostsByCommunityGroup(id as string);
            setPosts(posts);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleAddPost = async () => {
        const user = getUserData();
        if (!user) {
            toast({
                title: "Error",
                description: "User not found. Please log in.",
                variant: "destructive",
            });
            return;
        }

        const newPost: AddForumPost = {
            title,
            content,
            userId: user._id,
        };

        setIsSubmitting(true);
        try {
            await addPost(newPost, id as string);
            fetchPosts(); // Reload the posts after adding a new one
            setOpen(false); // Hide the modal
            toast({
                title: "Success",
                description: "Post added successfully!",
                variant: "default",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: (err as Error).message,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="container mx-auto my-8">
            <Card>
                <CardHeader>
                    <CardTitle>Community Forum Posts</CardTitle>
                    <CardDescription>Explore the latest discussions in the community</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end mb-4">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline">Add Post</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add a new post</DialogTitle>
                                    <DialogDescription>
                                        Create a new post for this community group.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="title" className="text-right">
                                            Title
                                        </Label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="content" className="text-right">
                                            Content
                                        </Label>
                                        <Input
                                            id="content"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <LoadingButton type="button" onClick={handleAddPost} loading={isSubmitting}>
                                        Save
                                    </LoadingButton>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post => (
                            <ForumPostComponent key={post._id} post={post} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}

export default ForumPostSection;
