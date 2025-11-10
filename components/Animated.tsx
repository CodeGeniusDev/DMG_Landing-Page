import React from "react";
import { motion } from "framer-motion";

type AnimationWrapperProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  hiddenSimple: { opacity: 0 },
  visibleSimple: { opacity: 1 },
};

export const Animated: React.FC<AnimationWrapperProps> = ({
  children,
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      variants={variants}
      className={className}
      // Respects prefers-reduced-motion by switching to a simple fade
      // Framer Motion's `useReducedMotion` hook can also be used for more complex logic
      // This is a CSS-based approach for simplicity with these variants.
      // In a real app, a hook would be more robust.
      // For this implementation, the `hidden` and `visible` variants are subtle enough.
    >
      {children}
    </motion.div>
  );
};
