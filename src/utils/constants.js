export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

export const EXPENSE_CATEGORIES = [
  'Food',
  'Travel',
  'Rent',
  'Shopping',
  'Entertainment',
  'Health',
  'Utilities',
  'Subscriptions',
];

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Gift',
  'Refund',
  'Other',
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Date (Newest)' },
  { value: 'date-asc', label: 'Date (Oldest)' },
  { value: 'amount-desc', label: 'Amount (High → Low)' },
  { value: 'amount-asc', label: 'Amount (Low → High)' },
  { value: 'category-asc', label: 'Category (A → Z)' },
  { value: 'category-desc', label: 'Category (Z → A)' },
];

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export const DEFAULT_CURRENCY = 'INR';

export const CATEGORY_COLORS = {
  Food: '#f97316',
  Travel: '#3b82f6',
  Rent: '#8b5cf6',
  Shopping: '#ec4899',
  Entertainment: '#f59e0b',
  Health: '#10b981',
  Utilities: '#6366f1',
  Subscriptions: '#ef4444',
  Salary: '#22c55e',
  Freelance: '#14b8a6',
  Investment: '#0ea5e9',
  Gift: '#d946ef',
  Refund: '#64748b',
  Other: '#78716c',
};

export const LOCAL_STORAGE_KEYS = {
  TRANSACTIONS: 'financeflow_transactions',
  BUDGET: 'financeflow_budget',
  CURRENCY: 'financeflow_currency',
};
