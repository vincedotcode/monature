import dynamic from 'next/dynamic';

const MyMap = dynamic(() => import('@/components/Map'), { ssr: false });

interface IconSectionProps {
  longitude: number;
  latitude: number;
}

export default function EventMap({ longitude, latitude }: IconSectionProps) {
  return (
    <>
      <div className="container py-3">
        <div className="max-w-2xl mx-auto">
          {/* Grid */}
          <div className="grid gap-12">
            <div>
              <h2 className="text-3xl font-bold lg:text-4xl">Map</h2>
              <p className="mt-3 text-muted-foreground">
                View The Event On A Map
              </p>
            </div>
            <div className="w-full">
              <MyMap initialPosition={[latitude || 20.3484, longitude || 57.5522]} zoom={10} />
            </div>
          </div>
          {/* End Grid */}
        </div>
      </div>
      {/* End Icon Blocks */}
    </>
  );
}
