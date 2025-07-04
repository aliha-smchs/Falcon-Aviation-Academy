
import TestimonialCard from "./TestimonialCard";
import { useTestimonials } from "@/hooks/useCMS";
import { cmsService } from "@/services/cms";
import { ErrorState, NetworkError } from "@/components/ui/error-state";
import { TestimonialCardSkeleton, LoadingGrid } from "@/components/ui/loading-skeletons";

// Define interface based on new API response format
interface TestimonialResponse {
  data: TestimonialData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}

interface TestimonialData {
  id: number;
  documentId: string;
  quote: {
    type: string;
    children: {
      type: string;
      text: string;
    }[]
  }[];
  name: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image:string;
}

// Helper function to transform CMS testimonial data
const transformCMSTestimonial = (cmsTestimonial: any) => {
  // Transform testimonial data to match our component's needs
  
  // Extract text from rich text quote field
  let quoteText = 'No quote available';
  try {
    if (Array.isArray(cmsTestimonial.quote) && cmsTestimonial.quote.length > 0) {
      const paragraph = cmsTestimonial.quote[0];
      if (paragraph && Array.isArray(paragraph.children)) {
        quoteText = paragraph.children
          .map((child: any) => child && typeof child.text === 'string' ? child.text : '')
          .join(' ')
          .trim();
      }
    }
  } catch (error) {
    console.error('Error parsing testimonial quote:', error);
  }

  // Extract image URL using the same pattern as AircraftFleet
  const imageUrl = cmsTestimonial.image?.url 
    ? cmsService.getImageUrl(cmsTestimonial.image.url)
    : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400';
  
  // Log the image URL for debugging
  console.log('Testimonial image path:', cmsTestimonial.image?.url);
  console.log('Processed image URL:', imageUrl);

  return {
    quote: quoteText || 'No quote available',
    name: cmsTestimonial.name || 'Anonymous',
    title: cmsTestimonial.title || '',
    image: imageUrl,
  };
};

const Testimonials = () => {
  const { data: testimonialResponse, isLoading, error, refetch } = useTestimonials();

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-gradient-to-br from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Success stories from pilots who launched their aviation careers with us.
            </p>
          </div>
          
          <LoadingGrid 
            count={3} 
            Component={TestimonialCardSkeleton}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className="py-20 bg-gradient-to-br from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Success stories from pilots who launched their aviation careers with us.
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

  if (!testimonialResponse || !testimonialResponse.data || testimonialResponse.data.length === 0) {
    return (
      <section id="testimonials" className="py-20 bg-gradient-to-br from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Success stories from pilots who launched their aviation careers with us.
            </p>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const transformedTestimonials = testimonialResponse.data.map(transformCMSTestimonial);

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-sky-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">What Our Students Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Success stories from pilots who launched their aviation careers with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformedTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
