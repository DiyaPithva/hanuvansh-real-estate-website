import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Feature: hanuvansh-mern-estate
// PropertyGallery: responsive image grid with lightbox/fullscreen view.
// Requirements: 13.2

/**
 * @param {{ images: string[] }} props
 */
export default function PropertyGallery({ images = [] }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images.length) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-bg-secondary rounded-xl text-text-muted text-sm">
        No images available
      </div>
    );
  }

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      {/* Responsive image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((src, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-bg-secondary"
            onClick={() => openLightbox(index)}
          >
            <img
              src={src}
              alt={`Property image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <span className="text-white text-2xl opacity-0 hover:opacity-100 transition-opacity duration-200">
                🔍
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-3xl leading-none hover:text-accent transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </button>

            {/* Counter */}
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-text-muted text-sm">
              {lightboxIndex + 1} / {images.length}
            </span>

            {/* Prev arrow */}
            {images.length > 1 && (
              <button
                className="absolute left-4 text-white text-4xl hover:text-accent transition-colors z-10 p-2"
                onClick={goPrev}
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={images[lightboxIndex]}
              alt={`Property image ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next arrow */}
            {images.length > 1 && (
              <button
                className="absolute right-4 text-white text-4xl hover:text-accent transition-colors z-10 p-2"
                onClick={goNext}
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
