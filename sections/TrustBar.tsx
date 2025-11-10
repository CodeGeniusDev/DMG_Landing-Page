import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { Animated } from "../components/Animated";

const metrics = [
  { value: 38, suffix: "%", label: "Avg. ROAS Increase" },
  { value: 120, prefix: "+", label: "U.S. Clients Served" },
  { value: 2.0, suffix: "s", label: "Avg. LCP Improvement" },
];

const clientLogos = [
  {
    src: "/images/Logo/google.png",
    alt: "Custom Installations and Remodeling logo",
  },
  { src: "/images/Logo/google.png", alt: "Bears Cleaning Service logo" },
  { src: "/images/Logo/google.png", alt: "Sir Savills Ideal Rubs logo" },
  { src: "/images/Logo/google.png", alt: "Adom Wellness logo" },
  { src: "/images/Logo/google.png", alt: "Speedy Bail Bonds logo" },
  { src: "/images/Logo/google.png", alt: "NKY Pro Lawn Care logo" },
];

const MetricCounter: React.FC<{ metric: (typeof metrics)[0] }> = ({
  metric,
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const num = metric.value % 1 !== 0 ? latest.toFixed(1) : Math.round(latest);
    return `${metric.prefix || ""}${num}${metric.suffix || ""}`;
  });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, metric.value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [inView, count, metric.value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const ProofBar: React.FC = () => {
  return (
    <div className="py-24 md:py-28" style={{ background: "var(--grad-1)" }}>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {metrics.map((metric, index) => (
            <Animated key={index} delay={index * 0.1}>
              <div className="text-4xl md:text-5xl font-bold font-heading text-white">
                <MetricCounter metric={metric} />
              </div>
              <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
            </Animated>
          ))}
        </div>

        {/* Logos Section */}
        <div className="mt-16 flow-root">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 justify-items-center items-center">
            {clientLogos.map((logo, index) => (
              <Animated key={index} delay={index * 0.08 + 0.3}>
                <div className="flex justify-center items-center p-4">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full max-w-[128px] h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProofBar;
