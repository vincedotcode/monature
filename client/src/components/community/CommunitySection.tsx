"use client";

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getAllCommunityGroups } from "@/services/Community"
import CommunityCard from "@/components/community/CommunityCard"

export interface CommunityGroup {
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
}

const CommunitySection: React.FC = () => {
  const [communityGroups, setCommunityGroups] = useState<CommunityGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunityGroups = async () => {
      try {
        const groups = await getAllCommunityGroups();
        setCommunityGroups(groups);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunityGroups();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="w-full max-w-screen-lg mx-auto shadow-lg p-5 my-4">
      <CardHeader>
        <CardTitle>Community Groups</CardTitle>
        <CardDescription>Explore and join various community groups.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {communityGroups.map(group => (
          <CommunityCard key={group._id} group={group} />
        ))}
      </CardContent>
    </Card>
  )
}

export default CommunitySection
