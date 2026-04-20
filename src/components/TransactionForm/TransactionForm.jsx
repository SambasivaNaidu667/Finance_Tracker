import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiCalendar, FiDollarSign, FiTag, FiFileText, FiRepeat, FiType } from 'react-icons/fi';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, TRANSACTION_TYPES } from '../../utils/constants';
import './TransactionForm.css';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(2, 'Title must be at least 2 characters').max(80, 'Title is too long'),
  amount: yup.number().typeError('Amount must be a number').required('Amount is required').positive('Amount must be positive').max(99999999, 'Amount is too large'),
  category: yup.string().required('Category is required'),
  type: yup.string().required('Type is required').oneOf(['income', 'expense']),
  date: yup.string().required('Date is required'),
  notes: yup.string().max(200, 'Notes must be under 200 characters'),
  recurring: yup.boolean(),
});

export default function TransactionForm({ initialData, onSubmit, onCancel }) {
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      title: '',
      amount: '',
      category: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      recurring: false,
    },
  });

  const selectedType = watch('type');
  const categories = selectedType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      amount: Number(data.amount),
    });
    if (!isEditing) {
      reset();
    }
  };

  return (
    <motion.form
      className="txn-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="txn-form__header">
        <h2 className="txn-form__title">
          {isEditing ? 'Edit Transaction' : 'New Transaction'}
        </h2>
        <p className="txn-form__subtitle">
          {isEditing ? 'Update the transaction details below' : 'Fill in the details to add a new transaction'}
        </p>
      </div>

      <div className="txn-form__type-toggle">
        <label className={`txn-form__type-option ${selectedType === 'expense' ? 'txn-form__type-option--expense-active' : ''}`}>
          <input type="radio" value="expense" {...register('type')} />
          <span>Expense</span>
        </label>
        <label className={`txn-form__type-option ${selectedType === 'income' ? 'txn-form__type-option--income-active' : ''}`}>
          <input type="radio" value="income" {...register('type')} />
          <span>Income</span>
        </label>
      </div>

      <div className="txn-form__grid">
        <div className="form-group txn-form__full">
          <label className="form-label">
            <FiType size={13} />
            Title
          </label>
          <input
            className={`form-input ${errors.title ? 'form-input--error' : ''}`}
            placeholder="e.g., Coffee at Starbucks"
            {...register('title')}
          />
          {errors.title && <span className="form-error">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            <FiDollarSign size={13} />
            Amount
          </label>
          <input
            className={`form-input ${errors.amount ? 'form-input--error' : ''}`}
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('amount')}
          />
          {errors.amount && <span className="form-error">{errors.amount.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            <FiTag size={13} />
            Category
          </label>
          <select
            className={`form-select ${errors.category ? 'form-input--error' : ''}`}
            {...register('category')}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="form-error">{errors.category.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            <FiCalendar size={13} />
            Date
          </label>
          <input
            className={`form-input ${errors.date ? 'form-input--error' : ''}`}
            type="date"
            {...register('date')}
          />
          {errors.date && <span className="form-error">{errors.date.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            <FiRepeat size={13} />
            Recurring
          </label>
          <label className="txn-form__checkbox">
            <input type="checkbox" {...register('recurring')} />
            <span className="txn-form__checkbox-slider" />
            <span className="txn-form__checkbox-label">Mark as recurring</span>
          </label>
        </div>

        <div className="form-group txn-form__full">
          <label className="form-label">
            <FiFileText size={13} />
            Notes <span className="form-label--optional">(optional)</span>
          </label>
          <textarea
            className={`form-input txn-form__textarea ${errors.notes ? 'form-input--error' : ''}`}
            placeholder="Add any additional notes..."
            rows={3}
            {...register('notes')}
          />
          {errors.notes && <span className="form-error">{errors.notes.message}</span>}
        </div>
      </div>

      <div className="txn-form__actions">
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            <FiX size={16} />
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
          <FiSave size={16} />
          {isEditing ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </div>
    </motion.form>
  );
}
