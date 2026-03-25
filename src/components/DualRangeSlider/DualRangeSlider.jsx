import './DualRangeSlider.css';

const DualRangeSlider = ({
  min,
  max,
  step,
  valueMin,
  valueMax,
  onChange,
  ariaLabelMin = 'Minimum value',
  ariaLabelMax = 'Maximum value'
}) => {
  const safeRange = Math.max(max - min, 1);
  const leftPct = ((Number(valueMin) - min) / safeRange) * 100;
  const rightPct = ((Number(valueMax) - min) / safeRange) * 100;
  const trackStyle = {
    background: `linear-gradient(to right, #c7d1dd 0%, #c7d1dd ${leftPct}%, #bedc3b ${leftPct}%, #bedc3b ${rightPct}%, #c7d1dd ${rightPct}%, #c7d1dd 100%)`
  };

  const handleChange = (field) => (event) => {
    onChange(field, event.target.value);
  };

  return (
    <div className="range-row">
      <div className="range-track" style={trackStyle} aria-hidden>
        <input
          className="range-input range-input--min"
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={handleChange('min')}
          aria-label={ariaLabelMin}
        />
        <input
          className="range-input range-input--max"
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={handleChange('max')}
          aria-label={ariaLabelMax}
        />
      </div>
    </div>
  );
};

export default DualRangeSlider;
