import './StatusBadge.css';

const slugify = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const StatusBadge = ({ status }) => {
  const statusClass = `status-${slugify(status)}`;
  return <span className={`status-badge ${statusClass}`}>{status}</span>;
};

export default StatusBadge;
