import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { Animated } from '../components/Animated';
import { Link } from 'react-router-dom';

const outcomes = [
  {
    client: 'E-commerce Retailer',
    metric: 42,
    prefix: '+',
    suffix: '%',
    label: 'Conversion Rate Lift',
    summary: 'A complete redesign focusing on mobile UX and a streamlined checkout process led to a 42% increase in conversion rates.',
    image: 'https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    alt: 'A visually appealing e-commerce website showing clothing products.'
  },
  {
    client: 'B2B SaaS Provider',
    metric: 150,
    prefix: '+',
    suffix: '%',
    label: 'Increase in MQLs',
    summary: 'By clarifying their value proposition and building high-intent landing pages, we boosted their marketing qualified leads by over 150%.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    alt: 'A person using a SaaS application on a laptop, showing data and charts.'
  },
  {
    client: 'Local Home Services',
    metric: 1.6,
    suffix: 's',
    label: 'LCP Time Improvement',
    summary: 'Our performance-first development approach cut their Largest Contentful Paint time from 3.8s to 2.2s, drastically improving user experience.',
    image: 'https://images.pexels.com/photos/8006323/pexels-photo-8006323.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    alt: 'A clean and modern HVAC unit, representing a home services client.'
  },
];


const MetricCounter: React.FC<{ metric: number, prefix?: string, suffix?: string }> = ({ metric, prefix = '', suffix = '' }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        const num = metric % 1 !== 0 ? latest.toFixed(1) : Math.round(latest);
        return `${prefix}${num}${suffix}`;
    });
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
  
    useEffect(() => {
      if (inView) {
          const controls = animate(count, metric, { duration: 2, ease: 'easeOut' });
          return controls.stop;
      }
    }, [inView, count, metric]);
  
    return <motion.span ref={ref}>{rounded}</motion.span>;
};


const WebsiteOutcomes: React.FC = () => {
  return (
    <section id="website-outcomes" className="py-24 md:py-28" style={{ background: 'var(--grad-2)' }}>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Animated className="text-center">
          <h2 className="text-base font-semibold text-brand-red uppercase tracking-wider">Proven Website Results</h2>
          <p className="mt-2 text-3xl font-bold font-heading text-white sm:text-4xl">
            Websites That Work as Hard as You Do
          </p>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
            Our designs are beautiful, but they're built for performance. See the tangible business results we've delivered.
          </p>
        </Animated>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {outcomes.map((outcome, index) => (
                <Animated key={outcome.client} delay={index * 0.1}>
                  <div className="bg-white/5 rounded-xl h-full flex flex-col border border-white/10 shadow-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all transform hover:-translate-y-1 overflow-hidden">
                      <img className="w-full h-48 object-cover" src={outcome.image} alt={outcome.alt} />
                      <div className="p-8 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-white">{outcome.client}</h3>
                          <div className="my-6 text-center flex-grow">
                            <span className="text-5xl md:text-6xl font-bold font-heading text-white">
                               <MetricCounter metric={outcome.metric} prefix={outcome.prefix} />
                               {outcome.suffix && <span className="text-4xl">{outcome.suffix}</span>}
                            </span>
                            <p className="text-slate-400 mt-1">{outcome.label}</p>
                          </div>
                          
                          <p className="text-base text-slate-300 text-center ">{outcome.summary}</p>
                          <div className="text-center mt-6">
                            <Link to="/website-design" className="font-semibold text-sm text-brand-red hover:underline">Read Case Study</Link>
                          </div>
                      </div>
                  </div>
                </Animated>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteOutcomes;