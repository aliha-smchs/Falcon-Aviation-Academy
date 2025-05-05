
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type InstructorCardProps = {
  name: string;
  title: string;
  image: string;
  experience: string;
  qualifications: string[];
  bio: string;
};

const InstructorCard = ({ name, title, image, experience, qualifications, bio }: InstructorCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="h-60 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-navy-900">{name}</CardTitle>
        <CardDescription className="text-sky-600 font-medium">{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 mb-4">{bio}</p>
        <p className="text-sm font-medium text-gray-700 mb-2">Experience: {experience}</p>
        <div className="flex flex-wrap gap-2">
          {qualifications.map((qualification, index) => (
            <Badge key={index} variant="secondary" className="bg-sky-100 text-sky-800 hover:bg-sky-200">
              {qualification}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCard;
