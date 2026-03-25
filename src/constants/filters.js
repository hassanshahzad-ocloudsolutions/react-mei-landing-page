export const STAGE_GROUPS = [
  {
    label: 'Active',
    options: ['Pre-Contract', 'In Development', 'In Construction', 'Operating']
  },
  {
    label: 'Inactive',
    options: ['Cancelled']
  }
];

export const STAGE_COLOR_MAP = {
  'Pre-Contract': { background: '#1D4289', color: '#FFFFFF' },
  'In Development': { background: '#CCD4D7', color: '#1D4289' },
  'In Construction': { background: '#F7BB39', color: '#002A3A' },
  Operating: { background: '#05A569', color: '#FFFFFF' },
  Cancelled: { background: '#E63946', color: '#FFFFFF' }
};

export const TOTAL_KW_LIMITS = {
  min: 0,
  max: 5000,
  step: 10
};

export const PROJECT_TYPE_OPTIONS = ['BESS', 'Carport', 'Floating', 'Ground', 'Roof'];

export const formatNumber = (value) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(
    value
  );

export const buildDefaultFilters = (states, projectTypes, solutionTypes, offtakeTypes) => ({
  stage: {
    selected: [...STAGE_GROUPS.find((g) => g.label === 'Active').options],
    groups: {
      Active: true,
      Inactive: false
    }
  },
  states: [...states],
  projectTypes: [...projectTypes],
  solutionTypes: [...solutionTypes],
  offtakeTypes: [...offtakeTypes],
  totalKw: {
    min: TOTAL_KW_LIMITS.min,
    max: TOTAL_KW_LIMITS.max
  }
});

export const projectMatchesFilters = (project, filters) => {
  const inStage = filters.stage.selected.includes(project.stage);
  const inState = filters.states.includes(project.state);
  const inProjectType = filters.projectTypes.includes(project.projectType);
  const inSolutionType = filters.solutionTypes.includes(project.solutionType);
  const inOfftakeType = filters.offtakeTypes.includes(project.offtakeType);
  const withinKw = project.totalKwDc >= filters.totalKw.min && project.totalKwDc <= filters.totalKw.max;
  return inStage && inState && inProjectType && inSolutionType && inOfftakeType && withinKw;
};
