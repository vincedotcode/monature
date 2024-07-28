"use client";

import { useEffect, useState } from "react";
import GoalCard from "@/components/goals/GoalsCard";
import { getAllGoals, Goal } from "@/services/goal"; // Adjust the path as needed
import Loader from "@/components/loader"; // Assume you have a loader component
export default function Component() {
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
    return <> <Loader /> </>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Sustainable Development Goals
          </h2>
          <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            The 2030 Agenda for Sustainable Development, adopted by all United
            Nations Member States in 2015, provides a shared blueprint for peace
            and prosperity for people and the planet, now and into the future.
            At its heart are the 17 Sustainable Development Goals (SDGs), which
            are an urgent call for action by all countries - developed and
            developing - in a global partnership. They recognize that ending
            poverty and other deprivations must go hand-in-hand with strategies
            that improve health and education, reduce inequality, and spur
            economic growth - all while tackling climate change and working to
            preserve our environment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {goals.map((goal) => (
            <GoalCard
              key={goal.number}
              title={goal.title}
              description={goal.description}
              image={goal.image}
              features={goal.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
