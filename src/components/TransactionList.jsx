import React from 'react';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Trash2, 
  Edit3, 
  ChevronLeft, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import Header from './Header';
import AddTransactionModal from './AddTransactionModal';
import './TransactionList.css';

const TransactionList = () => {
  const { 
    transactions, 
    role, 
    filters, 
    setFilters,
    removeTransaction,
    isModalOpen,
    setIsModalOpen
  } = useStore();

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.note.toLowerCase().includes(filters.search.toLowerCase()) || 
                         t.category.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === 'All' || t.type === filters.type;
    const matchesCategory = filters.category === 'All' || t.category === filters.category;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const categories = ['All', ...new Set(transactions.map(t => t.category))];

  return (
    <div className="transaction-page">
      <Header 
        title="Transactions" 
        subtitle="Detailed history of all your financial activities."
        onAddClick={() => setIsModalOpen(true)}
      />

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="transaction-section">
        <div className="section-header">
          <div className="title-group">
            <h2>Activity Log</h2>
            <span className="count-badge">{filteredTransactions.length} items</span>
          </div>
          
          <div className="filter-group">
            <div className="filter-item">
              <Filter size={16} />
              <select 
                value={filters.type} 
                onChange={(e) => setFilters({ type: e.target.value })}
              >
                <option value="All">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="filter-item">
              <select 
                value={filters.category} 
                onChange={(e) => setFilters({ category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="transaction-table-wrapper glass">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                {role === 'admin' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredTransactions.map((transaction) => (
                  <motion.tr 
                    key={transaction.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  >
                    <td>
                      <div className="desc-cell">
                        <div className={`icon-circle ${transaction.type}`}>
                          {transaction.type === 'income' ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
                        </div>
                        <span>{transaction.note}</span>
                      </div>
                    </td>
                    <td>
                      <span className="category-tag">{transaction.category}</span>
                    </td>
                    <td className="date-cell">
                      {new Date(transaction.date).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </td>
                    <td className={`amount-cell ${transaction.type}`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </td>
                    <td>
                      <span className={`status-pill ${transaction.type}`}>
                        {transaction.type}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn edit"><Edit3 size={16} /></button>
                          <button 
                            className="action-btn delete"
                            onClick={() => removeTransaction(transaction.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
              
              {filteredTransactions.length === 0 && (
                <tr className="empty-row">
                  <td colSpan={role === 'admin' ? 6 : 5} className="empty-state">
                    <div className="empty-content">
                      <p>No transactions found matching "{filters.search}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <p>Showing 1 to {filteredTransactions.length} of {filteredTransactions.length} entries</p>
          <div className="pagination-btns">
            <button disabled className="page-btn"><ChevronLeft size={18} /></button>
            <button className="page-btn active">1</button>
            <button disabled className="page-btn"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
