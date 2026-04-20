import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import './ConfirmModal.css';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmLabel = 'Delete', danger = true }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close btn btn-icon btn-ghost" onClick={onCancel} aria-label="Close modal">
              <FiX size={18} />
            </button>
            <div className={`modal-icon-wrapper ${danger ? 'modal-icon-wrapper--danger' : ''}`}>
              <FiAlertTriangle size={28} />
            </div>
            <h3 className="modal-title">{title || 'Are you sure?'}</h3>
            <p className="modal-message">{message || 'This action cannot be undone.'}</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
              <button className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`} onClick={onConfirm}>
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
