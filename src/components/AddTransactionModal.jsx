import React, { useState } from 'react';
import { X, Plus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import './Modal.css';

const AddTransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction } = useStore();
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    type: 'expense',
    note: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['Salary', 'Food', 'Shopping', 'Rent', 'Utilities', 'Freelance', 'Transport', 'Healthcare', 'Entertainment'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.note) return;

    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    
    // Reset and close
    setFormData({
      amount: '',
      category: 'Food',
      type: 'expense',
      note: '',
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="modal-content glass"
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="modal-header">
              <h3>Add New Transaction</h3>
              <button className="close-btn" onClick={onClose}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <div className="type-toggle">
                    <button 
                      type="button"
                      className={formData.type === 'income' ? 'active income' : ''}
                      onClick={() => setFormData({...formData, type: 'income'})}
                    >
                      Income
                    </button>
                    <button 
                      type="button"
                      className={formData.type === 'expense' ? 'active expense' : ''}
                      onClick={() => setFormData({...formData, type: 'expense'})}
                    >
                      Expense
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description / Note</label>
                <input 
                  type="text" 
                  placeholder="e.g. Monthly Rent, Groceries..." 
                  required
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                <button type="submit" className="submit-btn">
                  <Plus size={18} />
                  Add Transaction
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionModal;
