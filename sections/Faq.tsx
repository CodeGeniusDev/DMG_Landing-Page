import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Animated } from '../components/Animated';

export const faqData = [
  {
    question: 'How long does a typical website redesign take?',
    answer: 'A standard website redesign project typically takes 8-12 weeks from kickoff to launch. This timeline can vary based on the complexity of the site, the number of pages, and the extent of custom features required. We provide a detailed project timeline upfront.',
  },
  {
    question: 'What platform do you build websites on?',
    answer: 'We are platform-agnostic and choose the best technology for your specific needs. For most clients, we recommend modern headless CMS solutions for their speed and flexibility, but we are also experts in platforms like WordPress and Webflow.',
  },
  {
    question: 'Will I be able to update the website myself?',
    answer: 'Absolutely. We build all our websites on user-friendly Content Management Systems (CMS) and provide comprehensive training upon handoff. You will be fully empowered to manage and update your content.',
  },
  {
    question: 'Is SEO included in the website design project?',
    answer: 'Yes, foundational on-page SEO is a critical part of our process. This includes proper site structure, meta tags, schema markup, and image optimization. For ongoing ranking growth, we recommend our monthly SEO retainer service.',
  },
  {
    question: 'What do you need from me to get started?',
    answer: 'To start, we typically need access to your existing website and analytics, brand guidelines, and key stakeholder availability for an initial strategy session. Our free audit is the best first step to outline all requirements.',
  },
  {
    question: 'Do you offer website hosting and maintenance?',
    answer: 'While we don\'t host websites directly, we partner with top-tier managed hosting providers and can get you set up on a secure, high-performance server. We also offer monthly maintenance plans to handle updates, backups, and security.',
  },
];

const FaqItem: React.FC<{ item: typeof faqData[0], isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10">
      <h3>
        <button
          onClick={onClick}
          className="flex justify-between items-center w-full py-6 text-left text-lg font-semibold text-white"
          aria-expanded={isOpen}
        >
          <span>{item.question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-6 w-6 text-slate-400" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-base text-slate-300 max-w-prose">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-28" style={{ background: 'var(--grad-1)' }}>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Animated className="text-center">
          <h2 className="text-3xl font-bold font-heading text-white sm:text-4xl">
            Your Questions, Answered
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
            Everything you need to know about our website design process.
          </p>
        </Animated>
        <Animated delay={0.2}>
          <div className="mt-12 max-w-3xl mx-auto bg-white/5 p-4 rounded-xl border border-white/10">
            {faqData.map((item, index) => (
              <FaqItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default Faq;