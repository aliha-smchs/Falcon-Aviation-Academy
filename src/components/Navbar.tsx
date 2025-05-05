
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plane } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <Plane className={`h-8 w-8 ${isScrolled ? 'text-sky-600' : 'text-sky-400'}`} />
          <span className={`font-bold text-xl font-display ${isScrolled ? 'text-navy-900' : 'text-white'}`}>Melbourne Flight Academy</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#courses" className={`nav-link font-medium ${isScrolled ? 'text-navy-800' : 'text-white'}`}>Courses</a>
          <a href="#instructors" className={`nav-link font-medium ${isScrolled ? 'text-navy-800' : 'text-white'}`}>Instructors</a>
          <a href="#fleet" className={`nav-link font-medium ${isScrolled ? 'text-navy-800' : 'text-white'}`}>Our Fleet</a>
          <a href="#testimonials" className={`nav-link font-medium ${isScrolled ? 'text-navy-800' : 'text-white'}`}>Testimonials</a>
          <a href="#contact" className={`nav-link font-medium ${isScrolled ? 'text-navy-800' : 'text-white'}`}>Contact</a>
          <Button className="bg-sky-600 hover:bg-sky-700 shadow-sm hover:shadow-md">Book Trial Flight</Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-navy-900' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#courses" className="block py-2 hover:text-sky-600" onClick={() => setIsMobileMenuOpen(false)}>Courses</a>
            <a href="#instructors" className="block py-2 hover:text-sky-600" onClick={() => setIsMobileMenuOpen(false)}>Instructors</a>
            <a href="#fleet" className="block py-2 hover:text-sky-600" onClick={() => setIsMobileMenuOpen(false)}>Our Fleet</a>
            <a href="#testimonials" className="block py-2 hover:text-sky-600" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a>
            <a href="#contact" className="block py-2 hover:text-sky-600" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <Button className="bg-sky-600 hover:bg-sky-700 w-full">Book Trial Flight</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
