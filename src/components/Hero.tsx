
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2600&q=80')",
        }}
      >
        {/* Dark overlay with blue tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 to-navy-800/60"></div>
        
        {/* Cloud overlay */}
        <div className="cloud-overlay"></div>
        
        {/* Animated flight path */}
        <div className="flight-path"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-display">
            <span className="block">Soar Beyond Limits</span>
            <span className="text-gold-400">Melbourne's Premier Flight School</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-silver-200 max-w-2xl">
            World-class training, modern aircraft, and experienced instructors to
            help you soar to new heights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-sky-600 hover:bg-sky-700 text-white text-lg py-6 px-8 rounded-md flex items-center gap-2 shadow-lg shadow-sky-700/30 hover:shadow-sky-700/50 transition-all"
              size="lg"
            >
              <Plane className="h-5 w-5" />
              Book a Trial Flight
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-white hover:bg-white/20 text-white text-lg py-6 px-8 rounded-md"
              size="lg"
            >
              Explore Courses
            </Button>
          </div>
        </div>
      </div>

      {/* Floating cloud animation */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-24"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
