import './Sidebar.css';
import { FaHome, FaTh, FaRegCreditCard, FaCube,FaRegUserCircle } from 'react-icons/fa';
import logo from '../../assets/images/MEI+.png';

const navItems = [
  { key: 'overview', label: 'Overview', icon: FaHome, active: true },
  { key: 'portfolio', label: 'Portfolio', icon: FaTh },
  { key: 'billing', label: 'Billing', icon: FaRegCreditCard },
  { key: 'resources', label: 'Resources', icon: FaCube }
];


const Sidebar = () => (
  <aside className="sidebar">
    <div>
      <div className="sidebar__brand">
        <div className="brand-mark">
          <img src={logo} alt="MEI logo" />
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
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
    </div>

    <div className="sidebar__user">
      <div className="user-avatar"><FaRegUserCircle /></div>
      <div className="user-info"><span>Roger Kent</span></div>
    </div>
  </aside>
);
export default Sidebar;