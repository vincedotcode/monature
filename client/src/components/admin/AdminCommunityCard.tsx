import * as React from "react";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Trash } from 'lucide-react';
import { deleteCommunityGroup } from '@/services/Community';
import { useToast } from '@/components/ui/use-toast';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
} from '@/components/ui/alert-dialog';

interface GroupProps {
    group: {
        _id: string;
        name: string;
        description: string;
        category: {
            _id: string;
            name: string;
            description: string;
        };
        createdBy: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    onDelete: (id: string) => void;
}

const CommunityCard: React.FC<GroupProps> = ({ group, onDelete }) => {
    const router = useRouter();
    const { toast } = useToast();

    const handleViewPosts = () => {
        router.push(`/community/${group._id}`);
    };

    const handleDelete = async () => {
        try {
            await deleteCommunityGroup(group._id);
            onDelete(group._id);
            toast({
                title: "Community group deleted",
                description: "The community group has been successfully deleted.",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Error deleting community group",
                description: (error as Error).message || 'Failed to delete the community group',
                variant: "destructive",
            });
        }
    };

    return (
        <Card className="w-full max-w-md shadow-lg p-1">
            <CardHeader className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <CardTitle>{group.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">{group.description}</CardDescription>
                    </div>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Trash className="w-5 h-5 text-red-500" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this community group? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
                <div className="flex justify-end">
                    <Badge variant="default" className="mt-2 px-8 py-2">
                        {group.category.name}
                    </Badge>
                </div>
                <Button variant="outline" size="sm" onClick={handleViewPosts}>
                    View Posts
                </Button>
            </CardContent>
        </Card>
    );
};

export default CommunityCard;
