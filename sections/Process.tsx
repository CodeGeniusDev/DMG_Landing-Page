import React from 'react';
import { Search, PenTool, Code, Rocket } from 'lucide-react';
import { Animated } from '../components/Animated';

const steps = [
  {
    name: 'Audit & Strategy',
    description: 'We analyze your brand, competitors, and goals to create a strategic blueprint for a high-performance website.',
    icon: Search,
  },
  {
    name: 'Wireframe & Design',
    description: 'We craft user-centric wireframes and a stunning visual design that aligns with your brand and conversion goals.',
    icon: PenTool,
  },
  {
    name: 'Build & Develop',
    description: 'Our expert developers bring the design to life with clean, fast, and scalable code on a modern tech stack.',
    icon: Code,
  },
  {
    name: 'Launch & Optimize',
    description: 'We handle a seamless launch and provide ongoing support and optimization to ensure long-term success.',
    icon: Rocket,
  },
];

const ProcessWeb: React.FC = () => {
  return (
    <section className="py-24 md:py-28 relative overflow-hidden" style={{ background: 'var(--grad-3)' }}>
        <div className="absolute -right-1/4 bottom-0 w-[30rem] h-[30rem] bg-brand-red/10 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Animated className="text-center">
          <h2 className="text-base font-semibold text-brand-red uppercase tracking-wider">Our Web Design Process</h2>
          <p className="mt-2 text-3xl font-bold font-heading text-white sm:text-4xl">
            From Blueprint to Launch
          </p>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
            Our proven, transparent process ensures your website project is delivered on time, on budget, and exceeds expectations.
          </p>
        </Animated>

        <div className="mt-20">
          <div className="relative">
             <div className="absolute top-8 left-0 hidden w-full h-px bg-white/10 md:block" aria-hidden="true">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-brand-red/50 to-transparent animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}} />
            </div>
            
            <div className="grid md:grid-cols-4 gap-x-8 gap-y-12">
                {steps.map((step, index) => (
                <Animated key={step.name} delay={index * 0.1} className="text-center relative">
                    <div className="relative z-10 flex items-center justify-center mx-auto h-16 w-16 rounded-full bg-neutral-900 border-2 border-white/10 text-brand-red shadow-lg">
                        <step.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-6 text-lg font-bold font-heading text-white">{step.name}</h3>
                    <p className="mt-2 text-base text-slate-400">{step.description}</p>
                </Animated>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessWeb;