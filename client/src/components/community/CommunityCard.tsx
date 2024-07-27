import * as React from "react"
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf } from 'lucide-react'

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
}


const CommunityCard: React.FC<GroupProps> = ({ group }) => {
    const router = useRouter();

    const handleViewPosts = () => {
        router.push(`/community/${group._id}`);
    };

    return (
        <Card className="w-full max-w-md shadow-lg p-1">
            <CardContent className="grid gap-4 p-6">
                <div className="flex items-center gap-4">
                    <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">{group.name}</h3>
                        <p className="text-muted-foreground">{group.description}</p>
                    </div>
                </div>
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
    )
}

export default CommunityCard;
