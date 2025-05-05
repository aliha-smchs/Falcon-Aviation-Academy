import { Plane, Route, Navigation, Map } from "lucide-react";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";

const Courses = () => {
  const courses = [
    {
      title: "Private Pilot License (PPL)",
      description: "Begin your journey to become a licensed pilot with our comprehensive PPL course.",
      icon: <Plane className="h-10 w-10" />,
      duration: "50-60 flight hours • 3-6 months",
      details: [
        "Learn essential flight maneuvers",
        "Navigation and flight planning",
        "Solo flying experience",
        "Cross-country flights",
        "FAA written exam preparation"
      ]
    },
    {
      title: "Commercial Pilot License (CPL)",
      description: "Take your skills to a professional level and open doors to paid flying opportunities.",
      icon: <Route className="h-10 w-10" />,
      duration: "200+ flight hours • 6-12 months",
      details: [
        "Advanced aircraft handling",
        "Complex aircraft operations",
        "Multi-engine training",
        "Night flying proficiency",
        "Commercial operations preparation"
      ]
    },
    {
      title: "Instrument Rating (IR)",
      description: "Learn to fly safely in poor visibility conditions using only aircraft instruments.",
      icon: <Navigation className="h-10 w-10" />,
      duration: "40+ flight hours • 2-4 months",
      details: [
        "Instrument scanning techniques",
        "IFR flight planning",
        "Holding patterns and approaches",
        "Simulated instrument conditions",
        "Emergency procedures"
      ]
    },
    {
      title: "Flight Instructor (CFI)",
      description: "Share your knowledge and passion for aviation by becoming a certified flight instructor.",
      icon: <Map className="h-10 w-10" />,
      duration: "25+ flight hours • 1-3 months",
      details: [
        "Teaching methodologies",
        "Student evaluation techniques",
        "Lesson planning",
        "Demonstration of maneuvers",
        "Fundamentals of instruction"
      ]
    }
  ];

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-800">Flight Training Courses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From your first flight to advanced ratings, we offer comprehensive programs to meet your aviation goals.
          </p>
        </div>
        
        {/* Modern table-like design inspired by the screenshot */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="hidden md:grid md:grid-cols-5 text-sm font-medium text-gray-500 bg-gray-50 px-6 py-3">
            <div className="col-span-2">Course Name</div>
            <div>Duration</div>
            <div>Prerequisites</div>
            <div>Cost</div>
          </div>
          
          {courses.map((course, index) => (
            <div 
              key={index} 
              className={`grid md:grid-cols-5 gap-4 px-6 py-4 hover:bg-sky-50 transition-colors ${
                index !== courses.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="col-span-2 flex items-center gap-3">
                <div className="p-2 rounded-md bg-sky-100 text-sky-600">{course.icon}</div>
                <div>
                  <h3 className="font-semibold text-navy-800">{course.title}</h3>
                  <p className="text-sm text-gray-500 hidden md:block">{course.description}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 flex items-center">{course.duration}</div>
              <div className="text-sm text-gray-600 flex items-center">
                {index > 0 ? "Previous license required" : "None"}
              </div>
              <div className="flex items-center">
                <span className="font-medium text-navy-800">
                  ${(5000 + index * 2500).toLocaleString()}
                </span>
                <Button 
                  className="ml-auto bg-navy-800 hover:bg-navy-900 text-white text-xs py-1 px-3"
                  onClick={() => console.log(`Learn more about ${course.title}`)}
                >
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile version of courses for small screens */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:hidden">
          {courses.map((course, index) => (
            <CourseCard 
              key={index}
              title={course.title}
              description={course.description}
              icon={course.icon}
              duration={course.duration}
              details={course.details}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
