
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The instructors at Melbourne Flight Academy made my dream of flying a reality. Their patience and expertise helped me overcome my initial nervousness and build confidence in the cockpit.",
      name: "Michael Johnson",
      title: "PPL Graduate",
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=400"
    },
    {
      quote: "The commercial pilot program was incredibly thorough. The academy's connections with airlines helped me land a job shortly after graduation. I couldn't have asked for a better start to my career.",
      name: "Emily Chen",
      title: "Commercial Pilot",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
    },
    {
      quote: "The academy's modern fleet and maintenance standards are top-notch. I always felt safe during my training, which allowed me to focus completely on developing my skills.",
      name: "James Wilson",
      title: "Instrument Rating Graduate",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
    }
  ];

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
          {testimonials.map((testimonial, index) => (
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
