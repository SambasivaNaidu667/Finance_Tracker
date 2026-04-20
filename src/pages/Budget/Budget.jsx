import { motion } from 'framer-motion';
import { FiTarget, FiAlertCircle } from 'react-icons/fi';
import BudgetCard from '../../components/BudgetCard/BudgetCard';
import BudgetForm from '../../components/BudgetCard/BudgetForm';
import StatCard from '../../components/Charts/StatCard';
import { useBudget } from '../../hooks/useBudget';
import { useCurrency } from '../../hooks/useCurrency';
import { CATEGORY_COLORS } from '../../utils/constants';
import { getCategoryIcon, getCategoryGradient } from '../../utils/categories';
import './Budget.css';

export default function Budget() {
  const {
    budgetAmount,
    totalIncome,
    totalExpenses,
    budgetRemaining,
    categoryData,
    isOverBudget,
    overBudgetAmount,
    transactionCount,
  } = useBudget();
  const { format: formatAmount } = useCurrency();

  return (
    <div className="page budget-page">
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text">Budget</span>
        </h1>
        <p className="page-desc">Set and track your monthly spending limits</p>
      </div>

      {isOverBudget && (
        <motion.div
          className="budget-page__warning"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FiAlertCircle size={18} />
          <div>
            <strong>You've exceeded your budget!</strong>
            <p>You're {formatAmount(overBudgetAmount)} over your monthly limit.</p>
          </div>
        </motion.div>
      )}

      <div className="budget-page__grid">
        <div className="budget-page__col">
          <BudgetForm />
          <BudgetCard />
        </div>

        <div className="budget-page__col">
          <div className="budget-page__stats">
            <StatCard
              title="Month Income"
              value={formatAmount(totalIncome)}
              variant="income"
              index={0}
            />
            <StatCard
              title="Month Expenses"
              value={formatAmount(totalExpenses)}
              variant="expense"
              index={1}
            />
            <StatCard
              title="Transactions"
              value={transactionCount}
              variant="default"
              subtitle="This month"
              index={2}
            />
          </div>

          {categoryData.length > 0 && (
            <motion.div
              className="budget-page__categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="budget-page__cat-title">Category Breakdown</h3>
              <div className="budget-page__cat-list">
                {categoryData.map((item, i) => {
                  const Icon = getCategoryIcon(item.category);
                  return (
                    <div className="budget-page__cat-item" key={item.category}>
                      <div className="budget-page__cat-icon" style={{ background: getCategoryGradient(item.category) }}>
                        <Icon size={14} />
                      </div>
                      <div className="budget-page__cat-info">
                        <div className="budget-page__cat-header">
                          <span className="budget-page__cat-name">{item.category}</span>
                          <span className="budget-page__cat-amount">{formatAmount(item.amount)}</span>
                        </div>
                        <div className="budget-page__cat-bar">
                          <motion.div
                            className="budget-page__cat-fill"
                            style={{ background: CATEGORY_COLORS[item.category] || '#78716c' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                          />
                        </div>
                      </div>
                      <span className="budget-page__cat-pct">{item.percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
