
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type TestimonialCardProps = {
  quote: string;
  name: string;
  title: string;
  image: string;
};

const TestimonialCard = ({ quote, name, title, image }: TestimonialCardProps) => {
  return (
    <Card className="h-full flex flex-col text-left transition-all duration-300 hover:shadow-lg bg-white">
      <CardContent className="pt-6 flex-grow">
        <div className="mb-4">
          <svg className="h-8 w-8 text-sky-400" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.762 8.388c-1.21-1.358-2.77-2.038-4.68-2.038-1.605 0-2.938.527-3.998 1.58C1.031 8.983.501 10.304.501 11.884c0 1.196.317 2.291.95 3.286.633.995 1.748 1.912 3.346 2.749-1.222 3.141-1.833 5.533-1.833 7.175 0 .527.633.79 1.9.79.243 0 .712-.47 1.407-.142.695-.095 1.096-.142 1.204-.142.401 0 .87.315 1.407.948.538.632.807 1.159.807 1.58 0 .799-.185 1.358-.555 1.675-.37.317-.87.527-1.496.633l.873 2.275c2.972-.843 5.087-2.16 6.346-3.95 1.26-1.791 1.889-4.182 1.889-7.176 0-4.561-2.327-8.532-6.984-11.914v-.001c.037-.548.36-.958.969-1.231a3.778 3.778 0 012.24-.317c.316.064.613.096.89.096.38 0 .756-.174 1.126-.522.37-.347.69-.795.958-1.342a9.85 9.85 0 00.713-1.675l.396-1.432c-1.22-.345-2.305-.518-3.251-.518-1.433 0-3.567 1.023-3.04 3.588zm15.927 0c-1.21-1.358-2.77-2.038-4.68-2.038-1.605 0-2.938.527-3.998 1.58-1.053 1.053-1.58 2.374-1.58 3.954 0 1.196.316 2.291.948 3.286.633.995 1.75 1.912 3.347 2.749-1.222 3.141-1.833 5.533-1.833 7.175 0 .527.633.79 1.901.79.242 0 .711-.47 1.406-.142.696-.095 1.096-.142 1.204-.142.401 0 .87.315 1.407.948.538.632.807 1.159.807 1.58 0 .799-.185 1.358-.554 1.675-.37.317-.87.527-1.497.633l.874 2.275c2.972-.843 5.086-2.16 6.345-3.95 1.26-1.791 1.89-4.182 1.89-7.176 0-4.561-2.327-8.532-6.985-11.914v-.001c.037-.548.36-.958.97-1.231a3.773 3.773 0 12.24-.317c.317.064.613.096.89.096.38 0 .756-.174 1.126-.522.37-.347.68-.795.958-1.342a9.8 9.8 0 00.711-1.675l.397-1.432c-1.22-.345-2.305-.518-3.252-.518-1.432 0-3.567 1.023-3.04 3.588h.001z" />
          </svg>
        </div>
        <p className="text-gray-700 italic mb-6">{quote}</p>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-4 flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-navy-800">{name}</h4>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
