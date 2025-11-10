import React from 'react';
import { Animated } from '../components/Animated';
import { useModal } from '../context/ModalContext';
import { trackEvent } from '../lib/analytics';

const CtaBand: React.FC = () => {
    const { openModal } = useModal();

    const handleCTAClick = () => {
        trackEvent('click', {
            event_category: 'CTA',
            event_label: 'Start Your Redesign Footer CTA',
        });
        openModal();
    };

  return (
    <section id="contact" className="py-24 md:py-28" style={{ background: 'var(--grad-hero)' }}>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Animated>
        <div className="relative bg-white/5 rounded-2xl shadow-2xl overflow-hidden border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-brand-red/15 rounded-full blur-3xl -z-10"
            aria-hidden="true"
          />
          <div className="relative p-12 text-center">
            <h2 className="text-3xl font-bold font-heading text-white sm:text-4xl">
              Ready to Upgrade Your Website?
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Transform your online presence into your most powerful asset. Get a free, no-obligation proposal and see what's possible.
            </p>
            <div className="mt-8">
              <button
                onClick={handleCTAClick}
                className="inline-block px-8 py-3 rounded-lg text-lg font-semibold bg-brand-red text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-white transition-transform transform hover:scale-105"
              >
                Start Your Redesign
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-400">Free, no obligation. We reply within 1 business day.</p>
          </div>
        </div>
        </Animated>
      </div>
    </section>
  );
};

export default CtaBand;