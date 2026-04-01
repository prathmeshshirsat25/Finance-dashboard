import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
  Zap,
  Target
} from 'lucide-react';
import useStore from '../store/useStore';
import Header from './Header';
import './Insights.css';

const Insights = () => {
  const { transactions, setIsModalOpen } = useStore();

  // Process data for last 6 months expenses
  const getMonthlyData = () => {
    const monthlyMap = {};
    const now = new Date();
    
    // Initialize last 6 months with 0
    for(let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthYear = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
      monthlyMap[monthYear] = { month: monthYear, expense: 0, income: 0 };
    }

    transactions.forEach(t => {
      const d = new Date(t.date);
      const monthYear = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
      if (monthlyMap[monthYear]) {
        if (t.type === 'expense') {
          monthlyMap[monthYear].expense += t.amount;
        } else {
          monthlyMap[monthYear].income += t.amount;
        }
      }
    });

    return Object.values(monthlyMap);
  };

  const monthlyData = getMonthlyData();
  const currentMonthExpense = monthlyData[monthlyData.length - 1].expense;
  const prevMonthExpense = monthlyData[monthlyData.length - 2].expense;
  const isSpendingUp = currentMonthExpense > prevMonthExpense;
  const spendingDiff = Math.abs(currentMonthExpense - prevMonthExpense);
  const percentDiff = prevMonthExpense > 0 ? Math.round((spendingDiff / prevMonthExpense) * 100) : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  return (
    <motion.div 
      className="insights-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Header 
        title="Financial Insights" 
        subtitle="AI-powered analysis of your spending behavior."
        onAddClick={() => setIsModalOpen(true)}
      />

      <div className="insights-grid">
        <motion.div className="insight-main-card glass" variants={itemVariants}>
          <div className="card-header">
            <h3>Monthly Expense Trend</h3>
            <span className="badge">Last 6 Months</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(var(--primary-rgb), 0.05)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-card)', 
                    borderColor: 'var(--border)',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                />
                <Bar 
                  dataKey="expense" 
                  fill="var(--primary)" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                  animationDuration={1500}
                >
                  {monthlyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === monthlyData.length - 1 ? 'var(--primary)' : 'rgba(var(--primary-rgb), 0.3)'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="insights-sidebar">
          <motion.div className={`analysis-card glass ${isSpendingUp ? 'warning' : 'success'}`} variants={itemVariants}>
            <div className="analysis-icon">
              {isSpendingUp ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
            </div>
            <div className="analysis-content">
              <h4>{isSpendingUp ? 'Spending Increase' : 'Savings Goal Met'}</h4>
              <p>Your expenses are <strong>{isSpendingUp ? 'up' : 'down'} {percentDiff}%</strong> compared to last month.</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.min(percentDiff, 100)}%` }}></div>
              </div>
            </div>
          </motion.div>

          <motion.div className="action-card glass" variants={itemVariants}>
            <div className="action-header">
              <Zap size={20} className="zap-icon" />
              <h4>Smart Recommendations</h4>
            </div>
            <ul className="action-list">
              <li>
                <ChevronRight size={16} />
                <span>Switch to a weekly budget for <strong>Food</strong>.</span>
              </li>
              <li>
                <ChevronRight size={16} />
                <span>You can save <strong>₹850</strong> by reducing Rent.</span>
              </li>
              <li>
                <ChevronRight size={16} />
                <span>Your income is stable. Good job!</span>
              </li>
            </ul>
          </motion.div>

          <motion.div className="goal-card glass" variants={itemVariants}>
            <div className="goal-header">
              <Target size={20} className="target-icon" />
              <h4>Financial Health Score</h4>
            </div>
            <div className="score-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <text x="18" y="20.35" className="percentage">85</text>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Insights;
