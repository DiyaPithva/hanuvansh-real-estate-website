import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fade = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function NotFoundPage() {
  return (
    <div className="bg-cream min-h-screen flex items-center justify-center px-5">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="text-center max-w-md"
      >
        {/* 404 */}
        <motion.div
          variants={fade}
          className="font-heading font-bold text-accent text-8xl leading-none mb-4 select-none"
        >
          404
        </motion.div>

        {/* Thin rule */}
        <motion.span
          variants={fade}
          className="block w-10 h-px bg-accent mx-auto mb-6"
        />

        {/* Heading */}
        <motion.h2 variants={fade} className="h2 mb-4">
          Page Not Found
        </motion.h2>

        {/* Message */}
        <motion.p variants={fade} className="body-text mb-10">
          The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={fade} className="flex flex-wrap gap-3 justify-center">
          <Link to="/" className="btn-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          <Link to="/properties" className="btn-ghost">
            View Properties
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
