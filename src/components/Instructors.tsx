
import InstructorCard from "./InstructorCard";
import { useInstructors } from "@/hooks/useCMS";
import { cmsService } from "@/services/cms";
import { ErrorState, NetworkError } from "@/components/ui/error-state";
import { InstructorCardSkeleton, LoadingGrid } from "@/components/ui/loading-skeletons";
import { CMSInstructor } from "@/types/cms";

// Helper function to transform CMS instructor data
const transformCMSInstructor = (cmsInstructor: any) => {
  if (!cmsInstructor) {
    console.warn('Invalid CMS Instructor data:', cmsInstructor);
    return {
      name: 'Unknown Instructor',
      title: 'Flight Instructor',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1000',
      experience: '0 years',
      qualifications: [],
      bio: 'No bio available',
    };
  }

  // Handle both nested (attributes) and flattened data structures
  const data = cmsInstructor.attributes || cmsInstructor;
  console.log('Transforming CMS Instructor:', data);
  
  // Process bio - handle rich text format
  let bioText = 'No bio available';
  if (data.bio) {
    if (Array.isArray(data.bio)) {
      // Extract text from rich text format
      bioText = data.bio
        .map((block: any) => {
          if (block.children) {
            return block.children.map((child: any) => child.text || '').join('');
          }
          return '';
        })
        .join(' ')
        .trim() || 'No bio available';
    } else if (typeof data.bio === 'string') {
      bioText = data.bio;
    }
  }
  
  // Process qualifications - handle string or array
  let qualificationsList: string[] = [];
  if (data.qualifications) {
    if (Array.isArray(data.qualifications)) {
      qualificationsList = data.qualifications;
    } else if (typeof data.qualifications === 'string') {
      qualificationsList = [data.qualifications];
    }
  }
  
  return {
    name: data.name || 'Unknown Instructor',
    title: data.title || 'Flight Instructor',
    image: data.image?.url 
      ? cmsService.getImageUrl(data.image.url)
      : 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1000',
    experience: data.experience || '0 years',
    qualifications: qualificationsList,
    bio: bioText,
  };
};

const Instructors = () => {
  const { data: instructors, isLoading, error, refetch } = useInstructors();

  if (isLoading) {
    return (
      <section id="instructors" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Expert Flight Instructors</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry professionals with extensive experience and a passion for teaching.
            </p>
          </div>
          
          <LoadingGrid 
            count={4} 
            Component={InstructorCardSkeleton}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="instructors" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Expert Flight Instructors</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry professionals with extensive experience and a passion for teaching.
            </p>
          </div>
          
          {error.status >= 500 ? (
            <NetworkError onRetry={refetch} />
          ) : (
            <ErrorState error={error} onRetry={refetch} />
          )}
        </div>
      </section>
    );
  }

  if (!instructors || instructors.length === 0) {
    return (
      <section id="instructors" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Expert Flight Instructors</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry professionals with extensive experience and a passion for teaching.
            </p>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No instructors available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const transformedInstructors = instructors
    .filter(instructor => instructor) // Filter out null/undefined instructors
    .map(transformCMSInstructor);

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
          {transformedInstructors.map((instructor, index) => (
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
