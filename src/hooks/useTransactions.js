import { useMemo, useState, useCallback } from 'react';
import { useFinance } from '../context/FinanceContext';
import { parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export function useTransactions() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useFinance();

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    dateFrom: '',
    dateTo: '',
    recurring: false,
  });
  const [sortBy, setSortBy] = useState('date-desc');

  const resetFilters = useCallback(() => {
    setFilters({ category: '', type: '', dateFrom: '', dateTo: '', recurring: false });
    setSearchQuery('');
    setSortBy('date-desc');
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          (t.notes && t.notes.toLowerCase().includes(query))
      );
    }

    if (filters.category) {
      result = result.filter((t) => t.category === filters.category);
    }

    if (filters.type) {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.recurring) {
      result = result.filter((t) => t.recurring);
    }

    if (filters.dateFrom || filters.dateTo) {
      result = result.filter((t) => {
        const tDate = parseISO(t.date);
        if (filters.dateFrom && filters.dateTo) {
          return isWithinInterval(tDate, {
            start: startOfDay(parseISO(filters.dateFrom)),
            end: endOfDay(parseISO(filters.dateTo)),
          });
        }
        if (filters.dateFrom) {
          return tDate >= startOfDay(parseISO(filters.dateFrom));
        }
        if (filters.dateTo) {
          return tDate <= endOfDay(parseISO(filters.dateTo));
        }
        return true;
      });
    }

    const [sortField, sortDir] = sortBy.split('-');
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      return sortDir === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [transactions, searchQuery, filters, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.type) count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    if (filters.recurring) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [filters, searchQuery]);

  return {
    transactions,
    filteredTransactions,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    resetFilters,
    activeFilterCount,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
