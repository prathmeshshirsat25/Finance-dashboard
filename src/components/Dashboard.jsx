import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft,
  Calendar,
  Filter,
  Search,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import TransactionList from './TransactionList';
import AddTransactionModal from './AddTransactionModal';
import Header from './Header';
import './Dashboard.css';

const Dashboard = () => {
  const { 
    transactions, 
    role, 
    filters, 
    setFilters, 
    timeRange, 
    setTimeRange,
    isModalOpen,
    setIsModalOpen
  } = useStore();

  // Calculate stats
  const totalBalance = transactions.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0
  );
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Prepare chart data (Trend) - 7 Calendar Days for Weekly
  const getFilteredChartData = () => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
    
    const filtered = timeRange === 'Weekly' 
      ? transactions.filter(t => new Date(t.date) >= sevenDaysAgo)
      : transactions;

    return filtered.slice().reverse().reduce((acc, curr) => {
      const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
      const newBalance = curr.type === 'income' ? lastBalance + curr.amount : lastBalance - curr.amount;
      acc.push({
        date: new Date(curr.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        balance: newBalance,
        amount: curr.amount,
        type: curr.type
      });
      return acc;
    }, []);
  };

  const chartData = getFilteredChartData();

  // Prepare category data
  const categoryDataMapping = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const categoryData = Object.keys(categoryDataMapping).map(key => ({
    name: key,
    value: categoryDataMapping[key]
  }));

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 1
      }
    }
  };

  const hoverVariants = {
    hover: { 
      scale: 1.01, 
      y: -8,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <motion.div 
      className="dashboard-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Header 
        title="Financial Overview" 
        subtitle="Welcome back, here's what's happening with your money."
        onAddClick={() => setIsModalOpen(true)}
      />

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Summary Cards */}
      <div className="stats-grid">
        <motion.div 
          className="stat-card glass" 
          variants={itemVariants}
          whileHover="hover"
          animate="visible"
          initial="hidden"
          custom={hoverVariants}
          {...{ variants: { ...itemVariants, ...hoverVariants } }}
        >
          <div className="stat-icon-wrapper balance">
            <Wallet size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Balance</span>
            <h2 className="stat-value">₹{totalBalance.toLocaleString()}</h2>
            <div className="stat-trend positive">
              <TrendingUp size={14} />
              <span>+12.5% this month</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card glass" 
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="stat-icon-wrapper income">
            <ArrowUpRight size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Income</span>
            <h2 className="stat-value">₹{totalIncome.toLocaleString()}</h2>
            <div className="stat-trend positive">
              <TrendingUp size={14} />
              <span>+8.2%</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card glass" 
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="stat-icon-wrapper expense">
            <ArrowDownLeft size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Expenses</span>
            <h2 className="stat-value">₹{totalExpenses.toLocaleString()}</h2>
            <div className="stat-trend negative">
              <TrendingDown size={14} />
              <span>+4.1%</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="charts-grid">
        {/* Balance Trend */}
        <motion.div className="chart-card glass" variants={itemVariants}>
          <div className="chart-header">
            <h3>Balance Trend</h3>
            <div className="chart-actions">
              <button 
                className={`chart-filter-btn ${timeRange === 'Monthly' ? 'active' : ''}`}
                onClick={() => setTimeRange('Monthly')}
              >
                Monthly
              </button>
              <button 
                className={`chart-filter-btn ${timeRange === 'Weekly' ? 'active' : ''}`}
                onClick={() => setTimeRange('Weekly')}
              >
                Weekly
              </button>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip 
                  cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '5 5' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-card)', 
                    borderColor: 'var(--border)',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--border)',
                    padding: '12px'
                  }}
                />
                <Area 
                  type="stepAfter" 
                  dataKey="balance" 
                  stroke="var(--primary)" 
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                  strokeWidth={4}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Categories Breakdown */}
        <motion.div className="chart-card glass" variants={itemVariants}>
          <div className="chart-header">
            <h3>Spending by Category</h3>
          </div>
          <div className="chart-wrapper pie-chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="insights-grid">
        <motion.div className="insight-card glass" variants={itemVariants}>
          <div className="insight-icon info">
            <TrendingUp size={20} />
          </div>
          <div className="insight-content">
            <h4>Highest Spending Category</h4>
            <p>You spent most on <strong>{categoryData.length > 0 ? categoryData.sort((a,b) => b.value - a.value)[0].name : 'N/A'}</strong> this month.</p>
          </div>
        </motion.div>

        <motion.div className="insight-card glass" variants={itemVariants}>
          <div className="insight-icon success">
            <Calendar size={20} />
          </div>
          <div className="insight-content">
            <h4>Budget Status</h4>
            <p>You are within your budget for <strong>Food & Dining</strong>. Great job!</p>
          </div>
        </motion.div>

        <motion.div className="insight-card glass" variants={itemVariants}>
          <div className="insight-icon info">
            <ArrowUpRight size={20} />
          </div>
          <div className="insight-content">
            <h4>Savings Rate</h4>
            <p>You saved <strong>{totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0}%</strong> of your income this month.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
