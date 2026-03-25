import { useMemo, useState } from 'react';
import { formatNumber, TOTAL_KW_LIMITS } from '../../constants/filters';
import './FiltersBar.css';

const caret = (
  <svg className="filter-chip__caret" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path
      d="M3.25 4.5l2.75 2.75L8.75 4.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const FiltersBar = ({
  filters,
  stageGroups,
  stateOptions,
  projectTypeOptions,
  onToggleStageGroup,
  onToggleStageOption,
  onToggleStateOption,
  onToggleProjectType,
  onKwChange
}) => {
  const [open, setOpen] = useState(null);

  const toggleOpen = (name) => {
    setOpen((prev) => (prev === name ? null : name));
  };

  const stageSummary = useMemo(() => {
    const active = stageGroups.find((g) => g.label === 'Active');
    const inactive = stageGroups.find((g) => g.label === 'Inactive');
    const selected = new Set(filters.stage.selected);
    const hasActive = active ? active.options.every((opt) => selected.has(opt)) && !inactive.options.some((opt) => selected.has(opt)) : false;
    const hasInactiveOnly = inactive
      ? inactive.options.some((opt) => selected.has(opt)) && !active.options.some((opt) => selected.has(opt))
      : false;
    if (hasActive) return 'Active';
    if (hasInactiveOnly) return 'Inactive';
    if (selected.size === 0) return 'None';
    if (active && inactive && selected.size === active.options.length + inactive.options.length) return 'All';
    return `${selected.size} selected`;
  }, [filters.stage.selected, stageGroups]);

  const statesSummary = useMemo(() => {
    if (filters.states.length === stateOptions.length) return 'All';
    if (filters.states.length === 0) return 'None';
    if (filters.states.length === 1) return filters.states[0];
    return `${filters.states.length} selected`;
  }, [filters.states, stateOptions.length]);

  const projectTypeSummary = useMemo(() => {
    if (filters.projectTypes.length === projectTypeOptions.length) return 'All';
    if (filters.projectTypes.length === 0) return 'None';
    if (filters.projectTypes.length === 1) return filters.projectTypes[0];
    return `${filters.projectTypes.length} selected`;
  }, [filters.projectTypes, projectTypeOptions.length]);

  const kwSummary = useMemo(() => {
    const { min, max } = filters.totalKw;
    if (min === TOTAL_KW_LIMITS.min && max === TOTAL_KW_LIMITS.max) return '< 5,000';
    if (min <= TOTAL_KW_LIMITS.min) return `< ${formatNumber(max)}`;
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  }, [filters.totalKw]);

  const allStatesChecked = filters.states.length === stateOptions.length;
  const allProjectTypesChecked = filters.projectTypes.length === projectTypeOptions.length;

  return (
    <div className="filters-bar">
      <div className="filter-chip-wrapper">
        <button
          className={`filter-chip ${open === 'stage' ? 'is-open' : ''}`}
          type="button"
          onClick={() => toggleOpen('stage')}
        >
          <span className="filter-chip__label">Stage:</span>
          <span className="filter-chip__value">{stageSummary}</span>
          {caret}
        </button>
        {open === 'stage' && (
          <div className="filter-dropdown">
            {stageGroups.map((group) => (
              <div key={group.label} className="filter-dropdown__section">
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={!!filters.stage.groups[group.label]}
                    onChange={(e) => onToggleStageGroup(group.label, e.target.checked)}
                  />
                  <span className="checkbox-label checkbox-label--group">{group.label}</span>
                </label>
                <div className="filter-dropdown__options">
                  {group.options.map((option) => (
                    <label key={option} className="checkbox-row">
                      <input
                        type="checkbox"
                        checked={filters.stage.selected.includes(option)}
                        onChange={(e) => onToggleStageOption(option, e.target.checked)}
                      />
                      <span className={`status-pill status-pill--${option.replace(/\s+/g, '-').toLowerCase()}`}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="filter-chip-wrapper">
        <button
          className={`filter-chip ${open === 'state' ? 'is-open' : ''}`}
          type="button"
          onClick={() => toggleOpen('state')}
        >
          <span className="filter-chip__label">State:</span>
          <span className="filter-chip__value">{statesSummary}</span>
          {caret}
        </button>
        {open === 'state' && (
          <div className="filter-dropdown">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={allStatesChecked}
                onChange={(e) => onToggleStateOption('All', e.target.checked)}
              />
              <span className="checkbox-label">All</span>
            </label>
            {stateOptions.map((option) => (
              <label key={option} className="checkbox-row">
                <input
                  type="checkbox"
                  checked={filters.states.includes(option)}
                  onChange={(e) => onToggleStateOption(option, e.target.checked)}
                />
                <span className="checkbox-label">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-chip-wrapper">
        <button
          className={`filter-chip ${open === 'projectType' ? 'is-open' : ''}`}
          type="button"
          onClick={() => toggleOpen('projectType')}
        >
          <span className="filter-chip__label">Project Type:</span>
          <span className="filter-chip__value">{projectTypeSummary}</span>
          {caret}
        </button>
        {open === 'projectType' && (
          <div className="filter-dropdown">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={allProjectTypesChecked}
                onChange={(e) => onToggleProjectType('All', e.target.checked)}
              />
              <span className="checkbox-label">All</span>
            </label>
            {projectTypeOptions.map((option) => (
              <label key={option} className="checkbox-row">
                <input
                  type="checkbox"
                  checked={filters.projectTypes.includes(option)}
                  onChange={(e) => onToggleProjectType(option, e.target.checked)}
                />
                <span className="checkbox-label">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-chip-wrapper">
        <button
          className={`filter-chip ${open === 'kw' ? 'is-open' : ''}`}
          type="button"
          onClick={() => toggleOpen('kw')}
        >
          <span className="filter-chip__label">Total kW DC:</span>
          <span className="filter-chip__value">{kwSummary}</span>
          {caret}
        </button>
            {open === 'kw' && (
          <div className="filter-dropdown filter-dropdown--kw">
            <div className="range-row">
              {/* visual track showing selected area */}
              {
                (() => {
                  const minVal = Number(filters.totalKw.min);
                  const maxVal = Number(filters.totalKw.max);
                  const rangeTotal = TOTAL_KW_LIMITS.max - TOTAL_KW_LIMITS.min || 1;
                  const leftPct = ((minVal - TOTAL_KW_LIMITS.min) / rangeTotal) * 100;
                  const rightPct = ((maxVal - TOTAL_KW_LIMITS.min) / rangeTotal) * 100;
                  const trackStyle = {
                    background: `linear-gradient(to right, #e6eef8 0%, #e6eef8 ${leftPct}%, #9ad62f ${leftPct}%, #9ad62f ${rightPct}%, #e6eef8 ${rightPct}%, #e6eef8 100%)`
                  };

                  return (
                    <div className="range-track" style={trackStyle} aria-hidden>
                      {/* two overlapping ranges for dual-thumb interaction */}
                      <input
                        className="range-input range-input--min"
                        type="range"
                        min={TOTAL_KW_LIMITS.min}
                        max={TOTAL_KW_LIMITS.max}
                        step={TOTAL_KW_LIMITS.step}
                        value={filters.totalKw.min}
                        onChange={(e) => onKwChange('min', e.target.value)}
                        aria-label="Minimum kW"
                      />
                      <input
                        className="range-input range-input--max"
                        type="range"
                        min={TOTAL_KW_LIMITS.min}
                        max={TOTAL_KW_LIMITS.max}
                        step={TOTAL_KW_LIMITS.step}
                        value={filters.totalKw.max}
                        onChange={(e) => onKwChange('max', e.target.value)}
                        aria-label="Maximum kW"
                      />
                    </div>
                  );
                })()
              }
            </div>
            <div className="range-inputs">
              <label>
                <span>Min</span>
                <input
                  type="number"
                  min={TOTAL_KW_LIMITS.min}
                  max={TOTAL_KW_LIMITS.max}
                  value={filters.totalKw.min}
                  onChange={(e) => onKwChange('min', e.target.value)}
                />
              </label>
              <span className="range-sep">-</span>
              <label>
                <span>Max</span>
                <input
                  type="number"
                  min={TOTAL_KW_LIMITS.min}
                  max={TOTAL_KW_LIMITS.max}
                  value={filters.totalKw.max}
                  onChange={(e) => onKwChange('max', e.target.value)}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersBar;
