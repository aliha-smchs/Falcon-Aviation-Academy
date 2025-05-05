
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Phone } from 'lucide-react';

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
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2">
            <img src="/lovable-uploads/0c6b9fd8-0c80-446c-b946-f95f958ee70d.png" alt="FLYHUB Logo" className="h-10" />
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="nav-link font-medium">Home</a>
            <a href="#courses" className="nav-link font-medium">Courses</a>
            <a href="#instructors" className="nav-link font-medium">Instructors</a>
            <a href="#fleet" className="nav-link font-medium">Our Fleet</a>
            <a href="#testimonials" className="nav-link font-medium">Testimonials</a>
            <a href="#contact" className="nav-link font-medium">Contact</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-flyhub-blue mr-2" />
              <span className="text-flyhub-darkGray font-medium">(03) 9123 4567</span>
            </div>
            <Button className="bg-flyhub-blue hover:bg-flyhub-darkBlue text-white">Book Trial Flight</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-flyhub-darkGray" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg mt-4 rounded-md">
            <div className="p-4 flex flex-col space-y-3">
              <a href="#" className="block py-2 px-4 hover:bg-flyhub-blue/10 hover:text-flyhub-blue rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="#courses" className="block py-2 px-4 hover:bg-flyhub-blue/10 hover:text-flyhub-blue rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Courses</a>
              <a href="#instructors" className="block py-2 px-4 hover:bg-flyhub-blue/10 hover:text-flyhub-blue rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Instructors</a>
              <a href="#fleet" className="block py-2 px-4 hover:bg-flyhub-blue/10 hover:text-flyhub-blue rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Our Fleet</a>
              <a href="#testimonials" className="block py-2 px-4 hover:bg-flyhub-blue/10 hover:text-flyhub-blue rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a>
              <a href="#contact" className="block py-2 px-4 hover:bg-flyhub-blue/10 hover:text-flyhub-blue rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
              <div className="flex items-center px-4 py-2">
                <Phone className="h-5 w-5 text-flyhub-blue mr-2" />
                <span className="text-flyhub-darkGray font-medium">(03) 9123 4567</span>
              </div>
              <Button className="bg-flyhub-blue hover:bg-flyhub-darkBlue text-white w-full">Book Trial Flight</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
