import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ParticipantProps {
    name: string;
    email: string;
    avatarUrl?: string;
}

const ParticipantComponent: React.FC<ParticipantProps> = ({ name, email, avatarUrl }) => {
    return (
        <Card className="w-full">
            <CardHeader className="flex items-center gap-4 p-4">
                <Avatar className="bg-primary text-primary-foreground">
                    {avatarUrl ? (
                        <AvatarImage src={avatarUrl} />
                    ) : (
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    )}
                </Avatar>
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-sm text-muted-foreground">{email}</p>
                </div>
            </CardHeader>
        </Card>
    );
};

export default ParticipantComponent;
