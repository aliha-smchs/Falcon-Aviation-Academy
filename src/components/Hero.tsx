
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)",
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        {/* Abstract patterns */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Animated clouds */}
      <div className="absolute top-1/4 -left-20 w-40 h-20 bg-white/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-1/3 left-1/2 w-60 h-20 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="absolute bottom-1/3 right-20 w-40 h-20 bg-white/15 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }}></div>

      {/* Animated plane path */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 -left-20 animate-plane-path">
          <Plane className="h-12 w-12 text-white/80 rotate-12" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Soar Beyond Limits with Melbourne's Premier Flight School
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            World-class training, modern aircraft, and experienced instructors to
            help you achieve your aviation dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-sky-600 hover:bg-sky-700 text-white text-lg py-6 px-8 rounded-md flex items-center gap-2 hover:scale-105 transition-all duration-300"
              size="lg"
              onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Plane className="h-5 w-5" />
              Book a Trial Flight
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-white hover:bg-white/20 text-white text-lg py-6 px-8 rounded-md hover:scale-105 transition-all duration-300"
              size="lg"
              onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
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
