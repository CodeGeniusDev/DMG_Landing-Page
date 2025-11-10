import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Zap, Shield, Rocket } from "lucide-react";
import { Animated } from "../components/Animated";
import { useModal } from "../context/ModalContext";

const slides = [
  {
    before: { metric: "4.2s" },
    after: { metric: "1.8s" },
    improvement: "+57%",
    title: "Performance Overhaul",
    images: {
      before:
        "https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      after:
        "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    before: { metric: "1.2%" },
    after: { metric: "4.5%" },
    improvement: "+275%",
    title: "Conversion Funnel Redesign",
    images: {
      before:
        "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      after:
        "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
];

const BeforeAfterCarousel: React.FC = () => {
  const [[slideIndex, isAfter], setSlideState] = useState([0, false]);
  const slide = slides[slideIndex];
  const key = `${slideIndex}-${isAfter}`;

  const navigate = (direction: number) => {
    if (direction > 0) {
      // Right arrow
      if (!isAfter) {
        setSlideState([slideIndex, true]);
      } else {
        const nextSlideIndex = (slideIndex + 1) % slides.length;
        setSlideState([nextSlideIndex, false]);
      }
    } else {
      // Left arrow
      if (isAfter) {
        setSlideState([slideIndex, false]);
      } else {
        const prevSlideIndex = (slideIndex - 1 + slides.length) % slides.length;
        setSlideState([prevSlideIndex, true]);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => navigate(1), 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex, isAfter]);

  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden flex items-center justify-center bg-slate-900/50">
        <AnimatePresence mode="wait">
          <motion.img
            key={key}
            src={isAfter ? slide.images.after : slide.images.before}
            alt={
              isAfter
                ? "Screenshot of a modern, redesigned website on a laptop."
                : "Screenshot of an outdated website on a laptop."
            }
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className={`absolute top-4 left-4 px-4 py-1 text-sm font-bold rounded-full text-white shadow-lg ${
              isAfter ? "bg-accents-green" : "bg-slate-600"
            }`}
          >
            {isAfter ? "AFTER" : "BEFORE"}
          </div>
        </AnimatePresence>
      </div>
      <div className="mt-4 p-4 bg-black/20 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-center w-1/3">
            <p className="text-sm text-slate-400">Before</p>
            <p className="text-2xl font-bold font-heading text-white">
              {slide.before.metric}
            </p>
          </div>
          <motion.div
            className="text-center w-1/3"
            animate={{ opacity: isAfter ? 1 : 0, y: isAfter ? 0 : 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="text-sm text-accents-green font-semibold">
              Improvement
            </p>
            <p className="text-3xl font-bold font-heading text-accents-green">
              {slide.improvement}
            </p>
          </motion.div>
          <motion.div
            className="text-center w-1/3"
            animate={{ opacity: isAfter ? 1 : 0, y: isAfter ? 0 : 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="text-sm text-slate-400">After</p>
            <p className="text-2xl font-bold font-heading text-white">
              {slide.after.metric}
            </p>
          </motion.div>
        </div>
      </div>
      <p className="text-center mt-2 text-sm text-slate-300 font-semibold">
        {slide.title}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition z-10"
        aria-label="Previous slide"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => navigate(1)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition z-10"
        aria-label="Next slide"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

const WebsiteSpotlight: React.FC = () => {
  const { openModal } = useModal();
  return (
    <section
      id="website-design"
      className="py-24 md:py-28 overflow-hidden"
      style={{ background: "var(--grad-1)" }}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Animated>
            <div className="pr-4">
              <h2 className="text-base font-semibold text-brand-red uppercase tracking-wider">
                Website Design & Redesign
              </h2>
              <p className="mt-2 text-3xl font-bold font-heading text-white sm:text-4xl">
                Your Website is Your #1 Salesperson
              </p>
              <p className="mt-4 text-lg text-slate-300 max-w-prose">
                We don't just build websites; we build growth engines. Our
                websites are meticulously crafted to be fast, secure,
                accessible, and optimized to turn visitors into paying
                customers.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-accents-green" />
                  <span>Blazing-Fast & Core Web Vitals Optimized</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-accents-green" />
                  <span>Mobile-First, Responsive & ADA Friendly</span>
                </li>
                <li className="flex items-center gap-3">
                  <Rocket className="h-5 w-5 text-accents-green" />
                  <span>Engineered for High Conversion Rates</span>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={openModal}
                  className="px-6 py-3 rounded-lg font-semibold bg-brand-red text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-transform transform hover:scale-105"
                >
                  Start Your Redesign
                </button>
                <a
                  href="#website-outcomes"
                  className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-md text-white bg-white/10 hover:bg-white/20 transition"
                >
                  View Web Portfolio
                </a>
              </div>
            </div>
          </Animated>
          <Animated delay={0.1}>
            <BeforeAfterCarousel />
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default WebsiteSpotlight;
