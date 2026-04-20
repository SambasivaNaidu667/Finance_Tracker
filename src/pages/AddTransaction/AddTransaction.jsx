import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import { useFinance } from '../../context/FinanceContext';
import './AddTransaction.css';

export default function AddTransaction() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { transactions, addTransaction, updateTransaction } = useFinance();

  const editData = useMemo(() => {
    if (!editId) return null;
    return transactions.find((t) => t.id === editId) || null;
  }, [editId, transactions]);

  const handleSubmit = (data) => {
    if (editData) {
      updateTransaction({ ...data, id: editData.id });
      toast.success('Transaction updated! ✅');
      navigate('/transactions');
    } else {
      addTransaction(data);
      toast.success('Transaction added! 💸');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="page add-transaction-page">
      <div className="page-header">
        <h1 className="page-title">
          {editData ? 'Edit Transaction' : 'Add Transaction'}
        </h1>
        <p className="page-desc">
          {editData
            ? 'Update the details of your transaction'
            : 'Record a new income or expense transaction'}
        </p>
      </div>

      <TransactionForm
        initialData={editData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
