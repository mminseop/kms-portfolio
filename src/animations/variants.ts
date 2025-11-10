import type { Variants } from "framer-motion";

// fadeInUp 애니메이션
export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: custom * 0.1,
    },
  }),
};

// 더 짧은 fadeInUp (0.3s)
export const fadeInUpShortVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delay: custom * 0.1,
    },
  }),
};

// bounce-slow 애니메이션
export const buttonBounceVariants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
} satisfies Variants;

// 타이핑 커서 깜빡임
export const cursorBlinkVariants: Variants = {
  animate: {
    opacity: [1, 1, 0, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      times: [0, 0.49, 0.5, 1],
    },
  },
};

// 컨테이너 애니메이션 (여러 자식 순차 애니메이션)
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
