import React from 'react';
import { Search, Plus } from 'lucide-react';
import useStore from '../store/useStore';
import './Header.css';

const Header = ({ title, subtitle, onAddClick }) => {
  const { filters, setFilters, role } = useStore();

  return (
    <header className="shared-header">
      <div className="header-info">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="header-actions">
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>
        {role === 'admin' && (
          <button className="add-btn" onClick={onAddClick}>
            <Plus size={20} />
            <span>Add Transaction</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
