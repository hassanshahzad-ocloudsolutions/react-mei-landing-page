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

export const buildDefaultFilters = (states, projectTypes) => ({
  stage: {
    selected: [...STAGE_GROUPS.find((g) => g.label === 'Active').options],
    groups: {
      Active: true,
      Inactive: false
    }
  },
  states: [...states],
  projectTypes: [...projectTypes],
  totalKw: {
    min: TOTAL_KW_LIMITS.min,
    max: TOTAL_KW_LIMITS.max
  }
});

export const projectMatchesFilters = (project, filters) => {
  const inStage = filters.stage.selected.includes(project.stage);
  const inState = filters.states.includes(project.state);
  const inProjectType = filters.projectTypes.includes(project.projectType);
  const withinKw = project.totalKwDc >= filters.totalKw.min && project.totalKwDc <= filters.totalKw.max;
  return inStage && inState && inProjectType && withinKw;
};
