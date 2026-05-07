import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchProperties } from '../../store/propertiesSlice.js';
import { buildQueryParams } from '../../utils/buildQueryParams.js';

// Feature: hanuvansh-mern-estate
// SearchFilter: controlled filter panel for property listings.
// Requirements: 12.2, 12.3

const PROPERTY_TYPES = ['', 'Apartment', 'Villa', 'Plot', 'Commercial', 'Penthouse'];
const PROPERTY_STATUSES = ['', 'Available', 'Sold', 'Under Construction'];

const LABEL_CLASS = 'block text-text-muted text-xs font-medium mb-1';
const INPUT_CLASS =
  'w-full bg-bg-secondary border border-white/10 rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors';

export default function SearchFilter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.properties.filters);

  const handleChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    dispatch(setFilters({ [field]: value }));
    // Build query params and dispatch fetch
    buildQueryParams(updatedFilters); // used for URL building if needed
    dispatch(fetchProperties({ filters: updatedFilters, page: 1 }));
  };

  return (
    <div className="bg-bg-card border border-white/10 rounded-xl p-4">
      <h3 className="text-text-primary font-heading font-semibold text-base mb-4">
        Filter Properties
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Type */}
        <div>
          <label htmlFor="filter-type" className={LABEL_CLASS}>
            Type
          </label>
          <select
            id="filter-type"
            value={filters.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className={INPUT_CLASS}
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t || 'All Types'}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label htmlFor="filter-min-price" className={LABEL_CLASS}>
            Min Price (₹)
          </label>
          <input
            id="filter-min-price"
            type="number"
            min="0"
            placeholder="e.g. 500000"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            className={INPUT_CLASS}
          />
        </div>

        {/* Max Price */}
        <div>
          <label htmlFor="filter-max-price" className={LABEL_CLASS}>
            Max Price (₹)
          </label>
          <input
            id="filter-max-price"
            type="number"
            min="0"
            placeholder="e.g. 10000000"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className={INPUT_CLASS}
          />
        </div>

        {/* Configuration */}
        <div>
          <label htmlFor="filter-configuration" className={LABEL_CLASS}>
            Configuration
          </label>
          <input
            id="filter-configuration"
            type="text"
            placeholder="e.g. 2BHK"
            value={filters.configuration}
            onChange={(e) => handleChange('configuration', e.target.value)}
            className={INPUT_CLASS}
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="filter-status" className={LABEL_CLASS}>
            Status
          </label>
          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className={INPUT_CLASS}
          >
            {PROPERTY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s || 'All Statuses'}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
