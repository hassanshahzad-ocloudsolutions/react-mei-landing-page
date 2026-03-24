import FiltersBar from '../FiltersBar/FiltersBar';
import './ProjectsHeader.css';

const ProjectsHeader = ({ filters }) => {
  return (
    <section className="projects-header">
      <div className="projects-header__title">
        <h1>All Projects</h1>
      </div>
      <FiltersBar filters={filters} />
    </section>
  );
};

export default ProjectsHeader;
