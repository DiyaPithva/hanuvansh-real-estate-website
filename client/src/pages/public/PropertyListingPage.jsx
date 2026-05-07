import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { fetchProperties, setFilters } from '../../store/propertiesSlice.js';
import PropertyCard from '../../components/property/PropertyCard.jsx';
import SearchFilter from '../../components/property/SearchFilter.jsx';
import SkeletonLoader from '../../components/common/SkeletonLoader.jsx';
import { containerVariants, sectionVariants } from '../../styles/animations.js';

// Feature: hanuvansh-mern-estate
// PropertyListingPage: public page for browsing and filtering all properties.
// Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7

export default function PropertyListingPage() {
  const dispatch = useDispatch();

  const {
    items,
    pagination,
    filters,
    loading,
    error,
  } = useSelector((state) => state.properties);

  const { page, totalPages, total } = pagination;

  // Fetch on mount with current filters
  useEffect(() => {
    dispatch(fetchProperties({ filters, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Pagination handler — dispatches fetchProperties with updated page
  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage < 1 || newPage > totalPages) return;
      dispatch(fetchProperties({ filters, page: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [dispatch, filters, totalPages]
  );

  // Build page number array for pagination controls
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <main className="bg-bg-primary text-text-primary font-body min-h-screen">
      {/* ================================================================
          PAGE HEADER
      ================================================================ */}
      <section
        className="relative py-20 px-6 overflow-hidden"
        aria-label="Properties header"
        style={{
          background:
            'linear-gradient(180deg, #111111 0%, #0a0a0a 100%)',
        }}
      >
        {/* Decorative radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,107,0,0.06) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gold opacity-50" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">
              Our Portfolio
            </span>
            <div className="h-px w-12 bg-gold opacity-50" />
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            All Properties
          </h1>

          <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
            Explore our curated collection of premium residential and commercial properties.
          </p>
        </motion.div>
      </section>

      {/* ================================================================
          FILTER + GRID SECTION
      ================================================================ */}
      <section className="py-10 px-6" aria-label="Property listings">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">

          {/* Search / Filter panel */}
          <SearchFilter />

          {/* Result count */}
          {!loading && !error && (
            <p className="text-text-muted text-sm">
              {total > 0
                ? `Showing ${items.length} of ${total} propert${total === 1 ? 'y' : 'ies'}`
                : null}
            </p>
          )}

          {/* ---- Loading state ---- */}
          {loading && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-busy="true"
              aria-label="Loading properties"
            >
              <SkeletonLoader count={9} className="h-72" />
            </div>
          )}

          {/* ---- Error state ---- */}
          {!loading && error && (
            <div className="text-center py-20">
              <p className="text-text-muted text-base mb-2">
                Unable to load properties at this time.
              </p>
              <p className="text-text-muted text-sm opacity-60">{error}</p>
              <button
                onClick={() => dispatch(fetchProperties({ filters, page }))}
                className="mt-6 inline-block border border-accent/60 hover:border-accent text-accent hover:text-accent-light font-semibold px-6 py-2 rounded-lg transition-colors duration-200 text-sm tracking-wide uppercase"
              >
                Retry
              </button>
            </div>
          )}

          {/* ---- Empty state ---- */}
          {!loading && !error && items.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted text-base">
                No properties found matching your criteria
              </p>
              <p className="text-text-muted text-sm opacity-60 mt-2">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}

          {/* ---- Property grid ---- */}
          {!loading && !error && items.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-label="Property grid"
            >
              {items.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </motion.div>
          )}

          {/* ================================================================
              PAGINATION CONTROLS
          ================================================================ */}
          {!loading && !error && totalPages > 1 && (
            <nav
              className="flex items-center justify-center gap-2 pt-4"
              aria-label="Pagination"
            >
              {/* Previous */}
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 rounded-lg border border-white/10 text-text-muted text-sm font-medium
                           hover:border-accent hover:text-accent transition-colors duration-200
                           disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-text-muted"
                aria-label="Previous page"
              >
                ← Prev
              </button>

              {/* Page numbers */}
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  aria-current={num === page ? 'page' : undefined}
                  className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors duration-200
                    ${
                      num === page
                        ? 'bg-accent border-accent text-white'
                        : 'border-white/10 text-text-muted hover:border-accent hover:text-accent'
                    }`}
                >
                  {num}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded-lg border border-white/10 text-text-muted text-sm font-medium
                           hover:border-accent hover:text-accent transition-colors duration-200
                           disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-text-muted"
                aria-label="Next page"
              >
                Next →
              </button>
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
