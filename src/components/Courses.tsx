import { useState } from "react";
import { Plane, Route, Navigation, Settings, GraduationCap, Clock, DollarSign, Users, Award } from "lucide-react";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const Courses = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  const features = [
    {
      name: "Core Licenses",
      description: "Start your aviation journey with our comprehensive training programs, from first flight to commercial license.",
      icon: <Plane className="w-5 h-5" />,
      content: [
        {
          title: "Trial Introductory Flight (TIF) Beginner",
          description: "Experience the thrill of flying and see if aviation is right for you",
          details: "Single flight session • Perfect for beginners",
          fullDescription: "The Trial Introductory Flight (TIF) is your gateway to the world of aviation. This comprehensive experience includes a thorough briefing on aircraft systems, safety procedures, and basic flight principles. You'll take the controls under expert supervision and experience the freedom of flight while enjoying spectacular aerial views of Melbourne.",
          prerequisites: ["Minimum age: 14 years", "Valid photo identification", "No medical certificate required", "Comfortable clothing recommended"],
          curriculum: ["Aircraft familiarization and safety briefing", "Basic flight controls and instruments", "Take-off and climb procedures", "Straight and level flight", "Gentle turns and descents", "Approach and landing observation"],
          price: "$299",
          maxStudents: 1,
          certification: "Trial Flight Certificate",
          location: "Melbourne Flight Academy - Moorabbin Airport",
          instructor: "Senior Flight Instructor",
          nextStartDate: "Available Daily",
          flightHours: "1.0",
          groundHours: "0.5"
        },
        {
          title: "Recreational Pilots License (RPL)",
          description: "Your first step into becoming a licensed pilot",
          details: "20+ hours • Basic aviation fundamentals",
          fullDescription: "The Recreational Pilot License (RPL) is designed for those who want to fly for recreation and personal enjoyment. This course provides you with the fundamental skills and knowledge required to safely operate aircraft within Australia.",
          prerequisites: ["Minimum age: 16 years", "English language proficiency", "Aviation Medical Certificate"],
          curriculum: ["Aircraft systems and operations", "Basic aerodynamics", "Navigation and chart reading", "Radio communications procedures"],
          price: "$8,500 - $12,000",
          maxStudents: 6,
          certification: "CASA RPL Certificate",
          location: "Melbourne Flight Academy - Moorabbin Airport",
          instructor: "Certified Flight Instructor",
          nextStartDate: "Every Month",
          flightHours: "25",
          groundHours: "40"
        },
        {
          title: "Private Pilots License (PPL)",
          description: "Expand your flying capabilities and fly for private purposes",
          details: "40+ hours • Advanced flight operations",
          fullDescription: "The Private Pilot License (PPL) provides you with the skills and qualifications to fly aircraft for private purposes. This comprehensive course builds upon fundamental flying skills and introduces advanced navigation and flight planning.",
          prerequisites: ["Minimum age: 17 years", "Hold or be eligible for RPL", "Aviation Medical Certificate"],
          curriculum: ["Advanced aircraft systems", "Complex navigation techniques", "Flight planning and preparation", "Cross-country flight training"],
          price: "$15,000 - $20,000",
          maxStudents: 4,
          certification: "CASA PPL Certificate",
          location: "Melbourne Flight Academy - Moorabbin Airport",
          instructor: "Senior Flight Instructor",
          nextStartDate: "Monthly Intakes",
          flightHours: "45",
          groundHours: "80"
        }
      ]
    },
    {
      name: "Advanced Training",
      description: "Take your career to the next level with our professional pilot training programs.",
      icon: <Navigation className="w-5 h-5" />,
      content: [
        {
          title: "Commercial Pilots License (CPL)",
          description: "Non-Integrated pathway to becoming a professional pilot",
          details: "200+ hours • Professional aviation career",
          fullDescription: "The Commercial Pilot License (CPL) is your pathway to a professional aviation career. This intensive course prepares you for commercial flight operations with advanced training in aircraft systems and professional flying techniques.",
          prerequisites: ["Minimum age: 18 years", "Hold PPL with appropriate experience", "Class 1 Aviation Medical Certificate"],
          curriculum: ["Professional flight operations", "Advanced aircraft systems", "Multi-engine aircraft operations", "Commercial flight test preparation"],
          price: "$45,000 - $65,000",
          maxStudents: 8,
          certification: "CASA CPL Certificate",
          location: "Melbourne Flight Academy - Moorabbin Airport",
          instructor: "Chief Flight Instructor",
          nextStartDate: "Quarterly Intakes",
          flightHours: "150",
          groundHours: "200"
        }
      ]
    },
    {
      name: "Design Feature Endorsements",
      description: "Specialized training for advanced aircraft systems and configurations.",
      icon: <Settings className="w-5 h-5" />,
      content: [
        {
          title: "Manual-Propeller Pitch Control",
          description: "Constant speed rating endorsement for advanced propeller control",
          details: "Specialized training • Technical competency",
          fullDescription: "This endorsement qualifies you to operate aircraft equipped with constant speed propellers. Learn advanced propeller management techniques and aircraft performance optimization.",
          prerequisites: ["Valid pilot license", "Aircraft checkout required", "Technical knowledge assessment"],
          curriculum: ["Propeller theory and operation", "Performance optimization", "Emergency procedures", "Practical flight training"],
          price: "$1,200 - $1,800",
          maxStudents: 4,
          certification: "Design Feature Endorsement",
          location: "Melbourne Flight Academy",
          instructor: "Type-rated Instructor",
          nextStartDate: "On Demand",
          flightHours: "5",
          groundHours: "8"
        },
        {
          title: "Retractable Undercarriage",
          description: "Training for aircraft with retractable landing gear systems",
          details: "Specialized training • Technical competency",
          fullDescription: "Master the operation of aircraft with retractable landing gear systems. This training covers system operation, emergency procedures, and safe flying practices.",
          prerequisites: ["Valid pilot license", "Aircraft systems knowledge", "Pre-training assessment"],
          curriculum: ["Landing gear systems", "Emergency extension procedures", "Pre-flight inspections", "Operational techniques"],
          price: "$1,000 - $1,500",
          maxStudents: 4,
          certification: "Design Feature Endorsement",
          location: "Melbourne Flight Academy",
          instructor: "Type-rated Instructor",
          nextStartDate: "On Demand",
          flightHours: "3",
          groundHours: "6"
        }
      ]
    }
  ];

  return (
    <section id="features" aria-label="Features" className="relative overflow-hidden bg-blue-600 pb-28 sm:py-32">
      <img
        alt=""
        loading="lazy"
        width="2245"
        height="1636"
        decoding="async"
        className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%] opacity-80 rotate-360"
        src="./background-features.5f7a9ac9.jpg"
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Flight Training Programs
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            Professional pilot training programs designed to help you achieve your aviation dreams. From first flight to advanced certifications.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
          <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-4">
            <div className="relative z-10 flex gap-x-4 px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal" role="tablist" aria-orientation="vertical">
              {features.map((feature, featureIndex) => (
                <div
                  key={feature.name}
                  className={`group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 ${
                    featureIndex === selectedTab
                      ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-white/10 lg:ring-inset"
                      : "hover:bg-white/10 lg:hover:bg-white/5"
                  }`}
                >
                  <h3>
                    <button
                      className={`font-display text-lg [&[data-state=selected]]:text-blue-600 lg:[&[data-state=selected]]:text-white ${
                        featureIndex === selectedTab
                          ? "text-blue-600 lg:text-white"
                          : "text-blue-100 hover:text-white lg:text-white"
                      }`}
                      role="tab"
                      type="button"
                      onClick={() => setSelectedTab(featureIndex)}
                      aria-selected={featureIndex === selectedTab}
                      data-state={featureIndex === selectedTab ? "selected" : ""}
                      data-headlessui-state={featureIndex === selectedTab ? "selected" : ""}
                      id={`headlessui-tabs-tab-${featureIndex}`}
                      aria-controls={`headlessui-tabs-panel-${featureIndex}`}
                    >
                      <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none"></span>
                      {feature.name}
                    </button>
                  </h3>
                  <p className="mt-2 hidden text-sm lg:block text-blue-100 group-hover:text-white">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            {features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                role="tabpanel"
                id={`headlessui-tabs-panel-${featureIndex}`}
                aria-labelledby={`headlessui-tabs-tab-${featureIndex}`}
                tabIndex={featureIndex === selectedTab ? 0 : -1}
                data-headlessui-state={featureIndex === selectedTab ? "selected" : ""}
                style={{ display: featureIndex === selectedTab ? undefined : "none" }}
                hidden={featureIndex !== selectedTab}
                className="w-full"
              >
                <div className="relative sm:px-6 lg:hidden">
                  <div className="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-white/10 ring-inset sm:inset-x-0 sm:rounded-t-xl"></div>
                  <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-10 max-w-2xl overflow-hidden bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 rounded-lg">
                  <div className="p-6">
                    <div className="space-y-3">
                      {feature.content.map((item, index) => (
                        <div key={index} className="bg-gradient-to-r from-white to-blue-50/30 rounded-lg border border-blue-100 shadow-sm overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-200">
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <div className="flex-shrink-0 w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                <Plane className="w-3.5 h-3.5 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-medium text-slate-800 leading-tight truncate">{item.title}</h3>
                                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.description}</p>
                                <p className="text-xs text-blue-600 mt-1 font-medium">{item.details}</p>
                              </div>
                            </div>
                            
                            <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-blue-700 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 font-medium px-3 py-1.5 text-xs transition-all duration-200 flex-shrink-0"
                                  >
                                    Learn More
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                      <div className="text-sky-600">{feature.icon}</div>
                                      <DialogTitle className="text-2xl text-navy-900">{item.title}</DialogTitle>
                                    </div>
                                    <DialogDescription className="text-lg text-gray-600">
                                      {item.fullDescription}
                                    </DialogDescription>
                                  </DialogHeader>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    {/* Course Overview */}
                                    <div className="space-y-4">
                                      <h3 className="text-lg font-semibold text-navy-900 flex items-center gap-2">
                                        <Plane className="h-5 w-5 text-sky-600" />
                                        Course Overview
                                      </h3>
                                      
                                      <div className="grid grid-cols-1 gap-4">
                                        <div className="flex items-center gap-2">
                                          <Clock className="h-4 w-4 text-gray-500" />
                                          <span className="text-sm text-gray-600">Duration: {item.flightHours} flight hrs • {item.groundHours} ground hrs</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <DollarSign className="h-4 w-4 text-gray-500" />
                                          <span className="text-sm text-gray-600">Price: {item.price}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Users className="h-4 w-4 text-gray-500" />
                                          <span className="text-sm text-gray-600">Max Students: {item.maxStudents}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Award className="h-4 w-4 text-gray-500" />
                                          <span className="text-sm text-gray-600">Certification: {item.certification}</span>
                                        </div>
                                      </div>

                                      <div className="bg-sky-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-navy-900 mb-2">Training Hours</h4>
                                        <div className="space-y-1">
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Flight Hours:</span>
                                            <Badge variant="outline">{item.flightHours}</Badge>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Ground Hours:</span>
                                            <Badge variant="outline">{item.groundHours}</Badge>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-2">
                                        <div>
                                          <span className="font-medium text-gray-700">Instructor:</span>
                                          <span className="ml-2 text-gray-600">{item.instructor}</span>
                                        </div>
                                        <div>
                                          <span className="font-medium text-gray-700">Location:</span>
                                          <span className="ml-2 text-gray-600">{item.location}</span>
                                        </div>
                                        <div>
                                          <span className="font-medium text-gray-700">Next Start Date:</span>
                                          <span className="ml-2 text-sky-600 font-medium">{item.nextStartDate}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Prerequisites and Curriculum */}
                                    <div className="space-y-4">
                                      <div>
                                        <h3 className="text-lg font-semibold text-navy-900 mb-3">Prerequisites</h3>
                                        <ul className="space-y-2">
                                          {item.prerequisites.map((prereq, prereqIndex) => (
                                            <li key={prereqIndex} className="flex items-start">
                                              <svg className="h-4 w-4 text-orange-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                              </svg>
                                              <span className="text-sm text-gray-600">{prereq}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>

                                      <div>
                                        <h3 className="text-lg font-semibold text-navy-900 mb-3">Curriculum Highlights</h3>
                                        <ul className="space-y-2">
                                          {item.curriculum.map((curriculumItem, curriculumIndex) => (
                                            <li key={curriculumIndex} className="flex items-start">
                                              <svg className="h-4 w-4 text-sky-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                              </svg>
                                              <span className="text-sm text-gray-600">{curriculumItem}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex gap-3 mt-6 pt-4 border-t">
                                    <Button className="flex-1 bg-sky-600 hover:bg-sky-700">
                                      Enroll Now
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                      Contact Instructor
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
