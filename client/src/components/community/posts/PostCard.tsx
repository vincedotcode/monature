// ForumPost.tsx

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface ForumPost {
  _id: string;
  title: string;
  content: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  communityGroup: string;
  createdAt: string;
  updatedAt: string;
}

interface ForumPostProps {
  post: ForumPost;
}

const ForumPostComponent: React.FC<ForumPostProps> = ({ post }) => {
  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex items-center gap-4 p-4">
        <Avatar className="bg-primary text-primary-foreground">
          <AvatarFallback className="text-primary">{getInitial(post.createdBy.name)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-muted-foreground">Posted by {post.createdBy.name} - {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p>{post.content}</p>
      </CardContent>
    </Card>
  );
}

export default ForumPostComponent;
