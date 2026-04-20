import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { FiEdit2, FiTrash2, FiRepeat } from 'react-icons/fi';
import { getCategoryIcon, getCategoryColor, getCategoryGradient } from '../../utils/categories';
import { useCurrency } from '../../hooks/useCurrency';
import './TransactionCard.css';

export default function TransactionCard({ transaction, onEdit, onDelete, index = 0 }) {
  const { format: formatAmount } = useCurrency();
  const CategoryIcon = getCategoryIcon(transaction.category);
  const categoryColor = getCategoryColor(transaction.category);
  const isIncome = transaction.type === 'income';

  return (
    <motion.div
      className={`txn-card ${isIncome ? 'txn-card--income' : 'txn-card--expense'}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      layout
    >
      <div className="txn-card__icon" style={{ background: getCategoryGradient(transaction.category) }}>
        <CategoryIcon size={18} />
      </div>

      <div className="txn-card__info">
        <div className="txn-card__title-row">
          <h4 className="txn-card__title">{transaction.title}</h4>
          <div className="txn-card__badges">
            {transaction.recurring && (
              <span className="badge badge-recurring">
                <FiRepeat size={10} />
                Recurring
              </span>
            )}
            <span className={`badge ${isIncome ? 'badge-income' : 'badge-expense'}`}>
              {transaction.type}
            </span>
          </div>
        </div>
        <div className="txn-card__meta">
          <span className="txn-card__category" style={{ color: categoryColor }}>
            {transaction.category}
          </span>
          <span className="txn-card__dot">·</span>
          <span className="txn-card__date">
            {format(parseISO(transaction.date), 'dd MMM yyyy')}
          </span>
          {transaction.notes && (
            <>
              <span className="txn-card__dot">·</span>
              <span className="txn-card__notes" title={transaction.notes}>
                {transaction.notes}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="txn-card__right">
        <span className={`txn-card__amount ${isIncome ? 'txn-card__amount--income' : 'txn-card__amount--expense'}`}>
          {isIncome ? '+' : '-'}{formatAmount(transaction.amount)}
        </span>
        <div className="txn-card__actions">
          <button
            className="btn btn-icon btn-ghost txn-card__action-btn"
            onClick={() => onEdit(transaction)}
            aria-label="Edit transaction"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            className="btn btn-icon btn-ghost txn-card__action-btn txn-card__action-btn--delete"
            onClick={() => onDelete(transaction.id)}
            aria-label="Delete transaction"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
