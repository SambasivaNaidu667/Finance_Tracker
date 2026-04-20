import { motion } from 'framer-motion';
import { FiInbox } from 'react-icons/fi';
import './EmptyState.css';

export default function EmptyState({ icon: Icon = FiInbox, title, message, action }) {
  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="empty-state__icon-wrapper">
        <div className="empty-state__icon-ring" />
        <Icon className="empty-state__icon" />
      </div>
      <h3 className="empty-state__title">{title || 'Nothing here yet'}</h3>
      <p className="empty-state__message">
        {message || 'Start adding data to see it appear here.'}
      </p>
      {action && <div className="empty-state__action">{action}</div>}
    </motion.div>
  );
}
