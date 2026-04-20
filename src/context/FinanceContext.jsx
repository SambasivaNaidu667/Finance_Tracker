import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { LOCAL_STORAGE_KEYS, DEFAULT_CURRENCY } from '../utils/constants';
import { DEMO_TRANSACTIONS, DEMO_BUDGET } from '../utils/demoData';

const FinanceContext = createContext(null);

const ACTIONS = {
  SET_TRANSACTIONS: 'SET_TRANSACTIONS',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  SET_BUDGET: 'SET_BUDGET',
  SET_CURRENCY: 'SET_CURRENCY',
  SET_EXCHANGE_RATES: 'SET_EXCHANGE_RATES',
  LOAD_DEMO_DATA: 'LOAD_DEMO_DATA',
  CLEAR_ALL_DATA: 'CLEAR_ALL_DATA',
};

function financeReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TRANSACTIONS:
      return { ...state, transactions: action.payload };

    case ACTIONS.ADD_TRANSACTION: {
      const newTransaction = { ...action.payload, id: uuidv4() };
      return { ...state, transactions: [newTransaction, ...state.transactions] };
    }

    case ACTIONS.UPDATE_TRANSACTION: {
      const updated = state.transactions.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t
      );
      return { ...state, transactions: updated };
    }

    case ACTIONS.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case ACTIONS.SET_BUDGET:
      return { ...state, budget: action.payload };

    case ACTIONS.SET_CURRENCY:
      return { ...state, currency: action.payload };

    case ACTIONS.SET_EXCHANGE_RATES:
      return { ...state, exchangeRates: action.payload };

    case ACTIONS.LOAD_DEMO_DATA:
      return {
        ...state,
        transactions: DEMO_TRANSACTIONS,
        budget: DEMO_BUDGET,
      };

    case ACTIONS.CLEAR_ALL_DATA:
      return {
        ...state,
        transactions: [],
        budget: { monthlyBudget: 0 },
      };

    default:
      return state;
  }
}

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn(`Failed to load ${key} from localStorage:`, e);
  }
  return fallback;
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage:`, e);
  }
}

const initialState = {
  transactions: loadFromStorage(LOCAL_STORAGE_KEYS.TRANSACTIONS, []),
  budget: loadFromStorage(LOCAL_STORAGE_KEYS.BUDGET, { monthlyBudget: 0 }),
  currency: loadFromStorage(LOCAL_STORAGE_KEYS.CURRENCY, DEFAULT_CURRENCY),
  exchangeRates: {},
};

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  useEffect(() => {
    saveToStorage(LOCAL_STORAGE_KEYS.TRANSACTIONS, state.transactions);
  }, [state.transactions]);

  useEffect(() => {
    saveToStorage(LOCAL_STORAGE_KEYS.BUDGET, state.budget);
  }, [state.budget]);

  useEffect(() => {
    saveToStorage(LOCAL_STORAGE_KEYS.CURRENCY, state.currency);
  }, [state.currency]);

  const addTransaction = useCallback((transaction) => {
    dispatch({ type: ACTIONS.ADD_TRANSACTION, payload: transaction });
  }, []);

  const updateTransaction = useCallback((transaction) => {
    dispatch({ type: ACTIONS.UPDATE_TRANSACTION, payload: transaction });
  }, []);

  const deleteTransaction = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id });
  }, []);

  const setBudget = useCallback((budget) => {
    dispatch({ type: ACTIONS.SET_BUDGET, payload: budget });
  }, []);

  const setCurrency = useCallback((currency) => {
    dispatch({ type: ACTIONS.SET_CURRENCY, payload: currency });
  }, []);

  const setExchangeRates = useCallback((rates) => {
    dispatch({ type: ACTIONS.SET_EXCHANGE_RATES, payload: rates });
  }, []);

  const loadDemoData = useCallback(() => {
    dispatch({ type: ACTIONS.LOAD_DEMO_DATA });
  }, []);

  const clearAllData = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ALL_DATA });
  }, []);

  const value = {
    ...state,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setBudget,
    setCurrency,
    setExchangeRates,
    loadDemoData,
    clearAllData,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}

export default FinanceContext;
