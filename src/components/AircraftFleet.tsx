
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type AircraftProps = {
  name: string;
  image: string;
  type: string;
  seats: number;
  engineType: string;
  speed: string;
  range: string;
  features: string[];
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
            <h3 className="text-xl font-bold text-navy-900">{aircraft.name}</h3>
            <p className="text-gray-500">{aircraft.type}</p>
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

const AircraftFleet = () => {
  const trainingAircraft = [
    {
      name: "Cessna 172 Skyhawk",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=1500",
      type: "Single-Engine Piston",
      seats: 4,
      engineType: "Lycoming IO-360",
      speed: "124 knots",
      range: "640 nm",
      features: ["G1000 Glass Cockpit", "Autopilot", "ADS-B", "Air Conditioning"]
    },
    {
      name: "Piper PA-28 Cherokee",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1500",
      type: "Single-Engine Piston",
      seats: 4,
      engineType: "Lycoming O-360",
      speed: "130 knots",
      range: "580 nm",
      features: ["Traditional Gauges", "Comfortable Training", "Easy Handling", "Stable Platform"]
    },
    {
      name: "Diamond DA40",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&q=80&w=1500",
      type: "Single-Engine Piston",
      seats: 4,
      engineType: "Lycoming IO-360",
      speed: "150 knots",
      range: "720 nm",
      features: ["Glass Cockpit", "Composite Construction", "Fuel Efficient", "Enhanced Safety"]
    }
  ];
  
  const multiEngineAircraft = [
    {
      name: "Diamond DA42 Twin Star",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=1500",
      type: "Multi-Engine Piston",
      seats: 4,
      engineType: "Dual Austro AE300",
      speed: "170 knots",
      range: "1,027 nm",
      features: ["G1000 Glass Cockpit", "Efficient Diesel Engines", "FADEC", "Enhanced Safety"]
    },
    {
      name: "Beechcraft Baron G58",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1500",
      type: "Multi-Engine Piston",
      seats: 6,
      engineType: "Dual Continental IO-550",
      speed: "190 knots",
      range: "1,480 nm",
      features: ["Garmin G1000 NXi", "Known Ice Protection", "Pressurized Cabin", "High Performance"]
    }
  ];

  const simulators = [
    {
      name: "Redbird FMX Simulator",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&q=80&w=1500",
      type: "Full Motion Simulator",
      seats: 2,
      engineType: "Simulated Multiple Types",
      speed: "As per aircraft model",
      range: "Unlimited",
      features: ["Motion Platform", "Wrap-around Visuals", "Multiple Aircraft Models", "Scenario-based Training"]
    },
    {
      name: "Elite iGATE Advanced Trainer",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1500",
      type: "Fixed Base Simulator",
      seats: 1,
      engineType: "Simulated Multiple Types",
      speed: "As per aircraft model",
      range: "Unlimited",
      features: ["Touch Screen", "Realistic Controls", "Instrument Training", "Cost Effective"]
    }
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainingAircraft.map((aircraft, index) => (
                <AircraftCard key={index} aircraft={aircraft} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="multi-engine" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {multiEngineAircraft.map((aircraft, index) => (
                <AircraftCard key={index} aircraft={aircraft} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="simulators" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {simulators.map((simulator, index) => (
                <AircraftCard key={index} aircraft={simulator} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AircraftFleet;
