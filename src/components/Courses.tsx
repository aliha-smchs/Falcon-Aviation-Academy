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
import { useCoursesByCategory } from "@/hooks/useCMS";
import { cmsService } from "@/services/cms";
import { ErrorState, NetworkError } from "@/components/ui/error-state";
import { LoadingGrid } from "@/components/ui/loading-skeletons";

const Courses = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  // Define the categories and their metadata
  const categories = [
    {
      name: "Core Licenses",
      description: "Start your aviation journey with our comprehensive training programs, from first flight to commercial license.",
      icon: <Plane className="w-5 h-5" />,
      apiValue: "core-licenses"
    },
    {
      name: "Advanced Training", 
      description: "Take your career to the next level with our professional pilot training programs.",
      icon: <Navigation className="w-5 h-5" />,
      apiValue: "advanced-training"
    },
    {
      name: "Design Feature Endorsements",
      description: "Specialized training for advanced aircraft systems and configurations.",
      icon: <Settings className="w-5 h-5" />,
      apiValue: "endorsements"
    }
  ];

  // Get the current category
  const currentCategory = categories[selectedTab];
  
  // Fetch courses for the current category
  const { data: courses, isLoading, error, refetch } = useCoursesByCategory(currentCategory.apiValue);

  // Helper function to safely render rich text content
  const renderRichText = (content: any): string => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
      return content.map(block => {
        if (block.children) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      }).join(' ');
    }
    if (typeof content === 'object' && content.children) {
      return content.children.map((child: any) => child.text || '').join('');
    }
    return String(content);
  };

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
              {categories.map((category, categoryIndex) => (
                <div
                  key={category.name}
                  className={`group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 ${
                    categoryIndex === selectedTab
                      ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-white/10 lg:ring-inset"
                      : "hover:bg-white/10 lg:hover:bg-white/5"
                  }`}
                >
                  <h3>
                    <button
                      className={`font-display text-lg [&[data-state=selected]]:text-blue-600 lg:[&[data-state=selected]]:text-white ${
                        categoryIndex === selectedTab
                          ? "text-blue-600 lg:text-white"
                          : "text-blue-100 hover:text-white lg:text-white"
                      }`}
                      role="tab"
                      type="button"
                      onClick={() => setSelectedTab(categoryIndex)}
                      aria-selected={categoryIndex === selectedTab}
                      data-state={categoryIndex === selectedTab ? "selected" : ""}
                      data-headlessui-state={categoryIndex === selectedTab ? "selected" : ""}
                      id={`headlessui-tabs-tab-${categoryIndex}`}
                      aria-controls={`headlessui-tabs-panel-${categoryIndex}`}
                    >
                      <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none"></span>
                      {category.name}
                    </button>
                  </h3>
                  <p className="mt-2 hidden text-sm lg:block text-blue-100 group-hover:text-white">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div
              role="tabpanel"
              id={`headlessui-tabs-panel-${selectedTab}`}
              aria-labelledby={`headlessui-tabs-tab-${selectedTab}`}
              tabIndex={0}
              className="w-full"
            >
              <div className="relative sm:px-6 lg:hidden">
                <div className="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-white/10 ring-inset sm:inset-x-0 sm:rounded-t-xl"></div>
                <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                  {currentCategory.description}5
                </p>
              </div>

              <div className="mt-10 max-w-2xl overflow-hidden bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 rounded-lg">
                <div className="p-6">
                  {isLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
                      ))}
                    </div>
                  ) : error ? (
                    <div className="text-center py-8">
                      {error.status >= 500 ? (
                        <NetworkError onRetry={refetch} />
                      ) : (
                        <ErrorState error={error} onRetry={refetch} />
                      )}
                    </div>
                  ) : courses && courses.length > 0 ? (
                    <div className="space-y-3">
                      {courses.map((course: any) => {
                        const courseData = course.attributes || course;
                        const instructorName = courseData.instructor?.data?.attributes?.name || 'TBD';
                        
                        return (
                          <div key={course.id} className="bg-gradient-to-r from-white to-blue-50/30 rounded-lg border border-blue-100 shadow-sm overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-200">
                            <div className="p-4 flex items-center justify-between">
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="flex-shrink-0 w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                  <Plane className="w-3.5 h-3.5 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg font-medium text-slate-800 leading-tight truncate">{courseData.title}</h3>
                                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{courseData.description}</p>
                                  <p className="text-xs text-blue-600 mt-1 font-medium">{courseData.duration}</p>
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
                                      <div className="text-sky-600">{currentCategory.icon}</div>
                                      <DialogTitle className="text-2xl text-navy-900">{courseData.title}</DialogTitle>
                                    </div>
                                    <DialogDescription className="text-lg text-gray-600">
                                      {renderRichText(courseData.fullDescription || courseData.description)}
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
                                          <span className="text-sm text-gray-600">Duration: {courseData.flightHours || 'TBD'} flight hrs • {courseData.groundHours || 'TBD'} ground hrs</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <DollarSign className="h-4 w-4 text-gray-500" />
                                          <span className="text-sm text-gray-600">Price: {courseData.price || 'Contact for pricing'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Users className="h-4 w-4 text-gray-500" />
                                          <span className="text-sm text-gray-600">Max Students: {courseData.maxStudents || 'TBD'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Award className="h-4 w-4 text-gray-500" />
                                          <span className="text-sm text-gray-600">Certification: {courseData.certification || 'TBD'}</span>
                                        </div>
                                      </div>

                                      <div className="bg-sky-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-navy-900 mb-2">Training Hours</h4>
                                        <div className="space-y-1">
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Flight Hours:</span>
                                            <Badge variant="outline">{courseData.flightHours || 'TBD'}</Badge>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Ground Hours:</span>
                                            <Badge variant="outline">{courseData.groundHours || 'TBD'}</Badge>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-2">
                                        <div>
                                          <span className="font-medium text-gray-700">Instructor:</span>
                                          <span className="ml-2 text-gray-600">{instructorName}</span>
                                        </div>
                                        <div>
                                          <span className="font-medium text-gray-700">Location:</span>
                                          <span className="ml-2 text-gray-600">{courseData.location || 'Melbourne Flight Academy'}</span>
                                        </div>
                                        <div>
                                          <span className="font-medium text-gray-700">Next Start Date:</span>
                                          <span className="ml-2 text-sky-600 font-medium">{courseData.nextStartDate || 'Contact for schedule'}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Prerequisites and Curriculum */}
                                    <div className="space-y-4">
                                      <div>
                                        <h3 className="text-lg font-semibold text-navy-900 mb-3">Prerequisites</h3>
                                        <ul className="space-y-2">
                                          {courseData.prerequisites && courseData.prerequisites.length > 0 ? (
                                            courseData.prerequisites.map((prereq: string, prereqIndex: number) => (
                                              <li key={prereqIndex} className="flex items-start">
                                                <svg className="h-4 w-4 text-orange-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm text-gray-600">{prereq}</span>
                                              </li>
                                            ))
                                          ) : (
                                            <li className="flex items-start">
                                              <svg className="h-4 w-4 text-orange-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                              </svg>
                                              <span className="text-sm text-gray-600">Contact us for requirements</span>
                                            </li>
                                          )}
                                        </ul>
                                      </div>

                                      <div>
                                        <h3 className="text-lg font-semibold text-navy-900 mb-3">Curriculum Highlights</h3>
                                        <ul className="space-y-2">
                                          {courseData.curriculum && courseData.curriculum.length > 0 ? (
                                            courseData.curriculum.map((curriculumItem: string, curriculumIndex: number) => (
                                              <li key={curriculumIndex} className="flex items-start">
                                                <svg className="h-4 w-4 text-sky-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm text-gray-600">{curriculumItem}</span>
                                              </li>
                                            ))
                                          ) : courseData.details && courseData.details.length > 0 ? (
                                            courseData.details.map((detail: string, detailIndex: number) => (
                                              <li key={detailIndex} className="flex items-start">
                                                <svg className="h-4 w-4 text-sky-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm text-gray-600">{detail}</span>
                                              </li>
                                            ))
                                          ) : (
                                            <li className="flex items-start">
                                              <svg className="h-4 w-4 text-sky-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                              </svg>
                                              <span className="text-sm text-gray-600">Comprehensive training curriculum</span>
                                            </li>
                                          )}
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
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No courses available in this category.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
