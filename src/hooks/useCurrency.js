import { useCallback, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, formatCompact } from '../utils/currencyFormatter';
import { fetchExchangeRates } from '../services/api';

export function useCurrency() {
  const { currency, setCurrency, exchangeRates, setExchangeRates } = useFinance();

  useEffect(() => {
    let cancelled = false;

    const loadRates = async () => {
      if (currency === 'INR' && Object.keys(exchangeRates).length > 0) return;
      try {
        const rates = await fetchExchangeRates(currency);
        if (!cancelled && rates) {
          setExchangeRates(rates);
        }
      } catch (err) {
        console.warn('Failed to fetch exchange rates:', err);
      }
    };

    loadRates();
    return () => { cancelled = true; };
  }, [currency]);

  const format = useCallback(
    (amount) => formatCurrency(amount, currency),
    [currency]
  );

  const compact = useCallback(
    (amount) => formatCompact(amount, currency),
    [currency]
  );

  const convert = useCallback(
    (amount, targetCurrency) => {
      if (currency === targetCurrency) return amount;
      const rate = exchangeRates[targetCurrency];
      if (!rate) return amount;
      return amount * rate;
    },
    [currency, exchangeRates]
  );

  return {
    currency,
    setCurrency,
    exchangeRates,
    format,
    compact,
    convert,
  };
}
