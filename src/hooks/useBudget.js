import { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export function useBudget() {
  const { transactions, budget, setBudget } = useFinance();

  const currentMonth = format(new Date(), 'yyyy-MM');

  const monthlyStats = useMemo(() => {
    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());

    const monthTransactions = transactions.filter((t) => {
      const tDate = parseISO(t.date);
      return isWithinInterval(tDate, { start: monthStart, end: monthEnd });
    });

    const totalIncome = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const netBalance = totalIncome - totalExpenses;
    const budgetAmount = budget.monthlyBudget || 0;
    const budgetRemaining = budgetAmount - totalExpenses;
    const budgetPercentage = budgetAmount > 0 ? Math.min((totalExpenses / budgetAmount) * 100, 100) : 0;
    const isOverBudget = budgetAmount > 0 && totalExpenses > budgetAmount;
    const overBudgetAmount = isOverBudget ? totalExpenses - budgetAmount : 0;

    const categoryBreakdown = {};
    monthTransactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        if (!categoryBreakdown[t.category]) {
          categoryBreakdown[t.category] = 0;
        }
        categoryBreakdown[t.category] += Number(t.amount);
      });

    const categoryData = Object.entries(categoryBreakdown)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    const topCategory = categoryData.length > 0 ? categoryData[0] : null;

    return {
      totalIncome,
      totalExpenses,
      netBalance,
      budgetAmount,
      budgetRemaining,
      budgetPercentage,
      isOverBudget,
      overBudgetAmount,
      categoryBreakdown,
      categoryData,
      topCategory,
      monthTransactions,
      transactionCount: monthTransactions.length,
    };
  }, [transactions, budget, currentMonth]);

  return {
    ...monthlyStats,
    budget,
    setBudget,
    currentMonth,
  };
}
