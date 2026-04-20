import { NavLink, useLocation } from 'react-router-dom';
import { FiGrid, FiList, FiPlusCircle, FiTarget, FiBarChart2, FiDollarSign } from 'react-icons/fi';
import CurrencySelector from '../Shared/CurrencySelector';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { path: '/transactions', label: 'Transactions', icon: FiList },
  { path: '/transactions/new', label: 'Add New', icon: FiPlusCircle },
  { path: '/budget', label: 'Budget', icon: FiTarget },
  { path: '/analytics', label: 'Analytics', icon: FiBarChart2 },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <FiDollarSign size={22} />
        </div>
        <div className="sidebar__brand-text">
          <span className="sidebar__brand-name">FinanceFlow</span>
          <span className="sidebar__brand-tagline">Smart Money</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '/transactions/new'
              ? location.pathname === '/transactions/new'
              : item.path === '/transactions'
                ? location.pathname === '/transactions'
                : location.pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`sidebar__nav-link ${isActive ? 'sidebar__nav-link--active' : ''}`}
                  end={item.path === '/transactions'}
                >
                  <span className="sidebar__nav-icon">
                    <Icon size={18} />
                  </span>
                  <span className="sidebar__nav-label">{item.label}</span>
                  {isActive && <span className="sidebar__nav-indicator" />}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <CurrencySelector />
      </div>
    </aside>
  );
}
