"use client";

import React, { useEffect, useState } from 'react';
import OrbitingCircles from '@/components/magicui/orbiting-circles';
import { getAllGoals, Goal } from '@/services/goal';
import Loader from '@/components/loader'; // Assume you have a loader component

export default function OrbitingCirclesDemo() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await getAllGoals();
        setGoals(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        MoNature
      </span>

      {/* Inner Circles */}
      {goals.slice(0, 5).map((goal, index) => (
        <OrbitingCircles
          key={index}
          className="size-[30px] border-none bg-transparent"
          duration={20}
          delay={index * 5}
          radius={80}
        >
          <img src={goal.image} alt={goal.title} className="h-200 w-200 rounded-full" />
        </OrbitingCircles>
      ))}

      {/* Outer Circles (reverse) */}
      {goals.slice(5).map((goal, index) => (
        <OrbitingCircles
          key={index}
          className="size-[70px] border-none bg-transparent"
          radius={190}
          duration={20}
          delay={index * 5}
          reverse
        >
          <img src={goal.image} alt={goal.title} className="h-200 w-200 rounded-full" />
        </OrbitingCircles>
      ))}
    </div>
  );
}
