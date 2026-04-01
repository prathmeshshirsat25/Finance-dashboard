import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // Navigation: 'dashboard' | 'transactions' | 'insights'
      activeTab: 'dashboard',
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Chart Range: 'Monthly' | 'Weekly'
      timeRange: 'Monthly',
      setTimeRange: (range) => set({ timeRange: range }),

      // Modal: Add Transaction
      isModalOpen: false,
      setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

      // User Role: 'admin' | 'viewer'
      role: 'admin',
      setRole: (role) => set({ role }),

      // Theme: 'light' | 'dark'
      theme: 'light',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),

      // Transactions Data
      transactions: [
        { id: 1, date: '2026-03-25', amount: 2500, category: 'Salary', type: 'income', note: 'Monthly Salary' },
        { id: 2, date: '2026-03-26', amount: 50, category: 'Food', type: 'expense', note: 'Lunch with team' },
        { id: 3, date: '2026-03-27', amount: 120, category: 'Shopping', type: 'expense', note: 'New sneakers' },
        { id: 4, date: '2026-03-28', amount: 800, category: 'Rent', type: 'expense', note: 'March Rent' },
        { id: 5, date: '2026-03-29', amount: 150, category: 'Utilities', type: 'expense', note: 'Electricity Bill' },
        { id: 6, date: '2026-03-30', amount: 200, category: 'Freelance', type: 'income', note: 'Logo Design' },
        { id: 7, date: '2026-03-31', amount: 45, category: 'Transport', type: 'expense', note: 'Uber ride' },
      ],

      addTransaction: (transaction) => set((state) => ({
        transactions: [
          { ...transaction, id: Date.now() },
          ...state.transactions
        ]
      })),

      removeTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),

      updateTransaction: (id, updatedData) => set((state) => ({
        transactions: state.transactions.map((t) => 
          t.id === id ? { ...t, ...updatedData } : t
        )
      })),

      // Filters
      filters: {
        search: '',
        category: 'All',
        type: 'All', // 'income' | 'expense' | 'All'
      },
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),
    }),
    {
      name: 'finance-storage',
    }
  )
);

export default useStore;
