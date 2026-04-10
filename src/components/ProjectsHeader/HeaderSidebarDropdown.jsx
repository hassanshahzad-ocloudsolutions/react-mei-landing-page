import { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaTh, FaRegCreditCard, FaCube, FaRegUserCircle } from 'react-icons/fa';
import logo from '../../assets/images/MEI+.png';
import './ProjectsHeader.css';

const navItems = [
  { key: 'overview', label: 'Overview', icon: FaHome},
  { key: 'portfolio', label: 'Portfolio', icon: FaTh, active: true },
  { key: 'billing', label: 'Billing', icon: FaRegCreditCard },
  { key: 'resources', label: 'Resources', icon: FaCube }
];

export default function HeaderSidebarDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="header-sidebar-dropdown">
      <button
        className="header-hamburger"
        aria-expanded={open}
        aria-label={open ? 'Close sidebar menu' : 'Open sidebar menu'}
        onClick={() => setOpen(v => !v)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {open && (
        <>
          <div className="header-sidebar-backdrop" onClick={() => setOpen(false)} />
          <div className="header-sidebar-panel" role="menu" aria-label="Sidebar menu">
            <div className="sidebar__brand header-panel-brand">
              <div className="brand-mark">
                <img src={logo} alt="MEI logo" />
              </div>
            </div>

            <nav className="sidebar__nav header-panel-nav" aria-label="Primary">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button key={item.key} className={`nav-item ${item.active ? 'is-active' : ''}`}>
                    <span className="nav-icon"><Icon /></span>
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="sidebar__user header-panel-user">
              <div className="user-avatar"><FaRegUserCircle /></div>
              <div className="user-info"><span>Roger Kent</span></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
