
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";
import { useEffect, useState } from "react";

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('.cta-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="cta-section py-16 bg-gradient-to-r from-navy-800 to-navy-900 text-white relative overflow-hidden">
      {/* Animated elements */}
      <div className="absolute -top-12 left-10 w-24 h-24 bg-sky-400/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-1/3 right-10 w-32 h-32 bg-sky-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Animated plane path */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-full' : '-translate-x-full'}`} style={{ transitionDelay: '0.5s' }}>
          <Plane className="h-8 w-8 text-white/30" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Flying Journey?</h2>
            <p className="text-xl text-gray-200 max-w-xl">
              Book a discovery flight today and experience the thrill of piloting an aircraft with one of our expert instructors.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className={`bg-sky-600 hover:bg-sky-700 text-white text-lg py-6 px-8 rounded-md flex items-center gap-2 transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              size="lg"
            >
              <Plane className="h-5 w-5" />
              Book a Trial Flight
            </Button>
            <Button 
              variant="outline" 
              className={`border-white hover:bg-white/10 text-white text-lg py-6 px-8 rounded-md transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              size="lg"
              style={{ transitionDelay: '0.2s' }}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
