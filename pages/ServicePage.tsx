import React, { useEffect } from 'react';
import { ServiceJsonLd } from '../components/Seo';
import { Animated } from '../components/Animated';
import { useModal } from '../context/ModalContext';
import { trackEvent } from '../lib/analytics';

interface ServicePageProps {
  service: 'Website Design' | 'SEO & PPC' | 'Social Media Marketing' | 'Graphic Designing' | 'Contact';
}

const serviceContent = {
    'Website Design': {
        title: "Website Design & Redesign Services",
        description: "We build fast, modern, and high-converting websites designed to be the engine of your business growth. Our process focuses on Core Web Vitals, mobile-first user experience, and clear conversion funnels to turn visitors into customers. Whether you need a brand new site or a powerful redesign, we deliver a final product that not only looks great but performs flawlessly.",
    },
    'SEO & PPC': {
        title: "Integrated SEO & PPC Services",
        description: "Maximize your search engine visibility and drive targeted traffic with our unified SEO and PPC strategies. We combine long-term organic growth through technical SEO and content marketing with immediate, high-intent traffic from performance-driven ad campaigns. This integrated approach ensures you capture demand across the entire customer journey for a superior return on investment.",
    },
    'Social Media Marketing': {
        title: "Social Media Marketing Services",
        description: "Build a thriving community and drive measurable results with strategic social media marketing. We develop and execute data-informed campaigns across platforms like Meta, LinkedIn, and Instagram, focusing on both organic engagement and paid social funnels. From acquisition and retention creatives to UGC campaigns, we help you connect with your audience and turn followers into loyal customers.",
    },
    'Graphic Designing': {
        title: "Graphic Designing for Digital Brands",
        description: "Elevate your brand with compelling, professional graphic design tailored for the digital landscape. Our design services cover everything from complete brand kits and identity systems to high-performance ad creatives, landing page graphics, and polished presentation designs. We create visual assets that capture attention, communicate your value, and drive action.",
    },
    Contact: {
        title: "Contact Us",
        description: "Ready to grow your business? We're here to help. Fill out our form to get a free, no-obligation audit of your current digital marketing efforts. We'll provide actionable insights and a clear path forward. Let's start the conversation about how TQM Digital can become your trusted growth partner.",
    }
}

const ServicePage: React.FC<ServicePageProps> = ({ service }) => {
    const content = serviceContent[service];
    const { openModal } = useModal();

    useEffect(() => {
        document.title = `${content.title} | TQM Digital`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', content.description.substring(0, 160));
        }
    }, [content]);

    const handleCTAClick = () => {
      trackEvent('click', {
        event_category: 'CTA',
        event_label: `Get Free Audit Service Page (${service})`,
      });
      openModal();
    }

  return (
    <>
    <ServiceJsonLd name={content.title} description={content.description} />
    <div className="py-24 sm:py-32">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Animated>
          <h1 className="text-4xl font-bold font-heading text-white sm:text-5xl">{content.title}</h1>
        </Animated>
        <Animated delay={0.1}>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-slate-300">{content.description}</p>
        </Animated>
        <Animated delay={0.2}>
          <div className="mt-10">
            <button
              onClick={handleCTAClick}
              className="inline-block px-8 py-3 rounded-lg font-semibold bg-brand-red text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-transform transform hover:scale-105"
            >
              Get Your Free Audit
            </button>
          </div>
        </Animated>
      </div>
    </div>
    </>
  );
};

export default ServicePage;