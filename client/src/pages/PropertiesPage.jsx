import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api/index.js';
import PropertyCard from '../components/PropertyCard.jsx';

const fade = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const TYPES    = ['', 'Apartment', 'Villa', 'Penthouse', 'Plot', 'Commercial'];
const STATUSES = ['', 'Available', 'Under Construction', 'Sold'];
const PER_PAGE = 9;

function ShimmerCard() {
  return (
    <div className="bg-white border border-border rounded-sm overflow-hidden animate-pulse">
      <div className="bg-cream-3" style={{ aspectRatio: '16/10' }} />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-cream-3 rounded w-3/4" />
        <div className="h-3 bg-cream-3 rounded w-1/2" />
        <div className="h-px bg-border mt-4" />
        <div className="flex justify-between pt-2">
          <div className="h-5 bg-cream-3 rounded w-1/3" />
          <div className="h-4 bg-cream-3 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search,   setSearch]   = useState(searchParams.get('search')   || '');
  const [type,     setType]     = useState(searchParams.get('type')     || '');
  const [status,   setStatus]   = useState(searchParams.get('status')   || '');
  const [page,     setPage]     = useState(Number(searchParams.get('page')) || 1);

  const [properties, setProperties] = useState([]);
  const [total,      setTotal]      = useState(0);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  const fetchProperties = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getProperties(params);
      setProperties(res.data || []);
      setTotal(res.total ?? (res.data || []).length);
    } catch (e) {
      setError('Failed to load properties. Please try again.');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = { page, limit: PER_PAGE };
    if (search) params.search = search;
    if (type)   params.type   = type;
    if (status) params.status = status;

    const sp = {};
    if (search) sp.search = search;
    if (type)   sp.type   = type;
    if (status) sp.status = status;
    if (page > 1) sp.page = String(page);
    setSearchParams(sp, { replace: true });

    fetchProperties(params);
  }, [search, type, status, page, fetchProperties, setSearchParams]);

  function handleClear() {
    setSearch('');
    setType('');
    setStatus('');
    setPage(1);
  }

  const hasFilters = search || type || status;

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border pt-24 pb-10">
        <div className="wrap">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body text-xs text-muted mb-5">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="text-border">›</span>
            <span className="text-ink-3">Properties</span>
          </nav>
          <motion.span variants={fade} initial="hidden" animate="visible" className="eyebrow">
            Our Portfolio
          </motion.span>
          <motion.h1
            variants={fade}
            initial="hidden"
            animate="visible"
            className="h1 mt-1"
          >
            Premium Properties in Ahmedabad
          </motion.h1>
        </div>
      </div>

      {/* ── Filter Bar ──────────────────────────────────────────────── */}
      <div className="bg-cream-2 border-b border-border py-4 sticky top-[64px] z-30">
        <div className="wrap">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or location…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="field pl-9 py-2.5 text-sm"
              />
            </div>

            {/* Type */}
            <select
              value={type}
              onChange={e => { setType(e.target.value); setPage(1); }}
              className="field py-2.5 text-sm w-auto min-w-[140px]"
            >
              <option value="">All Types</option>
              {TYPES.filter(Boolean).map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Status */}
            <select
              value={status}
              onChange={e => { setStatus(e.target.value); setPage(1); }}
              className="field py-2.5 text-sm w-auto min-w-[160px]"
            >
              <option value="">All Statuses</option>
              {STATUSES.filter(Boolean).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={handleClear}
                className="btn-ghost py-2.5 text-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            )}

            {/* Count */}
            {!loading && (
              <span className="ml-auto font-body text-xs text-muted hidden sm:block">
                {total} {total === 1 ? 'property' : 'properties'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Grid ────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          {error && (
            <div className="text-center py-16">
              <p className="font-body text-ink-3 mb-4">{error}</p>
              <button onClick={() => fetchProperties({ page, search, type, status })} className="btn-outline-accent text-sm">
                Try Again
              </button>
            </div>
          )}

          {!error && loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <ShimmerCard key={i} />)}
            </div>
          )}

          {!error && !loading && properties.length === 0 && (
            <div className="text-center py-24">
              <div className="text-accent text-5xl mb-5 font-heading">∅</div>
              <h3 className="h3 mb-3">No Properties Found</h3>
              <p className="body-text mb-6 max-w-sm mx-auto">
                No properties match your current filters. Try adjusting your search criteria.
              </p>
              <button onClick={handleClear} className="btn-outline-accent text-sm">
                Clear Filters
              </button>
            </div>
          )}

          {!error && !loading && properties.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p, i) => (
                <PropertyCard key={p.id || p._id} property={p} index={i} />
              ))}
            </div>
          )}

          {/* ── Pagination ──────────────────────────────────────────── */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-ghost py-2 px-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`font-body text-sm font-semibold w-9 h-9 rounded-sm transition-all duration-200 ${
                    n === page
                      ? 'bg-accent text-white'
                      : 'border border-border text-ink-3 hover:border-accent hover:text-accent'
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn-ghost py-2 px-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
