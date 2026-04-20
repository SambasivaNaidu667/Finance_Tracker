import { FiFilter, FiX, FiRepeat } from 'react-icons/fi';
import { ALL_CATEGORIES, TRANSACTION_TYPES } from '../../utils/constants';
import './Filters.css';

export default function Filters({ filters, setFilters, activeFilterCount, onReset }) {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="filters">
      <div className="filters__header">
        <span className="filters__label">
          <FiFilter size={14} />
          Filters
          {activeFilterCount > 0 && (
            <span className="filters__count">{activeFilterCount}</span>
          )}
        </span>
        {activeFilterCount > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={onReset}>
            <FiX size={14} />
            Clear All
          </button>
        )}
      </div>

      <div className="filters__row">
        <select
          className="form-select filters__select"
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {ALL_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="form-select filters__select"
          value={filters.type}
          onChange={(e) => updateFilter('type', e.target.value)}
          aria-label="Filter by type"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          className="form-input filters__date-input"
          type="date"
          value={filters.dateFrom}
          onChange={(e) => updateFilter('dateFrom', e.target.value)}
          placeholder="From"
          aria-label="Filter from date"
        />

        <input
          className="form-input filters__date-input"
          type="date"
          value={filters.dateTo}
          onChange={(e) => updateFilter('dateTo', e.target.value)}
          placeholder="To"
          aria-label="Filter to date"
        />

        <label className={`filters__toggle ${filters.recurring ? 'filters__toggle--active' : ''}`}>
          <input
            type="checkbox"
            checked={filters.recurring}
            onChange={(e) => updateFilter('recurring', e.target.checked)}
          />
          <FiRepeat size={13} />
          Recurring
        </label>
      </div>
    </div>
  );
}
