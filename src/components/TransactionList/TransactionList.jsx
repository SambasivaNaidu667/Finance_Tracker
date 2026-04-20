import { AnimatePresence } from 'framer-motion';
import TransactionCard from '../TransactionCard/TransactionCard';
import EmptyState from '../Shared/EmptyState';
import { FiShoppingCart } from 'react-icons/fi';
import './TransactionList.css';

export default function TransactionList({ transactions, onEdit, onDelete, emptyMessage }) {
  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        icon={FiShoppingCart}
        title="No transactions found"
        message={emptyMessage || "You haven't added any transactions yet. Start by adding your first transaction!"}
      />
    );
  }

  return (
    <div className="txn-list">
      <AnimatePresence mode="popLayout">
        {transactions.map((txn, index) => (
          <TransactionCard
            key={txn.id}
            transaction={txn}
            onEdit={onEdit}
            onDelete={onDelete}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
