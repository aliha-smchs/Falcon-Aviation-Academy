
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Instructors from "@/components/Instructors";
import Testimonials from "@/components/Testimonials";
import AircraftFleet from "@/components/AircraftFleet";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <ScrollReveal>
        <Courses />
      </ScrollReveal>
      
      <ScrollReveal className="section-gradient-alt">
        <Instructors />
      </ScrollReveal>
      
      <ScrollReveal>
        <AircraftFleet />
      </ScrollReveal>
      
      <ScrollReveal className="section-gradient">
        <Testimonials />
      </ScrollReveal>
      
      <ScrollReveal>
        <CallToAction />
      </ScrollReveal>
      
      <Footer />
    </div>
  );
};

export default Index;
