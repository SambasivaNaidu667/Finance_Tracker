import { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchBar.css';

export default function SearchBar({ value, onChange }) {
  const [input, setInput] = useState(value || '');
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    onChange(debouncedInput);
  }, [debouncedInput]);

  useEffect(() => {
    setInput(value || '');
  }, [value]);

  return (
    <div className="search-bar">
      <FiSearch className="search-bar__icon" size={16} />
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search transactions..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Search transactions"
      />
      {input && (
        <button
          className="search-bar__clear"
          onClick={() => { setInput(''); onChange(''); }}
          aria-label="Clear search"
        >
          <FiX size={14} />
        </button>
      )}
    </div>
  );
}
