
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Clock, DollarSign, Users, Award, Plane } from "lucide-react";
import { CMSCourse } from "@/types/cms";
import { cmsService } from "@/services/cms";

type CourseCardProps = {
  course: any; // Using any for now since the API returns a flat structure
  icon?: React.ReactNode;
  additionalCourses?: any[];
};

// Helper function to safely render rich text content
const renderRichText = (content: any): string => {
  if (!content) return '';
  
  if (typeof content === 'string') {
    return content;
  }
  
  if (Array.isArray(content)) {
    return content.map(item => {
      if (item.type === 'paragraph' && item.children) {
        return item.children.map((child: any) => child.text || '').join('');
      }
      return '';
    }).join(' ');
  }
  
  return '';
};

const CourseCard = ({ 
  course,
  icon = <Plane className="w-6 h-6" />,
  additionalCourses = []
}: CourseCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Extract data from course object (API returns flat structure)
  const title = course.title;
  const description = course.description;
  const fullDescription = renderRichText(course.fullDescription) || description;
  const duration = `${course.flightHours || 0} flight hrs • ${course.groundHours || 0} ground hrs`;
  const details = Array.isArray(course.details) ? course.details : [course.details].filter(Boolean);
  const prerequisites = course.prerequisites || [];
  const curriculum = course.curriculum || [];
  const price = course.price;
  const maxStudents = course.maxStudents;
  const certification = course.certification;
  const location = course.location;
  const nextStartDate = course.nextStartDate;
  const flightHours = course.flightHours;
  const groundHours = course.groundHours;
  const instructor = course.instructor?.name || course.instructor?.data?.attributes?.name || 'TBD';

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="mb-2 text-sky-600">{icon}</div>
        <CardTitle className="text-navy-900 text-xl">{title}</CardTitle>
        <CardDescription className="text-gray-500">{duration}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700 mb-4">{description}</p>
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600">{detail}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-navy-800 hover:bg-navy-900">Learn More</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-sky-600">{icon}</div>
                <DialogTitle className="text-2xl text-navy-900">{title}</DialogTitle>
              </div>
              <DialogDescription className="text-lg text-gray-600">
                {fullDescription || description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Course Overview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-navy-900 flex items-center gap-2">
                  <Plane className="h-5 w-5 text-sky-600" />
                  Course Overview
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Duration: {duration}</span>
                    </div>
                  )}
                  {price && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Price: {price}</span>
                    </div>
                  )}
                  {maxStudents && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Max Students: {maxStudents}</span>
                    </div>
                  )}
                  {certification && (
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Certification: {certification}</span>
                    </div>
                  )}
                </div>

                {(flightHours || groundHours) && (
                  <div className="bg-sky-50 p-4 rounded-lg">
                    <h4 className="font-medium text-navy-900 mb-2">Training Hours</h4>
                    <div className="space-y-1">
                      {flightHours && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Flight Hours:</span>
                          <Badge variant="outline">{flightHours}</Badge>
                        </div>
                      )}
                      {groundHours && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ground Hours:</span>
                          <Badge variant="outline">{groundHours}</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {(instructor || location || nextStartDate) && (
                  <div className="space-y-2">
                    {instructor && (
                      <div>
                        <span className="font-medium text-gray-700">Instructor:</span>
                        <span className="ml-2 text-gray-600">{instructor}</span>
                      </div>
                    )}
                    {location && (
                      <div>
                        <span className="font-medium text-gray-700">Location:</span>
                        <span className="ml-2 text-gray-600">{location}</span>
                      </div>
                    )}
                    {nextStartDate && (
                      <div>
                        <span className="font-medium text-gray-700">Next Start Date:</span>
                        <span className="ml-2 text-sky-600 font-medium">{nextStartDate}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Prerequisites and Curriculum */}
              <div className="space-y-4">
                {prerequisites.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 mb-3">Prerequisites</h3>
                    <ul className="space-y-2">
                      {prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-4 w-4 text-orange-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-600">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {curriculum.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 mb-3">Curriculum Highlights</h3>
                    <ul className="space-y-2">
                      {curriculum.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-4 w-4 text-sky-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* What you'll learn section */}
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Additional Courses Section */}
            {additionalCourses.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">Other Available Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {additionalCourses.map((additionalCourse, index) => (
                    <Card key={index} className="border border-gray-200 hover:border-sky-300 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-navy-900">{additionalCourse.title}</CardTitle>
                        <CardDescription className="text-gray-500">
                          {additionalCourse.flightHours} flight hrs • {additionalCourse.groundHours} ground hrs
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-2">{additionalCourse.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{additionalCourse.certification}</span>
                          <Badge variant="outline" className="text-sky-600">{additionalCourse.price}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Interested in these courses? Contact us for more information and enrollment details.
                  </p>
                </div>
              </div>
            )}

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
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
