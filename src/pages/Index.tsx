
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Instructors from "@/components/Instructors";
import Testimonials from "@/components/Testimonials";
import AircraftFleet from "@/components/AircraftFleet";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Courses />
      <Instructors />
      <AircraftFleet />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
