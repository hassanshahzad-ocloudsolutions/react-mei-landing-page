import FiltersBar from '../FiltersBar/FiltersBar';
import './ProjectsHeader.css';

const ProjectsHeader = ({
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
  return (
    <section className="projects-header">
      <div className="projects-header__title">
        <h1>All Projects</h1>
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
      />
    </section>
  );
};

export default ProjectsHeader;
