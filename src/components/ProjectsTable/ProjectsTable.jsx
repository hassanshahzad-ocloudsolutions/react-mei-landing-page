import StatusBadge from '../StatusBadge/StatusBadge';
import './ProjectsTable.css';
import React, { useState, useEffect, useMemo } from 'react';

const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const ProjectsTable = ({ data }) => {
  // pagination state
  const [page, setPage] = useState(1);
  const pageSize = 15; // fixed as requested

  // reset page when incoming data changes (e.g., filters applied)
  useEffect(() => {
    setPage(1);
  }, [data]);

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page]);

  const goFirst = () => setPage(1);
  const goLast = () => setPage(totalPages);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

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
            {pageItems.map((project) => (
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
        <span>Showing <strong>{pageItems.length}</strong> of {total}</span>
        <div className="table-pagination">
          <button aria-label="First page" onClick={goFirst} disabled={page === 1}>«</button>
          <button aria-label="Previous page" onClick={goPrev} disabled={page === 1}>‹</button>

          {/* numeric pager */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`page-number ${p === page ? 'active' : ''}`}
              onClick={() => setPage(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          ))}

          <button aria-label="Next page" onClick={goNext} disabled={page === totalPages}>›</button>
          <button aria-label="Last page" onClick={goLast} disabled={page === totalPages}>»</button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsTable;
