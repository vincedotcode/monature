import * as React from "react";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash } from 'lucide-react';
import { deleteDonation } from '@/services/donation';
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

export interface Donor {
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  amountDonated: number;
  _id: string;
  donatedAt: string;
}

export interface Donation {
  _id: string;
  title: string;
  subHead: string;
  description: string;
  amountToBeDonated: number;
  donationsReceived: number;
  donors: Donor[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface DonationProps {
  donation: Donation;
  onDelete: (id: string) => void;
}

const DonationCard: React.FC<DonationProps> = ({ donation, onDelete }) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteDonation(donation._id);
      onDelete(donation._id);
      toast({
        title: "Donation deleted",
        description: "The donation has been successfully deleted.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error deleting donation",
        description: (error as Error).message || 'Failed to delete the donation',
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg p-1">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <CardTitle>{donation.title}</CardTitle>
            <CardDescription className="text-muted-foreground">{donation.subHead}</CardDescription>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div  className="flex justify-end">
            <Button variant="secondary" size="icon">
              <Trash className="w-5 h-5 text-red-500" />
            </Button>
            </div>
         
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this donation? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Total Donated</p>
            <p className="text-3xl font-bold">${donation.donationsReceived}</p>
          </div>
          <Badge variant="default" >
            Goal: ${donation.amountToBeDonated}
          </Badge>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Percentage Raised: {((donation.donationsReceived / donation.amountToBeDonated) * 100).toFixed(2)}%</p>
        </div>
      
      </CardContent>
    </Card>
  );
};

export default DonationCard;
