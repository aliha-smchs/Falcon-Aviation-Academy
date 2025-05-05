
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-flyhub-blue/10 to-flyhub-lightBlue/5"></div>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2600&q=80')",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[70vh]">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-flyhub-blue/10 rounded-full">
              <span className="text-flyhub-blue font-semibold">Melbourne Flight Academy</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-flyhub-darkGray leading-tight">
              WE ARE HERE TO MAKE <br/>
              <span className="text-flyhub-blue">YOUR FUTURE DREAMS</span><br/>
              COME TRUE
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              World-class training, modern aircraft, and experienced instructors to
              help you soar to new heights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="bg-flyhub-blue hover:bg-flyhub-darkBlue text-white text-lg px-8 py-6 h-auto rounded-md"
                size="lg"
              >
                Start Your Journey
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-flyhub-blue text-flyhub-blue hover:bg-flyhub-blue/10 text-lg px-8 py-6 h-auto rounded-md"
                size="lg"
              >
                Explore Courses
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <img 
              src="/lovable-uploads/0c6b9fd8-0c80-446c-b946-f95f958ee70d.png" 
              alt="FLYHUB Logo" 
              className="max-w-xs 2xl:max-w-sm mx-auto" 
            />
          </div>
        </div>
      </div>

      {/* Feature boxes at bottom */}
      <div className="container mx-auto px-4 relative z-10 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-flyhub-blue text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Flight School</h3>
            <p className="text-white/80">Learn to fly with our expert instructors and modern fleet</p>
          </div>
          <div className="bg-flyhub-blue text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Professional Pilots</h3>
            <p className="text-white/80">Career training programs for aspiring commercial pilots</p>
          </div>
          <div className="bg-flyhub-blue text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Discovery Flights</h3>
            <p className="text-white/80">Experience the thrill of flying with an introductory lesson</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
