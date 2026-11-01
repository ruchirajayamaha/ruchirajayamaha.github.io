import { useReducedMotion } from 'framer-motion';

const EASE = [0.25, 1, 0.5, 1];

// Shared transition language for views and card grids (<= 220ms, strictly under 250ms target)
export function useMotionVariants() {
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0.12 : 0.22;

  return {
    shouldReduceMotion,
    pageVariants: {
      initial: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
      animate: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      exit: { opacity: 0, y: shouldReduceMotion ? 0 : -8, transition: { duration, ease: EASE } },
    },
    cardContainerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : 0.06,
          delayChildren: shouldReduceMotion ? 0 : 0.04,
        },
      },
    },
    cardItemVariants: {
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
      visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
    },
    cardHover: shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.18 } },
  };
}
