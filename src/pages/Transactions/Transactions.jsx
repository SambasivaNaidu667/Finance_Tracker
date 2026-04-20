import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useTransactions } from '../../hooks/useTransactions';
import TransactionList from '../../components/TransactionList/TransactionList';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../../components/Filters/Filters';
import SortControl from '../../components/SortControl/SortControl';
import ConfirmModal from '../../components/Shared/ConfirmModal';
import './Transactions.css';

export default function Transactions() {
  const navigate = useNavigate();
  const {
    filteredTransactions,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    resetFilters,
    activeFilterCount,
    deleteTransaction,
  } = useTransactions();

  const [deleteId, setDeleteId] = useState(null);

  const handleEdit = (txn) => {
    navigate(`/transactions/new?edit=${txn.id}`);
  };

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteTransaction(deleteId);
      toast.success('Transaction deleted');
      setDeleteId(null);
    }
  };

  return (
    <div className="page transactions-page">
      <div className="page-header">
        <div className="section-header">
          <div>
            <h1 className="page-title">Transactions</h1>
            <p className="page-desc">
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/transactions/new')}
            id="add-txn-page-btn"
          >
            <FiPlusCircle size={16} />
            Add Transaction
          </button>
        </div>
      </div>

      <div className="transactions-page__toolbar">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <SortControl sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <Filters
        filters={filters}
        setFilters={setFilters}
        activeFilterCount={activeFilterCount}
        onReset={resetFilters}
      />

      <div className="transactions-page__list">
        <TransactionList
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
          emptyMessage={
            activeFilterCount > 0
              ? 'No transactions match your filters. Try adjusting your search or filters.'
              : "You haven't added any transactions yet. Click 'Add Transaction' to get started!"
          }
        />
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
        confirmLabel="Delete"
        danger
      />
    </div>
  );
}
