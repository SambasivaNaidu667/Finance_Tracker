import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { format, startOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { useFinance } from '../../context/FinanceContext';
import { useCurrency } from '../../hooks/useCurrency';
import EmptyState from '../Shared/EmptyState';
import { FiBarChart2 } from 'react-icons/fi';
import './Charts.css';

export default function IncomeExpenseChart() {
  const { transactions } = useFinance();
  const { format: formatAmount } = useCurrency();

  const chartData = useMemo(() => {
    if (transactions.length === 0) return [];

    const months = eachMonthOfInterval({
      start: subMonths(startOfMonth(new Date()), 5),
      end: startOfMonth(new Date()),
    });

    return months.map((month) => {
      const monthStr = format(month, 'yyyy-MM');
      const monthTxns = transactions.filter((t) =>
        t.date.startsWith(monthStr)
      );

      const income = monthTxns
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const expenses = monthTxns
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return {
        month: format(month, 'MMM'),
        fullMonth: format(month, 'MMM yyyy'),
        income,
        expenses,
      };
    });
  }, [transactions]);

  if (chartData.length === 0 || chartData.every((d) => d.income === 0 && d.expenses === 0)) {
    return (
      <div className="chart-card">
        <h3 className="chart-card__title">Income vs Expenses</h3>
        <EmptyState
          icon={FiBarChart2}
          title="No comparison data"
          message="Add income and expense transactions to see the comparison"
        />
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip__label">{payload[0].payload.fullMonth}</p>
          {payload.map((p, i) => (
            <p key={i} className="chart-tooltip__value" style={{ color: p.color }}>
              {p.name}: {formatAmount(p.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="chart-card__title">Income vs Expenses</h3>
      <div className="chart-card__body">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
              formatter={(value) => <span style={{ color: '#94a3b8' }}>{value}</span>}
            />
            <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
