import { NavLink, useLocation } from 'react-router-dom';
import { FiGrid, FiList, FiPlusCircle, FiTarget, FiBarChart2 } from 'react-icons/fi';
import './MobileNav.css';

const mobileNavItems = [
  { path: '/dashboard', label: 'Home', icon: FiGrid },
  { path: '/transactions', label: 'History', icon: FiList },
  { path: '/transactions/new', label: 'Add', icon: FiPlusCircle, isCenter: true },
  { path: '/budget', label: 'Budget', icon: FiTarget },
  { path: '/analytics', label: 'Stats', icon: FiBarChart2 },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="mobile-nav">
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.path === '/transactions/new'
          ? location.pathname === '/transactions/new'
          : item.path === '/transactions'
            ? location.pathname === '/transactions'
            : location.pathname.startsWith(item.path);

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`mobile-nav__item ${isActive ? 'mobile-nav__item--active' : ''} ${item.isCenter ? 'mobile-nav__item--center' : ''}`}
            end={item.path === '/transactions'}
          >
            <span className={`mobile-nav__icon ${item.isCenter ? 'mobile-nav__icon--center' : ''}`}>
              <Icon size={item.isCenter ? 22 : 20} />
            </span>
            <span className="mobile-nav__label">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
