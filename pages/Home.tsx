import React from "react";
import Hero from "../sections/Hero";
import ProofBar from "../sections/TrustBar";
import ServicePriorityGrid from "../sections/Services";
import WebsiteSpotlight from "../sections/USFocus";
import WebsiteOutcomes from "../sections/CaseStudies";
import ProcessWeb from "../sections/Process";
import SupportingServiceBands from "../components/Counter";
import Testimonials from "../sections/Testimonials";
import ReviewSlider from "../sections/ReviewSlider";
import Pricing from "../sections/Pricing";
import Faq from "../sections/Faq";
import CtaBand from "../sections/CtaBand";
import {
  OrganizationJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
} from "../components/Seo";
import { faqData } from "../sections/Faq";

const Home: React.FC = () => {
  React.useEffect(() => {
    document.title = "TQM Digital | High-Converting Website Design & Redesign";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "TQM Digital specializes in high-performance website design and redesigns that are fast, modern, and built to convert. We help U.S. businesses scale their revenue with digital precision."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "TQM Digital specializes in high-performance website design and redesigns that are fast, modern, and built to convert. We help U.S. businesses scale their revenue with digital precision.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <OrganizationJsonLd />
      <FaqJsonLd items={faqData} />
      <ServiceJsonLd
        name="Website Design & Redesign"
        description="High-performance website design and redesign services focused on speed, user experience, and conversion optimization."
      />
      <ServiceJsonLd
        name="SEO & PPC Services"
        description="Integrated search engine optimization and pay-per-click advertising to maximize visibility and return on investment."
      />

      <Hero />
      <WebsiteSpotlight />
      <ReviewSlider />
      <ProofBar />
      <ServicePriorityGrid />
      <WebsiteOutcomes />
      <ProcessWeb />
      <SupportingServiceBands />
      <Testimonials />
      <Pricing />
      <Faq />
      <CtaBand />
    </>
  );
};

export default Home;
