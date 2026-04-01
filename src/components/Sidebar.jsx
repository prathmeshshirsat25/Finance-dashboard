import React from 'react';
import { 
  LayoutDashboard, 
  ReceiptIndianRupee, 
  PieChart, 
  Settings, 
  Moon, 
  Sun, 
  UserCircle,
  ShieldCheck,
  ShieldAlert,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import './Sidebar.css';

const Sidebar = () => {
  const { role, setRole, theme, toggleTheme, activeTab, setActiveTab } = useStore();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <ReceiptIndianRupee size={20} /> },
    { id: 'insights', label: 'Insights', icon: <PieChart size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">Z</div>
        <span className="logo-text">Zorvyntech</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button 
            key={item.id} 
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {activeTab === item.id && (
              <motion.div 
                layoutId="activePill" 
                className="active-pill"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="role-switcher">
          <div className="role-info">
            {role === 'admin' ? <ShieldCheck size={18} className="icon-admin" /> : <ShieldAlert size={18} className="icon-viewer" />}
            <span>{role.toUpperCase()}</span>
          </div>
          <button 
            className="switch-btn"
            onClick={() => setRole(role === 'admin' ? 'viewer' : 'admin')}
          >
            Switch to {role === 'admin' ? 'Viewer' : 'Admin'}
          </button>
        </div>

        <div className="theme-toggle">
          <button onClick={toggleTheme} className="theme-btn">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>

        <div className="user-profile">
          <UserCircle size={32} />
          <div className="user-details">
            <span className="user-name">Prathmesh Shirsat</span>
            <span className="user-email">prathmesh@example.com</span>
          </div>
          <LogOut size={18} className="logout-icon" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
