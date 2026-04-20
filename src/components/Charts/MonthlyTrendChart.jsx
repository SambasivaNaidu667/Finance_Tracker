import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';
import { format, parseISO, startOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { useFinance } from '../../context/FinanceContext';
import { useCurrency } from '../../hooks/useCurrency';
import EmptyState from '../Shared/EmptyState';
import { FiTrendingUp } from 'react-icons/fi';
import './Charts.css';

export default function MonthlyTrendChart() {
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

      const expenses = monthTxns
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return {
        month: format(month, 'MMM'),
        fullMonth: format(month, 'MMM yyyy'),
        expenses,
      };
    });
  }, [transactions]);

  if (chartData.length === 0 || chartData.every((d) => d.expenses === 0)) {
    return (
      <div className="chart-card">
        <h3 className="chart-card__title">Monthly Spending Trend</h3>
        <EmptyState
          icon={FiTrendingUp}
          title="No trend data"
          message="Add transactions across months to see spending trends"
        />
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip__label">{payload[0].payload.fullMonth}</p>
          <p className="chart-tooltip__value">{formatAmount(payload[0].value)}</p>
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
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="chart-card__title">Monthly Spending Trend</h3>
      <div className="chart-card__body">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#f43f5e"
              strokeWidth={2.5}
              fill="url(#expenseGradient)"
              dot={{ fill: '#f43f5e', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
