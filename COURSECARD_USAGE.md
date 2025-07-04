# Updated CourseCard Component

The CourseCard component has been updated to work with the CMS API data. Here's how to use it:

## Usage Example

```tsx
import CourseCard from "@/components/CourseCard";
import { Plane } from "lucide-react";

// Example course data from CMS API
const exampleCourse = {
  id: 2,
  title: "Trial Introductory Flight (TIF) Beginner",
  description: "Experience the thrill of flying and see if aviation is right for you",
  details: "Single flight session • Perfect for beginners",
  fullDescription: [
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          text: "The Trial Introductory Flight (TIF) is your gateway to the world of aviation..."
        }
      ]
    }
  ],
  category: "core-licenses",
  price: "$299",
  flightHours: "1.0",
  groundHours: "0.5",
  maxStudents: 1,
  certification: "Trial Flight Certificate",
  location: "Melbourne Flight Academy - Moorabbin Airport",
  nextStartDate: "Available Daily",
  prerequisites: [
    "Minimum age: 14 years",
    "Valid photo identification",
    "No medical certificate required"
  ],
  curriculum: [
    "Aircraft familiarization and safety briefing",
    "Basic flight controls and instruments",
    "Take-off and climb procedures"
  ],
  isActive: true,
  instructor: null
};

// Usage in component
function MyComponent() {
  return (
    <CourseCard
      course={exampleCourse}
      icon={<Plane className="w-6 h-6" />}
      additionalCourses={[]} // Optional: other courses to show in modal
    />
  );
}
```

## New Props Interface

```tsx
type CourseCardProps = {
  course: any; // Course object from CMS API
  icon?: React.ReactNode; // Optional icon (defaults to Plane)
  additionalCourses?: any[]; // Optional additional courses to show in modal
};
```

## Key Changes

1. **Simplified Props**: Now only requires a `course` object and optional `icon` and `additionalCourses`
2. **Direct API Integration**: Works directly with the flat structure returned by the CMS API
3. **Automatic Data Extraction**: Automatically extracts all course properties from the API response
4. **Rich Text Support**: Handles rich text content from the `fullDescription` field
5. **Flexible Duration**: Automatically formats duration from flight and ground hours

## Features

- **Course Overview**: Shows title, description, pricing, and key details
- **Modal Dialog**: Detailed view with prerequisites, curriculum, and instructor info
- **Training Hours**: Displays flight and ground hours with badges
- **Prerequisites**: Lists all course prerequisites with icons
- **Curriculum**: Shows curriculum highlights
- **Additional Courses**: Optional section to display related courses
- **Action Buttons**: Enroll Now and Contact Instructor buttons

## Integration with CMS Hook

The component works seamlessly with the `useCoursesByCategory` hook:

```tsx
import { useCoursesByCategory } from "@/hooks/useCMS";

function CoursesSection() {
  const { data: courses, isLoading, error } = useCoursesByCategory("core-licenses");
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```

## Example Implementation

See `CoursesGrid.tsx` for a complete implementation example that includes:
- Category tabs for filtering courses
- Loading states
- Error handling
- Responsive grid layout
- Integration with the CMS API
