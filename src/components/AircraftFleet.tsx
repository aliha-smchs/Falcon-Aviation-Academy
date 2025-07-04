
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAircraftByCategory } from "@/hooks/useCMS";
import { cmsService } from "@/services/cms";
import { ErrorState, NetworkError } from "@/components/ui/error-state";
import { AircraftCardSkeleton, LoadingGrid } from "@/components/ui/loading-skeletons";

type AircraftProps = {
  id: number;
  model: string;
  name: string;
  image: string;
  seats: number;
  engineType: string;
  speed: string;
  range: string;
  features: string[];
  category?: string[];
};

const AircraftCard = ({ aircraft }: { aircraft: AircraftProps }) => {
  return (
    <Card className="overflow-hidden h-full">
      <div className="aspect-video overflow-hidden">
        <img 
          src={aircraft.image} 
          alt={aircraft.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">{aircraft.name}</h3>
            <p className="text-gray-600">{aircraft.model}</p>
          </div>
          <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200">
            {aircraft.seats} Seats
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Engine Type</p>
            <p className="font-medium">{aircraft.engineType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cruise Speed</p>
            <p className="font-medium">{aircraft.speed}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Range</p>
            <p className="font-medium">{aircraft.range}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
          <div className="flex flex-wrap gap-2">
            {aircraft.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="bg-gray-50">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to transform CMS aircraft data to component props
const transformCMSAircraft = (cmsAircraft: any): AircraftProps => {
  console.log("Transforming CMS Aircraft:", cmsAircraft.name);
  return {
    id: cmsAircraft.id,
    name: cmsAircraft.name || 'Unknown Aircraft',
    model: cmsAircraft.model || 'Unknown Model',
    image: cmsAircraft.image?.data 
      ? cmsService.getImageUrl(cmsAircraft.image.data.attributes.url)
      : 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=1500',
    seats: cmsAircraft.seats || 0,
    engineType: cmsAircraft.enginetype || 'Unknown Engine',
    speed: cmsAircraft.speed || 'Unknown Speed',
    range: cmsAircraft.range || 'Unknown Range',
    features: cmsAircraft.features || [],
  };
};

// Component for each aircraft category
const AircraftCategoryContent = ({ category }: { category: string }) => {
  const { data: aircraft, isLoading, error, refetch } = useAircraftByCategory(category);

  if (isLoading) {
    return (
      <LoadingGrid 
        count={6} 
        Component={AircraftCardSkeleton}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      />
    );
  }

  if (error) {
    if (error.status >= 500) {
      return <NetworkError onRetry={refetch} />;
    }
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!aircraft || aircraft.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No aircraft available in this category.</p>
      </div>
    );
  }

  const transformedAircraft = aircraft.map(transformCMSAircraft);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {transformedAircraft.map((aircraftItem) => (
        <AircraftCard key={aircraftItem.id} aircraft={aircraftItem} />
      ))}
    </div>
  );
};

const AircraftFleet = () => {
  return (
    <section id="fleet" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Our Modern Fleet</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Train on well-maintained, modern aircraft equipped with the latest avionics and technology.
          </p>
        </div>
        
        <Tabs defaultValue="training" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="training">Training Aircraft</TabsTrigger>
            <TabsTrigger value="multi-engine">Multi-Engine Aircraft</TabsTrigger>
            <TabsTrigger value="simulators">Flight Simulators</TabsTrigger>
          </TabsList>
          
          <TabsContent value="training" className="mt-0">
            <AircraftCategoryContent category="Training Aircraft" />
          </TabsContent>
          
          <TabsContent value="multi-engine" className="mt-0">
            <AircraftCategoryContent category="Multi-Engine Aircarft" />
          </TabsContent>
          
          <TabsContent value="simulators" className="mt-0">
            <AircraftCategoryContent category="Flight Simulators" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AircraftFleet;
