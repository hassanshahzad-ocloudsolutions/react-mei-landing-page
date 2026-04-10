import FiltersBar from '../FiltersBar/FiltersBar';
import AllFiltersModal from '../modals/AllFiltersModal/AllFiltersModal';
import HeaderSidebarDropdown from './HeaderSidebarDropdown';
import './ProjectsHeader.css';

const ProjectsHeader = ({
  filters,
  stageGroups,
  stateOptions,
  projectTypeOptions,
  solutionTypeOptions,
  offtakeTypeOptions,
  onToggleStageGroup,
  onToggleStageOption,
  onToggleStateOption,
  onToggleProjectType,
  onToggleSolutionType,
  onToggleOfftakeType,
  onKwChange,
  onResetFilters,
  isFiltersModalOpen,
  onOpenFiltersModal,
  onCloseFiltersModal
}) => {
  return (
    <section className="projects-header">
      <div className="projects-header__title">
        <h1>All Projects</h1>
        <HeaderSidebarDropdown />
      </div>
      <FiltersBar
        filters={filters}
        stageGroups={stageGroups}
        stateOptions={stateOptions}
        projectTypeOptions={projectTypeOptions}
        onToggleStageGroup={onToggleStageGroup}
        onToggleStageOption={onToggleStageOption}
        onToggleStateOption={onToggleStateOption}
        onToggleProjectType={onToggleProjectType}
        onKwChange={onKwChange}
        onOpenFiltersModal={onOpenFiltersModal}
      />
      <AllFiltersModal
        open={isFiltersModalOpen}
        filters={filters}
        stageGroups={stageGroups}
        stateOptions={stateOptions}
        projectTypeOptions={projectTypeOptions}
        solutionTypeOptions={solutionTypeOptions}
        offtakeTypeOptions={offtakeTypeOptions}
        onToggleStageOption={onToggleStageOption}
        onToggleStateOption={onToggleStateOption}
        onToggleProjectType={onToggleProjectType}
        onToggleSolutionType={onToggleSolutionType}
        onToggleOfftakeType={onToggleOfftakeType}
        onKwChange={onKwChange}
        onResetFilters={onResetFilters}
        onClose={onCloseFiltersModal}
      />
    </section>
  );
};

export default ProjectsHeader;
