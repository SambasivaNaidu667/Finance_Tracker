import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiSave } from 'react-icons/fi';
import { useBudget } from '../../hooks/useBudget';
import { toast } from 'react-toastify';
import './BudgetForm.css';

export default function BudgetForm() {
  const { budget, setBudget } = useBudget();
  const [amount, setAmount] = useState(budget.monthlyBudget || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);

    if (!value || value <= 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }

    if (value > 99999999) {
      toast.error('Budget amount is too large');
      return;
    }

    setBudget({ monthlyBudget: value });
    toast.success('Monthly budget updated! 🎯');
  };

  return (
    <motion.form
      className="budget-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="budget-form__title">Set Monthly Budget</h3>
      <p className="budget-form__desc">
        Define your monthly spending limit to track your finances better.
      </p>
      <div className="budget-form__input-group">
        <div className="budget-form__input-wrapper">
          <FiDollarSign className="budget-form__input-icon" size={16} />
          <input
            className="form-input budget-form__input"
            type="number"
            min="1"
            step="100"
            placeholder="e.g., 50000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <FiSave size={16} />
          Save Budget
        </button>
      </div>
    </motion.form>
  );
}
