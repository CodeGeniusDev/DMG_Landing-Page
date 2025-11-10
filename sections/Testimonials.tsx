import React from 'react';
import { Animated } from '../components/Animated';

const testimonials = [
  {
    quote: "TQM didn't just give us a website, they gave us a conversion machine. Our new site is incredibly fast, easy to manage, and has already increased our inbound leads by 60%. It's the best investment we've made.",
    name: 'Jane Doe',
    title: 'CEO, Midwest Manufacturing',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=faces',
  },
  {
    quote: "The redesign process was seamless. The TQM team understood our vision, communicated clearly, and delivered a final product that blew us away. Our customers love the new experience, and we love the results.",
    name: 'John Smith',
    title: 'Owner, Heartland Retail',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=faces',
  },
];

const highlightResult = (text: string) => {
    return text.replace(/(\d+%?)/g, '<span class="text-white underline decoration-brand-red decoration-2 underline-offset-4">$1</span>');
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 md:py-28 relative" style={{ background: 'var(--grad-3)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 radial-glow opacity-50" aria-hidden="true" />
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Animated className="text-center">
          <h2 className="text-3xl font-bold font-heading text-white sm:text-4xl">
            What Our Partners Say
          </h2>
        </Animated>
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Animated key={index} delay={index * 0.1}>
              <blockquote className="bg-white/5 p-8 rounded-xl h-full border border-white/10 shadow-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <p 
                    className="text-lg text-slate-300"
                    dangerouslySetInnerHTML={{ __html: highlightResult(testimonial.quote) }}
                />
                <footer className="mt-6 flex items-center gap-4">
                  <img className="h-14 w-14 rounded-full object-cover" src={testimonial.image} alt={`Photo of ${testimonial.name}`} width="56" height="56" />
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-slate-400">{testimonial.title}</div>
                  </div>
                </footer>
              </blockquote>
            </Animated>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;