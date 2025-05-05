
import { Button } from "@/components/ui/button";
import { Plane, Phone } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-flyhub-blue">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Start Your Flying Journey?</h2>
            <p className="text-xl text-white/80 max-w-xl">
              Book a discovery flight today and experience the thrill of piloting an aircraft with one of our expert instructors.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-white hover:bg-gray-100 text-flyhub-blue text-lg py-6 px-8 rounded-md flex items-center gap-2"
              size="lg"
            >
              <Plane className="h-5 w-5" />
              Book a Trial Flight
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg py-6 px-8 rounded-md flex items-center gap-2"
              size="lg"
            >
              <Phone className="h-5 w-5" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
