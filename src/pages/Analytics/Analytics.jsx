import { FiBarChart2, FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';
import StatCard from '../../components/Charts/StatCard';
import CategoryPieChart from '../../components/Charts/CategoryPieChart';
import MonthlyTrendChart from '../../components/Charts/MonthlyTrendChart';
import IncomeExpenseChart from '../../components/Charts/IncomeExpenseChart';
import { useBudget } from '../../hooks/useBudget';
import { useCurrency } from '../../hooks/useCurrency';
import './Analytics.css';

export default function Analytics() {
  const {
    totalIncome,
    totalExpenses,
    netBalance,
    categoryData,
    topCategory,
  } = useBudget();
  const { format: formatAmount } = useCurrency();

  return (
    <div className="page analytics-page">
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text">Analytics</span>
        </h1>
        <p className="page-desc">Deep dive into your financial patterns</p>
      </div>

      <div className="grid-4 analytics-page__kpis">
        <StatCard
          title="Total Income"
          value={formatAmount(totalIncome)}
          icon={FiTrendingUp}
          variant="income"
          subtitle="This month"
          index={0}
        />
        <StatCard
          title="Total Expenses"
          value={formatAmount(totalExpenses)}
          icon={FiTrendingDown}
          variant="expense"
          subtitle="This month"
          index={1}
        />
        <StatCard
          title="Net Balance"
          value={formatAmount(netBalance)}
          icon={FiDollarSign}
          variant={netBalance >= 0 ? 'income' : 'expense'}
          subtitle="This month"
          index={2}
        />
        <StatCard
          title="Top Category"
          value={topCategory ? topCategory.category : '—'}
          icon={FiBarChart2}
          variant="accent"
          subtitle={topCategory ? `${topCategory.percentage}% of expenses` : 'No data'}
          index={3}
        />
      </div>

      <div className="analytics-page__charts">
        <div className="analytics-page__chart-row">
          <CategoryPieChart data={categoryData} />
          <MonthlyTrendChart />
        </div>
        <IncomeExpenseChart />
      </div>
    </div>
  );
}
