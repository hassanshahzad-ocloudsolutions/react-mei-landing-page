import { useEffect, useMemo, useState } from 'react';
import DualRangeSlider from '../../DualRangeSlider/DualRangeSlider';
import { STAGE_COLOR_MAP, TOTAL_KW_LIMITS, formatNumber } from '../../../constants/filters';
import './AllFiltersModal.css';


const DELIVERY_PHASE_OPTIONS = ['Onboard', 'Design', 'Construction', 'MC', 'BU', 'SC', 'FC', 'Canceled'];

const UTILITY_OPTIONS = [
  'All Utilities',
  'Dominion Energy',
  'Georgia Power Company',
  'PG&E',
  'Austin Energy',
  'Entergy',
  'National Grid',
  'Florida Power & Light',
  'Con Edison'
];

const DEFAULT_SELECTED_UTILITIES = ['All Utilities', 'Dominion Energy', 'Georgia Power Company', 'PG&E'];

const CheckIcon = () => (
  <svg className="pill__check-icon" viewBox="0 0 12 12" aria-hidden="true">
    <path
      d="M3 6.2l1.8 1.8L9 4.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg className="modal-search__icon" viewBox="0 0 20 20" aria-hidden="true">
    <path
      d="M14 14l4 4m-2.5-8.5a6 6 0 11-12 0 6 6 0 0112 0z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AllFiltersModal = ({
  open,
  filters,
  stageGroups,
  stateOptions,
  projectTypeOptions,
  solutionTypeOptions,
  offtakeTypeOptions,
  onToggleStageOption,
  onToggleStateOption,
  onToggleProjectType,
  onToggleSolutionType,
  onToggleOfftakeType,
  onKwChange,
  onResetFilters,
  onClose
}) => {
  const [stateQuery, setStateQuery] = useState('');
  const [statePlaceholderChecked, setStatePlaceholderChecked] = useState(false);
  const [deliveryPhases, setDeliveryPhases] = useState(['Onboard', 'Design']);
  const [utilityQuery, setUtilityQuery] = useState('');
  const [selectedUtilities, setSelectedUtilities] = useState(DEFAULT_SELECTED_UTILITIES);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setStateQuery('');
      setUtilityQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handler = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      window.addEventListener('keydown', handler);
    }
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const filteredStates = useMemo(() => {
    if (!stateQuery.trim()) return stateOptions;
    return stateOptions.filter((state) => state.toLowerCase().includes(stateQuery.toLowerCase()));
  }, [stateOptions, stateQuery]);

  const filteredUtilities = useMemo(() => {
    if (!utilityQuery.trim()) return UTILITY_OPTIONS;
    return UTILITY_OPTIONS.filter((utility) => utility.toLowerCase().includes(utilityQuery.toLowerCase()))
      .filter((value, index, array) => array.indexOf(value) === index);
  }, [utilityQuery]);

  if (!open) return null;

  const stageOptions = stageGroups.flatMap((group) => group.options.map((option) => ({
    option,
    group: group.label
  })));

  const isStateSelected = (state) => filters.states.includes(state);
  const allStatesSelected = filters.states.length === stateOptions.length;
  const isProjectTypeSelected = (type) => filters.projectTypes.includes(type);
  const isSolutionTypeSelected = (type) => filters.solutionTypes.includes(type);
  const isOfftakeTypeSelected = (type) => filters.offtakeTypes.includes(type);
  const isDeliveryPhaseSelected = (phase) => deliveryPhases.includes(phase);
  const isUtilitySelected = (utility) => selectedUtilities.includes(utility);

  const toggleState = (state) => {
    onToggleStateOption(state, !isStateSelected(state));
  };

  const toggleStage = (option) => {
    onToggleStageOption(option, !filters.stage.selected.includes(option));
  };

  const toggleProjectType = (type) => {
    onToggleProjectType(type, !isProjectTypeSelected(type));
  };

  const toggleSolutionType = (type) => {
    onToggleSolutionType(type, !isSolutionTypeSelected(type));
  };

  const toggleOfftakeType = (type) => {
    onToggleOfftakeType(type, !isOfftakeTypeSelected(type));
  };

  const toggleDeliveryPhase = (phase) => {
    setDeliveryPhases((prev) =>
      prev.includes(phase) ? prev.filter((item) => item !== phase) : [...prev, phase]
    );
  };

  const toggleUtility = (utility) => {
    setSelectedUtilities((prev) =>
      prev.includes(utility) ? prev.filter((item) => item !== utility) : [...prev, utility]
    );
  };

  const handleBackdropClick = (event) => {
    if (event.target.classList.contains('filters-modal__backdrop')) {
      onClose();
    }
  };

  return (
    <div className="filters-modal__backdrop" onClick={handleBackdropClick}>
      <div className="filters-modal">
        <header className="filters-modal__header">
          <h2>All Filters</h2>
          <button type="button" className="filters-modal__close" onClick={onClose} aria-label="Close filters">
            ×
          </button>
        </header>

        <div className="filters-modal__body">
          <section className="filters-modal__section">
            <h3>Stage</h3>
            <div className="pill-grid">
              {stageOptions.map(({ option }) => {
                const isSelected = filters.stage.selected.includes(option);
                const palette = STAGE_COLOR_MAP[option] || {};
                return (
                  <button
                    key={option}
                    type="button"
                    className={`pill pill--stage ${isSelected ? 'pill--active pill--checked' : ''}`}
                    style={
                      isSelected
                        ? { '--stage-color': palette.background, '--stage-text-color': palette.color }
                        : undefined
                    }
                    onClick={() => toggleStage(option)}
                    aria-pressed={isSelected}
                  >
                    <span className="pill__check" aria-hidden="true">
                      <CheckIcon />
                    </span>
                    <span className="pill__label">{option}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="filters-modal__section">
            <h3>Project Type</h3>
            <div className="pill-grid">
              {projectTypeOptions.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`pill ${isProjectTypeSelected(type) ? 'pill--active pill--checked' : ''}`}
                  onClick={() => toggleProjectType(type)}
                  aria-pressed={isProjectTypeSelected(type)}
                >
                  <span className="pill__check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span className="pill__label">{type}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="filters-modal__section">
            <h3>Total kW DC</h3>
            <DualRangeSlider
              min={TOTAL_KW_LIMITS.min}
              max={TOTAL_KW_LIMITS.max}
              step={TOTAL_KW_LIMITS.step}
              valueMin={filters.totalKw.min}
              valueMax={filters.totalKw.max}
              onChange={onKwChange}
            />
            <div className="range-inputs range-inputs--modal">
              <label>
                <span>Min</span>
                <div className="range-inputs__number">
                  <input
                    type="number"
                    min={TOTAL_KW_LIMITS.min}
                    max={TOTAL_KW_LIMITS.max}
                    value={filters.totalKw.min}
                    onChange={(e) => onKwChange('min', e.target.value)}
                  />
                  <span className="range-inputs__suffix">kW</span>
                </div>
              </label>
              <span className="range-sep">-</span>
              <label>
                <span>Max</span>
                <div className="range-inputs__number">
                  <input
                    type="number"
                    min={TOTAL_KW_LIMITS.min}
                    max={TOTAL_KW_LIMITS.max}
                    value={filters.totalKw.max}
                    onChange={(e) => onKwChange('max', e.target.value)}
                  />
                  <span className="range-inputs__suffix">kW</span>
                </div>
              </label>
            </div>
            <p className="range-summary">
              Showing projects between <strong>{formatNumber(filters.totalKw.min)} kW</strong> and{' '}
              <strong>{formatNumber(filters.totalKw.max)} kW</strong>
            </p>
          </section>

          <section className="filters-modal__section">
            <h3>State</h3>
            <div className="modal-search modal-search--state">
              <SearchIcon />
              <input
                type="search"
                placeholder="E.g. Washington, Oregon, Montana..."
                value={stateQuery}
                onChange={(e) => setStateQuery(e.target.value)}
              />
            </div>
            <div className="state-toolbar">
              <button
                type="button"
                className={`pill ${allStatesSelected ? 'pill--active pill--checked' : ''}`}
                onClick={() => onToggleStateOption('All', !allStatesSelected)}
              >
                <span className="pill__check" aria-hidden="true">
                  <CheckIcon />
                </span>
                <span className="pill__label">All States</span>
              </button>
              <label className="inline-checkbox">
                <input
                  type="checkbox"
                  checked={statePlaceholderChecked}
                  onChange={(e) => setStatePlaceholderChecked(e.target.checked)}
                />
                <span>Placeholder Text</span>
              </label>
            </div>
            <div className="chip-list">
              {filters.states.map((state) => (
                <span key={state} className="chip chip--selected">
                  {state}
                  <button type="button" aria-label={`Remove ${state}`} onClick={() => onToggleStateOption(state, false)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="pill-grid pill-grid--wrap">
              {filteredStates.map((state) => {
                const selected = isStateSelected(state);
                return (
                  <button
                    key={state}
                    type="button"
                    className={`pill ${selected ? 'pill--active' : ''}`}
                    onClick={() => toggleState(state)}
                    aria-pressed={selected}
                  >
                    {state}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="filters-modal__section">
            <h3>Delivery Phase</h3>
            <div className="pill-grid">
              {DELIVERY_PHASE_OPTIONS.map((phase) => {
                const selected = isDeliveryPhaseSelected(phase);
                return (
                  <button
                    key={phase}
                    type="button"
                    className={`pill  ${selected ? 'pill--active pill--checked' : ''}`}
                    onClick={() => toggleDeliveryPhase(phase)}
                    aria-pressed={selected}
                  >
                    <span className="pill__check" aria-hidden="true">
                      <CheckIcon />
                    </span>
                    <span className="pill__label">{phase}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="filters-modal__section">
            <h3>Solution Type</h3>
            <div className="pill-grid">
              {solutionTypeOptions.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`pill pill--selectable ${isSolutionTypeSelected(type) ? 'pill--active pill--checked' : ''}`}
                  onClick={() => toggleSolutionType(type)}
                  aria-pressed={isSolutionTypeSelected(type)}
                >
                  <span className="pill__check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span className="pill__label">{type}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="filters-modal__section">
            <h3>Offtake Type</h3>
            <div className="pill-grid">
              {offtakeTypeOptions.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`pill pill--selectable ${isOfftakeTypeSelected(type) ? 'pill--active pill--checked' : ''}`}
                  onClick={() => toggleOfftakeType(type)}
                  aria-pressed={isOfftakeTypeSelected(type)}
                >
                  <span className="pill__check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span className="pill__label">{type}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="filters-modal__section">
            <h3>Utility</h3>
            <div className="modal-search modal-search--state">
              <SearchIcon />
              <input
                type="search"
                placeholder="E.g. Georgia Power Company, Dominion Energy..."
                value={utilityQuery}
                onChange={(e) => setUtilityQuery(e.target.value)}
              />
            </div>
            <div className="chip-list">
              {selectedUtilities.map((utility) => (
                <span key={utility + '-chip'} className="chip chip--selected">
                  {utility}
                  <button type="button" aria-label={`Remove ${utility}`} onClick={() => toggleUtility(utility)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="pill-grid pill-grid--wrap">
              {filteredUtilities.map((utility) => {
                const selected = isUtilitySelected(utility);
                return (
                  <button
                    key={utility + '-option'}
                    type="button"
                    className={`pill pill--outline pill--state ${selected ? 'pill--active' : ''}`}
                    onClick={() => toggleUtility(utility)}
                    aria-pressed={selected}
                  >
                    {utility}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <footer className="filters-modal__footer">
          <button type="button" className="ghost-button" onClick={onResetFilters}>
            Clear All
          </button>
          <button type="button" className="cta-button" onClick={onClose}>
            Ok
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AllFiltersModal;
