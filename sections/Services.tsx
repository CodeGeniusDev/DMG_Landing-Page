import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Search, Users, Palette, ArrowRight } from 'lucide-react';
import { Animated } from '../components/Animated';

const services = [
  {
    name: 'Website Design & Redesign',
    description: 'We build fast, modern, and conversion-focused websites that serve as the core of your growth engine.',
    icon: Code,
    href: '/website-design',
    isPrimary: true,
  },
  {
    name: 'SEO & PPC',
    description: 'Drive targeted organic and paid traffic to maximize visibility and capture high-intent leads.',
    icon: Search,
    href: '/seo-ppc',
    isPrimary: false,
  },
  {
    name: 'Social Media Marketing',
    description: 'Engage your audience with strategic content and paid social funnels that convert.',
    icon: Users,
    href: '/social',
    isPrimary: false,
  },
  {
    name: 'Graphic Designing',
    description: 'Elevate your brand with stunning visuals, from brand kits to high-performance ad creatives.',
    icon: Palette,
    href: '/graphic-design',
    isPrimary: false,
  },
];

const GlassCard: React.FC<{service: typeof services[0], className?: string}> = ({ service, className }) => (
    <div className={`bg-white/5 p-8 rounded-xl h-full flex flex-col border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${className}`}>
        <div className="flex-shrink-0">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-brand-red/10 text-brand-red">
            <service.icon className="h-6 w-6" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-6 flex-grow">
          <h3 className="text-lg font-bold font-heading text-white">{service.name}</h3>
          <p className="mt-2 text-base text-slate-300">{service.description}</p>
        </div>
        <div className="mt-6">
          <Link to={service.href} className="inline-flex items-center text-sm font-semibold text-brand-red hover:text-red-400">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
    </div>
);

const ServicePriorityGrid: React.FC = () => {
  const handleAuditLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // FIX: Cast element to HTMLElement to access click method.
    (document.querySelector('#contact button') as HTMLElement)?.click();
  };

  return (
    <section id="services" className="py-24 md:py-28 relative overflow-hidden" style={{ background: 'var(--grad-2)' }}>
        <div className="absolute -left-1/4 top-1/4 w-[30rem] h-[30rem] bg-brand-red/10 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Animated className="text-center">
          <h2 className="text-3xl font-bold font-heading text-white sm:text-4xl">
            A Complete Growth Solution
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
            From a high-performance website to the strategies that drive traffic to it, we've got you covered.
          </p>
        </Animated>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <Animated className="lg:col-span-2">
                <GlassCard service={services[0]} />
            </Animated>
            <Animated delay={0.1}>
                <GlassCard service={services[1]} />
            </Animated>
            <Animated delay={0.2}>
                 <GlassCard service={services[2]} />
            </Animated>
             <Animated delay={0.3} className="lg:col-span-2">
                 <GlassCard service={services[3]} />
            </Animated>
        </div>
        <Animated delay={0.4} className="text-center mt-12">
            <p className="text-slate-400">Not sure where to start? <a href="#" onClick={handleAuditLinkClick} className="text-brand-red font-semibold hover:underline">Begin with a free website audit.</a></p>
        </Animated>
      </div>
    </section>
  );
};

export default ServicePriorityGrid;