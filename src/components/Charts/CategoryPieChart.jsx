import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { CATEGORY_COLORS } from '../../utils/constants';
import { useCurrency } from '../../hooks/useCurrency';
import EmptyState from '../Shared/EmptyState';
import { FiPieChart } from 'react-icons/fi';
import './Charts.css';

export default function CategoryPieChart({ data }) {
  const { format: formatAmount } = useCurrency();

  if (!data || data.length === 0) {
    return (
      <div className="chart-card">
        <h3 className="chart-card__title">Spending by Category</h3>
        <EmptyState
          icon={FiPieChart}
          title="No expense data"
          message="Add expenses to see category breakdown"
        />
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.amount,
    color: CATEGORY_COLORS[item.category] || '#78716c',
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <div className="chart-tooltip__color" style={{ background: d.color }} />
          <div>
            <p className="chart-tooltip__label">{d.name}</p>
            <p className="chart-tooltip__value">{formatAmount(d.value)}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="chart-legend">
        {payload.map((entry, i) => (
          <li key={i} className="chart-legend__item">
            <span className="chart-legend__dot" style={{ background: entry.color }} />
            <span className="chart-legend__label">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="chart-card__title">Spending by Category</h3>
      <div className="chart-card__body">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
