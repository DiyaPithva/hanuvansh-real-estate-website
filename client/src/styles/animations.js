// Cinematic Framer Motion variants

export const revealUp = {
  hidden:  { opacity: 0, y: 70 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const revealUpFast = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const revealLeft = {
  hidden:  { opacity: 0, x: -90 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const revealRight = {
  hidden:  { opacity: 0, x: 90 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const stagger = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

export const staggerFast = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09 },
  },
};

export const lineGrow = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const pageEnter = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
};

// ── Legacy aliases (used by older components) ──────────────────────────────
export const heroVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const containerVariants = stagger;
export const sectionVariants   = revealUpFast;
export const cardHoverVariants = {
  rest:  { y: 0,  boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  hover: { y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.10)', transition: { duration: 0.3 } },
};
