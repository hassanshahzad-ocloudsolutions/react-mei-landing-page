import StatusBadge from '../StatusBadge/StatusBadge';
import './ProjectsTable.css';

const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const ProjectsTable = ({ data }) => {
  return (
    <section className="projects-card">
      <div className="projects-card__surface">
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Stage</th>
              <th>State</th>
              <th>Total kW DC</th>
              <th>Project Type</th>
              <th>Solution Type</th>
              <th>Offtake Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project) => (
              <tr key={project.id}>
                <td>
                  <div className="project-name">
                    <span className="project-name__title">{project.name}</span>
                  </div>
                </td>
                <td>
                  <StatusBadge status={project.stage} />
                </td>
                <td>{project.state}</td>
                <td>{numberFormatter.format(project.totalKwDc)}</td>
                <td>{project.projectType}</td>
                <td>{project.solutionType}</td>
                <td>{project.offtakeType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="projects-table__footer">
        <span>Show <strong>15</strong> of 41</span>
        <div className="table-pagination">
          <button aria-label="First page">«</button>
          <button aria-label="Previous page">‹</button>
          <span className="page-number active">1</span>
          <span className="page-number">2</span>
          <span className="page-number">3</span>
          <button aria-label="Next page">›</button>
          <button aria-label="Last page">»</button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsTable;
