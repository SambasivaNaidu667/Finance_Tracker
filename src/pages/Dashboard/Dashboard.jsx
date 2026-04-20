import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiArrowRight, FiPlusCircle, FiStar, FiUsers } from 'react-icons/fi';
import StatCard from '../../components/Charts/StatCard';
import CategoryPieChart from '../../components/Charts/CategoryPieChart';
import BudgetCard from '../../components/BudgetCard/BudgetCard';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import EmptyState from '../../components/Shared/EmptyState';
import { useBudget } from '../../hooks/useBudget';
import { useCurrency } from '../../hooks/useCurrency';
import { useFinance } from '../../context/FinanceContext';
import { toast } from 'react-toastify';
import './Dashboard.css';

export default function Dashboard() {
  const {
    totalIncome,
    totalExpenses,
    netBalance,
    categoryData,
    topCategory,
    monthTransactions,
  } = useBudget();
  const { format: formatAmount } = useCurrency();
  const { transactions, loadDemoData, clearAllData } = useFinance();

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const handleLoadDemo = () => {
    loadDemoData();
    toast.success('Demo data loaded successfully! 🎉');
  };

  const handleClearData = () => {
    clearAllData();
    toast.info('All data cleared');
  };

  return (
    <div className="page dashboard">
      <div className="page-header dashboard__header">
        <div>
          <h1 className="page-title">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="page-desc">Your financial overview at a glance</p>
        </div>
        <div className="dashboard__header-actions">
          {transactions.length === 0 && (
            <button className="btn btn-primary" onClick={handleLoadDemo} id="load-demo-btn">
              <FiUsers size={16} />
              Load Demo Data
            </button>
          )}
          {transactions.length > 0 && (
            <button className="btn btn-ghost btn-sm" onClick={handleClearData} id="clear-data-btn">
              Clear Data
            </button>
          )}
          <Link to="/transactions/new" className="btn btn-primary" id="add-txn-btn">
            <FiPlusCircle size={16} />
            Add Transaction
          </Link>
        </div>
      </div>

      <div className="grid-4 dashboard__kpis">
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
          icon={FiStar}
          variant="accent"
          subtitle={topCategory ? `${formatAmount(topCategory.amount)} (${topCategory.percentage}%)` : 'No data yet'}
          index={3}
        />
      </div>

      <div className="dashboard__grid">
        <div className="dashboard__col-left">
          <BudgetCard />

          <CategoryPieChart data={categoryData} />
        </div>

        <div className="dashboard__col-right">
          <div className="dashboard__recent">
            <div className="dashboard__recent-header">
              <h3 className="dashboard__recent-title">Recent Transactions</h3>
              <Link to="/transactions" className="btn btn-ghost btn-sm">
                View All <FiArrowRight size={14} />
              </Link>
            </div>
            {recentTransactions.length === 0 ? (
              <EmptyState
                title="No transactions yet"
                message="Start tracking your finances by adding your first transaction."
                action={
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link to="/transactions/new" className="btn btn-primary">
                      <FiPlusCircle size={16} />
                      Add Transaction
                    </Link>
                    <button className="btn btn-secondary" onClick={handleLoadDemo}>
                      <FiUsers size={16} />
                      Load Demo Data
                    </button>
                  </div>
                }
              />
            ) : (
              <div className="dashboard__recent-list">
                {recentTransactions.map((txn, i) => (
                  <TransactionCard
                    key={txn.id}
                    transaction={txn}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
