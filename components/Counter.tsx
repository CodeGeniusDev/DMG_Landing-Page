import React from 'react';
import { Animated } from './Animated';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BandSEO: React.FC = () => (
    <section className="py-20" style={{ background: 'var(--grad-3)' }}>
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <Animated>
                    <h3 className="text-3xl font-bold font-heading text-white">Drive Traffic with SEO & PPC</h3>
                    <p className="mt-4 text-lg text-slate-300">A great website is just the start. We build integrated search strategies to ensure a steady stream of high-intent visitors finds you.</p>
                    <ul className="mt-4 space-y-2 text-slate-400">
                        <li>- ROI-focused campaign management</li>
                        <li>- Transparent tracking and reporting</li>
                        <li>- Technical SEO and content strategy</li>
                    </ul>
                    <div className="mt-6">
                        <Link to="/seo-ppc" className="inline-flex items-center font-semibold text-brand-red hover:text-red-400 transition-colors">
                            Get Search & Ads Plan <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </Animated>
                <Animated delay={0.1}>
                    <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Marketing team reviewing an analytics dashboard with upward trends." className="rounded-lg shadow-2xl" />
                </Animated>
            </div>
        </div>
    </section>
);

const BandSocial: React.FC = () => (
    <section className="py-20" style={{ background: 'var(--grad-4)' }}>
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <Animated delay={0.1} className="md:order-last">
                    <h3 className="text-3xl font-bold font-heading text-white">Engage with Social Media</h3>
                    <p className="mt-4 text-lg text-slate-300">We create acquisition and retention funnels using compelling creatives, UGC, and targeted paid social campaigns.</p>
                    <p className="mt-2 text-sm text-slate-400">Platforms: Meta, LinkedIn, Instagram, TikTok.</p>
                    <div className="mt-6">
                        <Link to="/social" className="inline-flex items-center font-semibold text-brand-red hover:text-red-400 transition-colors">
                             Plan My Social Funnel <ArrowRight className="inline ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </Animated>
                <Animated>
                    <img src="https://images.pexels.com/photos/7688162/pexels-photo-7688162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="A desk with a social media content calendar and smartphone showing post designs." className="rounded-lg shadow-2xl" />
                </Animated>
            </div>
        </div>
    </section>
);

const BandDesign: React.FC = () => (
     <section className="py-20" style={{ background: 'var(--grad-3)' }}>
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <Animated>
                    <h3 className="text-3xl font-bold font-heading text-white">Elevate with Graphic Design</h3>
                    <p className="mt-4 text-lg text-slate-300">Our design services extend beyond websites to create a cohesive, professional brand identity across all your marketing channels.</p>
                    <p className="mt-2 text-sm text-slate-400">Deliverables: Brand Kits, Ad Sets, Landing Page Illustrations, Presentations.</p>
                    <div className="mt-6">
                        <Link to="/graphic-design" className="inline-flex items-center font-semibold text-brand-red hover:text-red-400 transition-colors">
                           Get Design Samples <ArrowRight className="inline ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </Animated>
                <Animated delay={0.1}>
                    <img src="https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="A designer's desk showing a cohesive set of brand assets on a screen." className="rounded-lg shadow-2xl" />
                </Animated>
            </div>
        </div>
    </section>
);


const SupportingServiceBands: React.FC = () => {
    return (
        <div>
            <BandSEO />
            <BandSocial />
            <BandDesign />
        </div>
    );
};

export default SupportingServiceBands;