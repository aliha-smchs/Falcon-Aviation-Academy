
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Instructors from "@/components/Instructors";
import Testimonials from "@/components/Testimonials";
import AircraftFleet from "@/components/AircraftFleet";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import VideoSection from '@/components/VideoSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ScrollReveal className="section-gradient-alt">
        <VideoSection />
      </ScrollReveal>
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
