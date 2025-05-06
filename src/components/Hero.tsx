import { Button } from "@/components/ui/button";
import { Plane, LocateFixed, Compass, CloudSun, BarChart2, Navigation } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Modern aviation background with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(10,30,60,0.85) 60%, rgba(0,80,180,0.7) 100%), url('/background-features.5f7a9ac9.jpg')",
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        {/* Subtle blue overlay for modern feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/60 to-sky-700/60 mix-blend-multiply"></div>
      </div>

      {/* Animated clouds */}
      <div className="absolute top-1/4 -left-20 w-40 h-20 bg-white/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-1/3 left-1/2 w-60 h-20 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="absolute bottom-1/3 right-20 w-40 h-20 bg-white/15 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }}></div>

      {/* Content layout with text on left and interactive element on right */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left side - Text content */}
          <div className="w-full lg:w-1/2 text-white text-left mb-10 lg:mb-0">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isAnimated ? 'animate-fade-in-down' : 'opacity-0'}`}>
              Soar Beyond Limits with Melbourne's Premier Flight School
            </h1>
            <p className={`text-xl md:text-2xl mb-8 text-gray-100 ${isAnimated ? 'animate-fade-in-up' : 'opacity-0'}`} 
               style={{ animationDelay: "0.4s" }}>
              World-class training, modern aircraft, and experienced instructors to
              help you achieve your aviation dreams.
            </p>
          
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                className={`bg-sky-600 hover:bg-sky-700 text-white text-lg py-6 px-8 rounded-md flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-xl ${isAnimated ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: "0.6s" }}
                size="lg"
                onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Plane className="h-5 w-5" />
                Book a Trial Flight
              </Button>
              <Button 
                variant="outline" 
                className={`bg-white/10 backdrop-blur-sm border-white hover:bg-white/20 text-white text-lg py-6 px-8 rounded-md hover:scale-105 transition-all duration-300 shadow-lg ${isAnimated ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: "0.8s" }}
                size="lg"
                onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Courses
              </Button>
            </div>
          </div>
          
          {/* Right side - Interactive Flight Dashboard */}
          <div className={`w-full lg:w-2/5 ${isAnimated ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: "0.5s" }}>
            <div className="relative bg-sky-950/40 backdrop-blur-sm rounded-xl border border-sky-500/30 p-5 shadow-xl">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold">Flight Dashboard</h3>
                <span className="text-sky-400 text-sm animate-pulse">Live</span>
              </div>
              
              {/* 3D Airplane Silhouette */}
              <div className="relative h-48 flex items-center justify-center mb-4">
                <div className="absolute w-64 h-48 bg-gradient-to-b from-sky-400/20 to-transparent rounded-full blur-xl"></div>
                <div className={`relative transition-all duration-1000 ${isAnimated ? 'scale-100 rotate-0' : 'scale-50 rotate-45'}`}>
                  <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-360">
                    <path d="M160,20 L200,40 L160,60 L180,40 Z" fill="rgba(255,255,255,0.8)" />
                    <path d="M30,30 L160,40 L30,50 L0,40 Z" fill="rgba(255,255,255,0.8)" />
                    <path d="M70,10 L90,40 L70,70 L50,40 Z" fill="rgba(255,255,255,0.8)" />
                  </svg>
                </div>
              </div>
              
              {/* Flight Data */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-sky-900/30 p-3 rounded-lg">
                  <div className="text-sky-300 text-xs mb-1 flex items-center">
                    <BarChart2 className="h-3 w-3 mr-1" /> ALTITUDE
                  </div>
                  <div className="text-white font-mono">10,500 ft</div>
                </div>
                <div className="bg-sky-900/30 p-3 rounded-lg">
                  <div className="text-sky-300 text-xs mb-1 flex items-center">
                    <Navigation className="h-3 w-3 mr-1" /> HEADING
                  </div>
                  <div className="text-white font-mono">235°</div>
                </div>
                <div className="bg-sky-900/30 p-3 rounded-lg">
                  <div className="text-sky-300 text-xs mb-1 flex items-center">
                    <Compass className="h-3 w-3 mr-1" /> AIRSPEED
                  </div>
                  <div className="text-white font-mono">165 knots</div>
                </div>
                <div className="bg-sky-900/30 p-3 rounded-lg">
                  <div className="text-sky-300 text-xs mb-1 flex items-center">
                    <CloudSun className="h-3 w-3 mr-1" /> WEATHER
                  </div>
                  <div className="text-white font-mono">CAVOK</div>
                </div>
              </div>
              
              {/* Progress Bar Animation */}
              <div className="w-full bg-sky-950/50 rounded-full h-1.5 mb-1 overflow-hidden">
                <div className="bg-sky-500 h-1.5 rounded-full animate-pulse" style={{width: "68%"}}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sky-200 text-xs">Melbourne</span>
                <span className="text-sky-200 text-xs">Sydney</span>
              </div>
            </div>
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
