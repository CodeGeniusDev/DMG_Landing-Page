import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const centralStates = {
    "ND": { path: "M240 190L280 190L280 230L240 230L240 190", pin: [260, 210] },
    "SD": { path: "M240 230L290 230L290 260L240 260L240 230", pin: [265, 245] },
    "NE": { path: "M220 260L290 260L290 290L220 290L220 260", pin: [255, 275] },
    "KS": { path: "M220 300L280 300L280 330L220 330L220 300", pin: [250, 315] },
    "MN": { path: "M280 190L340 190L340 250L280 250L280 190", pin: [310, 220] },
    "IA": { path: "M290 250L340 250L340 285L290 285L290 250", pin: [315, 267] },
    "MO": { path: "M300 285L350 285L350 335L300 335L300 285", pin: [325, 310] },
    "WI": { path: "M320 190L350 190L350 250L320 250L320 190", pin: [335, 220] },
    "IL": { path: "M340 250L360 250L360 310L340 310L340 250", pin: [350, 280] },
    "OK": { path: "M220 330L280 330L280 360L220 360L220 330", pin: [250, 345] },
    "AR": { path: "M340 335L350 335L350 355L335 355L335 345L340 335", pin: [342, 345] },
    "TX": { path: "M220 360L280 360L290 400L260 410L220 390L220 360", pin: [250, 380] },
    "LA": { path: "M330 360L340 360L355 370L345 380L330 375L330 360", pin: [340, 370] }
};

const Pin: React.FC<{ cx: number; cy: number; delay: number }> = ({ cx, cy, delay }) => {
  const shouldReduceMotion = useReducedMotion();

  const animation = shouldReduceMotion 
  ? { opacity: [0.8, 1, 0.8] } 
  : { scale: [0.9, 1.05, 0.9], opacity: [0.7, 1, 0.7] };

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r="4"
      fill="white"
      stroke="#FD0101"
      strokeWidth="2"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={animation}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

export const MapWithPins: React.FC = () => {
  return (
    <svg viewBox="180 180 220 250" className="w-full max-w-sm h-auto drop-shadow-2xl" aria-label="Map of the Central United States with animated location pins">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g stroke="#ffffff2a" strokeWidth="1">
        {Object.values(centralStates).map(({ path }, index) => (
          <path key={index} d={path} className="fill-white/10" />
        ))}
      </g>
      <g style={{ filter: 'url(#glow)' }}>
         {Object.values(centralStates).map(({ pin }, index) => (
            <Pin key={index} cx={pin[0]} cy={pin[1]} delay={index * 0.2} />
        ))}
      </g>
    </svg>
  );
};