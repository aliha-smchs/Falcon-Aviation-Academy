import { useState } from "react";
import { Plane, Navigation, Settings } from "lucide-react";
import CourseCard from "./CourseCard";
import { useCoursesByCategory } from "@/hooks/useCMS";
import { ErrorState, NetworkError } from "@/components/ui/error-state";

const CoursesGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("core-licenses");
  
  // Define the categories and their metadata
  const categories = [
    {
      name: "Core Licenses",
      description: "Start your aviation journey with our comprehensive training programs.",
      icon: <Plane className="w-5 h-5" />,
      value: "core-licenses"
    },
    {
      name: "Advanced Training", 
      description: "Take your career to the next level with professional training.",
      icon: <Navigation className="w-5 h-5" />,
      value: "advanced-training"
    },
    {
      name: "Endorsements",
      description: "Specialized training for advanced aircraft systems.",
      icon: <Settings className="w-5 h-5" />,
      value: "endorsements"
    }
  ];

  // Get the current category
  const currentCategory = categories.find(cat => cat.value === selectedCategory) || categories[0];
  
  // Fetch courses for the current category
  const { data: courses, isLoading, error, refetch } = useCoursesByCategory(selectedCategory);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
            Our Training Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of aviation courses designed to take you from beginner to professional pilot.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? "bg-sky-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Category Description */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-navy-900 mb-2">
            {currentCategory.name}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {currentCategory.description}
          </p>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64"></div>
              </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course: any) => (
              <CourseCard
                key={course.id}
                course={course}
                icon={currentCategory.icon}
                additionalCourses={courses.filter(c => c.id !== course.id).slice(0, 2)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plane className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses available
            </h3>
            <p className="text-gray-600">
              We're currently updating our {currentCategory.name.toLowerCase()} courses.
              Please check back soon or contact us for more information.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesGrid;
