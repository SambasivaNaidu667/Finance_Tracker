import { CURRENCIES } from '../../utils/constants';
import { useFinance } from '../../context/FinanceContext';
import { FiGlobe } from 'react-icons/fi';
import './CurrencySelector.css';

export default function CurrencySelector() {
  const { currency, setCurrency } = useFinance();

  return (
    <div className="currency-selector">
      <FiGlobe size={14} className="currency-selector__icon" />
      <select
        className="currency-selector__select"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        aria-label="Select currency"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.symbol} {c.code}
          </option>
        ))}
      </select>
    </div>
  );
}
