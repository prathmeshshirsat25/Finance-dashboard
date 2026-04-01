import React, { useEffect } from 'react';
import useStore from './store/useStore';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import Insights from './components/Insights';
import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  const { theme, activeTab } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <TransactionList />;
      case 'insights':
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <style jsx>{`
        .app-container {
          display: flex;
          min-height: 100vh;
        }
        .main-content {
          flex: 1;
          margin-left: 260px;
          padding: 2rem;
          background-color: var(--bg-main);
          transition: margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-x: hidden;
        }
        .placeholder-view {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 60vh;
          font-size: 1.5rem;
          font-family: var(--font-display);
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .main-content {
            margin-left: 80px;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
