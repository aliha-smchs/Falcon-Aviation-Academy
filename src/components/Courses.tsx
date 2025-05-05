
import { Plane, Route, Navigation, Map } from "lucide-react";
import CourseCard from "./CourseCard";

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Flight Training Courses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From your first flight to advanced ratings, we offer comprehensive programs to meet your aviation goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
