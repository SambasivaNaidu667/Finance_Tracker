import { SORT_OPTIONS } from '../../utils/constants';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import './SortControl.css';

export default function SortControl({ sortBy, setSortBy }) {
  return (
    <div className="sort-control">
      <select
        className="form-select sort-control__select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        aria-label="Sort transactions"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
