import { CURRENCIES } from './constants';

export const formatCurrency = (amount, currencyCode = 'INR') => {
  const currency = CURRENCIES.find((c) => c.code === currencyCode);
  if (!currency) {
    return `₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  try {
    return new Intl.NumberFormat(getLocale(currencyCode), {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currencyCode === 'JPY' ? 0 : 2,
      maximumFractionDigits: currencyCode === 'JPY' ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency.symbol}${Number(amount).toLocaleString()}`;
  }
};

export const formatCompact = (amount, currencyCode = 'INR') => {
  const absAmount = Math.abs(amount);
  const currency = CURRENCIES.find((c) => c.code === currencyCode);
  const symbol = currency ? currency.symbol : '₹';

  if (absAmount >= 10000000) {
    return `${symbol}${(amount / 10000000).toFixed(1)}Cr`;
  }
  if (absAmount >= 100000) {
    return `${symbol}${(amount / 100000).toFixed(1)}L`;
  }
  if (absAmount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(1)}K`;
  }
  return `${symbol}${amount.toFixed(0)}`;
};

function getLocale(currencyCode) {
  const localeMap = {
    INR: 'en-IN',
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    JPY: 'ja-JP',
  };
  return localeMap[currencyCode] || 'en-US';
}
