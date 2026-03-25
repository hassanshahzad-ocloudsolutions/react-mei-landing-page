import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import ProjectsHeader from './components/ProjectsHeader/ProjectsHeader';
import ProjectsTable from './components/ProjectsTable/ProjectsTable';
import Footer from './components/Footer/Footer';
import { projects } from './data/projects';
import {
  STAGE_GROUPS,
  PROJECT_TYPE_OPTIONS,
  TOTAL_KW_LIMITS,
  buildDefaultFilters,
  projectMatchesFilters
} from './constants/filters';
import './App.css';

const stateOptions = Array.from(new Set(projects.map((p) => p.state))).sort((a, b) =>
  a.localeCompare(b)
);
const projectTypeOptions = Array.from(
  new Set([...projects.map((p) => p.projectType), ...PROJECT_TYPE_OPTIONS])
).sort((a, b) => a.localeCompare(b));
const solutionTypeOptions = Array.from(new Set(projects.map((p) => p.solutionType))).sort((a, b) =>
  a.localeCompare(b)
);
const offtakeTypeOptions = Array.from(new Set(projects.map((p) => p.offtakeType))).sort((a, b) =>
  a.localeCompare(b)
);

function App() {
  const [filters, setFilters] = useState(() =>
    buildDefaultFilters(stateOptions, projectTypeOptions, solutionTypeOptions, offtakeTypeOptions)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = useMemo(
    () => projects.filter((project) => projectMatchesFilters(project, filters)),
    [filters]
  );

  const toggleStageGroup = (label, checked) => {
    const group = STAGE_GROUPS.find((g) => g.label === label);
    if (!group) return;

    setFilters((prev) => {
      const selected = new Set(prev.stage.selected);
      group.options.forEach((option) => {
        if (checked) selected.add(option);
        else selected.delete(option);
      });

      return {
        ...prev,
        stage: {
          selected: Array.from(selected),
          groups: {
            ...prev.stage.groups,
            [label]: checked
          }
        }
      };
    });
  };

  const toggleStageOption = (option, checked) => {
    setFilters((prev) => {
      const selected = new Set(prev.stage.selected);
      if (checked) selected.add(option);
      else selected.delete(option);

      const updatedGroups = STAGE_GROUPS.reduce((acc, group) => {
        acc[group.label] = group.options.some((opt) => selected.has(opt));
        return acc;
      }, {});

      return {
        ...prev,
        stage: {
          selected: Array.from(selected),
          groups: updatedGroups
        }
      };
    });
  };

  const toggleStateOption = (option, checked) => {
    setFilters((prev) => {
      if (option === 'All') {
        return { ...prev, states: checked ? [...stateOptions] : [] };
      }

      const next = new Set(prev.states);
      if (checked) next.add(option);
      else next.delete(option);

      return { ...prev, states: Array.from(next) };
    });
  };

  const toggleProjectType = (option, checked) => {
    setFilters((prev) => {
      if (option === 'All') {
        return { ...prev, projectTypes: checked ? [...projectTypeOptions] : [] };
      }

      const next = new Set(prev.projectTypes);
      if (checked) next.add(option);
      else next.delete(option);

      return { ...prev, projectTypes: Array.from(next) };
    });
  };

  const toggleSolutionType = (option, checked) => {
    setFilters((prev) => {
      if (option === 'All') {
        return { ...prev, solutionTypes: checked ? [...solutionTypeOptions] : [] };
      }

      const next = new Set(prev.solutionTypes);
      if (checked) next.add(option);
      else next.delete(option);

      return { ...prev, solutionTypes: Array.from(next) };
    });
  };

  const toggleOfftakeType = (option, checked) => {
    setFilters((prev) => {
      if (option === 'All') {
        return { ...prev, offtakeTypes: checked ? [...offtakeTypeOptions] : [] };
      }

      const next = new Set(prev.offtakeTypes);
      if (checked) next.add(option);
      else next.delete(option);

      return { ...prev, offtakeTypes: Array.from(next) };
    });
  };

  const changeKwRange = (field, value) => {
    const numericValue = Number(value);
    setFilters((prev) => {
      const next = { ...prev.totalKw, [field]: numericValue };
      if (next.min > next.max) {
        if (field === 'min') next.max = numericValue;
        else next.min = numericValue;
      }
      next.min = Math.max(TOTAL_KW_LIMITS.min, next.min);
      next.max = Math.min(TOTAL_KW_LIMITS.max, next.max);
      return { ...prev, totalKw: next };
    });
  };

  const resetFilters = () => {
    setFilters(
      buildDefaultFilters(stateOptions, projectTypeOptions, solutionTypeOptions, offtakeTypeOptions)
    );
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-panel">
        <ProjectsHeader
          filters={filters}
          stageGroups={STAGE_GROUPS}
          stateOptions={stateOptions}
          projectTypeOptions={projectTypeOptions}
          solutionTypeOptions={solutionTypeOptions}
          offtakeTypeOptions={offtakeTypeOptions}
          onToggleStageGroup={toggleStageGroup}
          onToggleStageOption={toggleStageOption}
          onToggleStateOption={toggleStateOption}
          onToggleProjectType={toggleProjectType}
          onToggleSolutionType={toggleSolutionType}
          onToggleOfftakeType={toggleOfftakeType}
          onKwChange={changeKwRange}
          onResetFilters={resetFilters}
          isFiltersModalOpen={isModalOpen}
          onOpenFiltersModal={() => setIsModalOpen(true)}
          onCloseFiltersModal={() => setIsModalOpen(false)}
        />
        <ProjectsTable data={filteredProjects} />
        <Footer />
      </main>
    </div>
  );
}

export default App;
