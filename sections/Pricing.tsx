import React from 'react';
import { Check } from 'lucide-react';
import { Animated } from '../components/Animated';
import { useModal } from '../context/ModalContext';
import { trackEvent } from '../lib/analytics';

const plans = [
    {
        name: 'Starter X',
        price: 99,
        description: 'Only $99 per Month - Business Starter package includes 3 page website.',
        features: [
            '3 Page Website',
            'One Time SEO Optimization',
            'Basic Logo Design (add +$149)',
            'Business Card Design (add +$98)',
            'Unlimited Traffic',
            'Domain Name',
            'Website Hosting',
            'SSL Certificate',
            'Professional E-Mail / Example info@yourdomain.com'
        ],
        ctaText: 'Subscribe Now',
        isFeatured: false,
        ctaStyle: 'primary'
    },
    {
        name: 'Pro X',
        price: 149,
        description: 'Only $149 per Month - Business Pro Starter package includes basic logo design & business card design.',
        features: [
            '5 Page Website',
            'One Time SEO Optimization',
            'Basic Logo Design',
            'Business Card Design',
            'Unlimited Traffic',
            'Domain Name',
            'Website Hosting',
            'SSL Certificate',
            'Domain Name', // As per image, this is duplicated
            'Professional E-Mail / Example info@yourdomain.com'
        ],
        ctaText: 'Subscribe Now',
        isFeatured: true,
        ctaStyle: 'secondary'
    },
    {
        name: 'Premium X',
        price: 199,
        pricePrefix: 'Starting at',
        description: 'Starting at $199 per month - Informational/ Store, Cart, Check out page - Ecommerce store packages vary based on products.',
        features: [
            '10 Pages Website',
            'E-Commerce Store',
            'Payment Integration',
            'Cart & Check Out Page',
            'Customized Logo Design',
            'Unlimited Traffic',
            'Domain Name',
            'Website Hosting',
            'SSL Certificate',
            'Professional E-Mail / Example info@yourdomain.com'
        ],
        ctaText: 'Schedule a Meeting',
        isFeatured: false,
        ctaStyle: 'primary'
    }
];

type Plan = typeof plans[0];

const PricingCard: React.FC<{ plan: Plan; onCtaClick: () => void }> = ({ plan, onCtaClick }) => {
    const isFeatured = plan.isFeatured;

    const cardBaseClasses = "relative h-full flex flex-col p-8 rounded-2xl transition-all duration-300";
    const featuredClasses = "bg-slate-800/80 backdrop-blur-sm border-brand-red/50 shadow-2xl shadow-brand-red/10 scale-105 ring-2 ring-brand-red/50";
    const standardClasses = "bg-slate-50 border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2";

    const titleClasses = isFeatured ? 'text-white' : 'text-neutral-900';
    const descriptionClasses = isFeatured ? 'text-slate-300' : 'text-neutral-700';
    const priceClasses = isFeatured ? 'text-white' : 'text-neutral-900';
    const priceUnitClasses = isFeatured ? 'text-slate-400' : 'text-slate-500';
    const featureClasses = isFeatured ? 'text-slate-300' : 'text-neutral-700';
    const featureBorderClasses = isFeatured ? 'border-white/10' : 'border-slate-200';

    const ctaBaseClasses = "block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2";
    const ctaPrimaryClasses = `bg-brand-red text-white hover:bg-red-700 focus:ring-brand-red/50 ${isFeatured ? 'focus:ring-offset-slate-800' : 'focus:ring-offset-slate-50'}`;
    const ctaSecondaryClasses = `bg-white text-neutral-900 hover:bg-slate-200 focus:ring-slate-400 focus:ring-offset-slate-800`;

    return (
        <div className={`${cardBaseClasses} ${isFeatured ? featuredClasses : standardClasses}`}>
            {isFeatured && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-red text-white text-sm font-semibold rounded-full uppercase tracking-wider shadow-lg">
                    Best Value
                </div>
            )}
            
            <h3 className={`text-xl font-bold font-heading text-center ${titleClasses}`}>{plan.name}</h3>
            <p className={`mt-4 text-sm text-center min-h-[4rem] ${descriptionClasses}`}>{plan.description}</p>
            
            <div className="my-6 text-center">
                <p className={`text-5xl font-bold font-heading ${priceClasses}`}>
                    {plan.pricePrefix && <span className={`text-lg font-medium align-middle ${priceUnitClasses}`}>{plan.pricePrefix} </span>}
                    ${plan.price}
                    <span className={`text-lg font-medium ${priceUnitClasses}`}>/month</span>
                </p>
            </div>
            
            <ul className={`space-y-3 flex-grow border-t pt-8 ${featureBorderClasses} ${featureClasses}`}>
                {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                        <Check className="flex-shrink-0 h-5 w-5 text-accents-green mr-3 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            
            <div className="mt-8">
                <button 
                    onClick={onCtaClick} 
                    className={`${ctaBaseClasses} ${plan.ctaStyle === 'primary' ? ctaPrimaryClasses : ctaSecondaryClasses}`}
                >
                    {plan.ctaText}
                </button>
            </div>
        </div>
    );
};


const Pricing: React.FC = () => {
  const { openModal } = useModal();

  const handleCTAClick = (planName: string) => {
    trackEvent('click', {
      event_category: 'CTA',
      event_label: `Pricing Plan Click (${planName})`,
    });
    openModal();
  };

  return (
    <section id="pricing" className="py-24 md:py-28 relative overflow-hidden" style={{ background: 'var(--grad-2)' }}>
      <div className="absolute -left-1/4 top-1/2 w-[30rem] h-[30rem] bg-brand-red/5 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Animated className="text-center">
          <h2 className="text-3xl font-bold font-heading text-white sm:text-4xl">
            Find the Perfect Plan for Your Business
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
            Choose a plan that fits your needs. All our website packages are designed to deliver results and grow with you.
          </p>
        </Animated>

        <div className="mt-20 grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, index) => (
              <Animated key={plan.name} delay={index * 0.1}>
                  <PricingCard plan={plan} onCtaClick={() => handleCTAClick(plan.name)} />
              </Animated>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;