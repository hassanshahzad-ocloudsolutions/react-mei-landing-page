import './FiltersBar.css';

const FiltersBar = ({ filters }) => {
  return (
    <div className="filters-bar">
      {filters.map((filter) => (
        <button key={filter.label} className="filter-chip" type="button">
          <span className="filter-chip__label">{filter.label}:</span>
          <span className="filter-chip__value">{filter.value}</span>
          <svg
            className="filter-chip__caret"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            aria-hidden="true"
          >
            <path
              d="M3.25 4.5l2.75 2.75L8.75 4.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      ))}

    </div>
  );
};

export default FiltersBar;
