
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CourseCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  details: string[];
};

const CourseCard = ({ title, description, icon, duration, details }: CourseCardProps) => {
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
        <Button className="w-full bg-navy-800 hover:bg-navy-900">Learn More</Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
