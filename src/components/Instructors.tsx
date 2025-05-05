
import InstructorCard from "./InstructorCard";

const Instructors = () => {
  const instructors = [
    {
      name: "Captain Sarah Mitchell",
      title: "Chief Flight Instructor",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1000",
      experience: "15+ years",
      qualifications: ["ATPL", "CFI", "MEI", "Boeing 737 Type Rating"],
      bio: "Former commercial airline captain with over 10,000 flight hours. Sarah specializes in advanced flight training and airline preparation courses."
    },
    {
      name: "Mark Richardson",
      title: "Senior Flight Instructor",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=1000",
      experience: "12+ years",
      qualifications: ["CPL", "CFI", "CFII", "Aerobatics Certified"],
      bio: "Former aerobatic competitor and air show pilot. Mark excels in teaching precision flying and complex aircraft operations."
    },
    {
      name: "Jessica Wong",
      title: "Instrument Flight Instructor",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000",
      experience: "8+ years",
      qualifications: ["CPL", "CFII", "MEI", "Airbus A320 Type Rating"],
      bio: "Jessica specializes in instrument training and has helped countless students master the challenges of IFR flying."
    },
    {
      name: "David Thompson",
      title: "Flight Instructor",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&q=80&w=1000",
      experience: "5+ years",
      qualifications: ["CPL", "CFI", "Tailwheel Endorsed"],
      bio: "David's patient teaching style makes him a favorite among beginning students. He specializes in primary flight training."
    }
  ];

  return (
    <section id="instructors" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Expert Flight Instructors</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from industry professionals with extensive experience and a passion for teaching.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <InstructorCard 
              key={index}
              name={instructor.name}
              title={instructor.title}
              image={instructor.image}
              experience={instructor.experience}
              qualifications={instructor.qualifications}
              bio={instructor.bio}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
