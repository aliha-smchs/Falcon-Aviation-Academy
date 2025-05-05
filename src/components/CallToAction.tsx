
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-navy-800 to-navy-900 text-white">
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
              className="bg-sky-600 hover:bg-sky-700 text-white text-lg py-6 px-8 rounded-md flex items-center gap-2"
              size="lg"
            >
              <Plane className="h-5 w-5" />
              Book a Trial Flight
            </Button>
            <Button 
              variant="outline" 
              className="border-white hover:bg-white/10 text-white text-lg py-6 px-8 rounded-md"
              size="lg"
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
