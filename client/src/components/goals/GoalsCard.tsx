import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Goal, Target, Calendar, Book, Activity } from "lucide-react";

interface GoalFeature {
  number: string;
  name: string;
}

interface ComponentProps {
  title: string;
  description: string;
  image: string;
  features: GoalFeature[];
}

export default function GoalCard({
  title,
  description,
  image,
  features,
}: ComponentProps) {
  const getFeatureNumber = (name: string) => {
    return features.find((feature) => feature.name === name)?.number ?? "0";
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="bg-primary text-primary-foreground p-6 rounded-t-lg">
        <div className="flex items-center gap-4">
          <div className="bg-primary-foreground rounded-full w-12 h-12 flex items-center justify-center">
            <Goal className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-muted rounded-full w-32 h-32 flex items-center justify-center overflow-hidden">
            <img
              src={image}
              alt="Main Image"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <p className="text-muted-foreground">{description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center gap-2">
              <Target className="w-8 h-8 text-muted-foreground" />
              <span className="text-lg font-medium">{getFeatureNumber("Targets")} Targets</span>
            </div>
            <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center gap-2">
              <Calendar className="w-8 h-8 text-muted-foreground" />
              <span className="text-lg font-medium">{getFeatureNumber("Events")} Events</span>
            </div>
            <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center gap-2">
              <Book className="w-8 h-8 text-muted-foreground" />
              <span className="text-lg font-medium">{getFeatureNumber("Publications")} Publications</span>
            </div>
            <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center gap-2">
              <Activity className="w-8 h-8 text-muted-foreground" />
              <span className="text-lg font-medium">{getFeatureNumber("Actions")} Actions</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
