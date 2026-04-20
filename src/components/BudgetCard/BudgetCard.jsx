import { motion } from 'framer-motion';
import { FiTarget, FiAlertTriangle } from 'react-icons/fi';
import { useBudget } from '../../hooks/useBudget';
import { useCurrency } from '../../hooks/useCurrency';
import './BudgetCard.css';

export default function BudgetCard() {
  const {
    budgetAmount,
    totalExpenses,
    budgetRemaining,
    budgetPercentage,
    isOverBudget,
  } = useBudget();
  const { format: formatAmount } = useCurrency();

  if (budgetAmount <= 0) return null;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (Math.min(budgetPercentage, 100) / 100) * circumference;

  const getProgressColor = () => {
    if (budgetPercentage >= 100) return '#ef4444';
    if (budgetPercentage >= 80) return '#f59e0b';
    return '#10b981';
  };

  return (
    <motion.div
      className={`budget-card ${isOverBudget ? 'budget-card--over' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="budget-card__header">
        <div className="budget-card__title-group">
          <FiTarget size={18} className="budget-card__icon" />
          <h3 className="budget-card__title">Monthly Budget</h3>
        </div>
        {isOverBudget && (
          <span className="badge badge-warning">
            <FiAlertTriangle size={11} />
            Over Budget
          </span>
        )}
      </div>

      <div className="budget-card__body">
        <div className="budget-card__ring-wrapper">
          <svg className="budget-card__ring" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="10"
            />
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={getProgressColor()}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              transform="rotate(-90 80 80)"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: progressOffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
          <div className="budget-card__ring-center">
            <span className="budget-card__ring-percent">{Math.round(budgetPercentage)}%</span>
            <span className="budget-card__ring-label">used</span>
          </div>
        </div>

        <div className="budget-card__stats">
          <div className="budget-card__stat">
            <span className="budget-card__stat-label">Budget</span>
            <span className="budget-card__stat-value">{formatAmount(budgetAmount)}</span>
          </div>
          <div className="budget-card__stat">
            <span className="budget-card__stat-label">Spent</span>
            <span className="budget-card__stat-value budget-card__stat-value--expense">
              {formatAmount(totalExpenses)}
            </span>
          </div>
          <div className="budget-card__stat">
            <span className="budget-card__stat-label">Remaining</span>
            <span className={`budget-card__stat-value ${budgetRemaining < 0 ? 'budget-card__stat-value--expense' : 'budget-card__stat-value--income'}`}>
              {formatAmount(budgetRemaining)}
            </span>
          </div>
        </div>
      </div>

      <div className="budget-card__progress-bar">
        <motion.div
          className="budget-card__progress-fill"
          style={{ background: getProgressColor() }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(budgetPercentage, 100)}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
