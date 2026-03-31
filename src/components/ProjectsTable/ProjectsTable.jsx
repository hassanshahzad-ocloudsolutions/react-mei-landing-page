
import StatusBadge from '../StatusBadge/StatusBadge';
import './ProjectsTable.css';
import { useState, useEffect, useMemo } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

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

  // cumulative count shown to the user (e.g. page 1 -> 15 of 115, page 2 -> 30 of 115)
  const shownCount = Math.min(page * pageSize, total);

  const [headerCarets, setHeaderCarets] = useState({
    projectName: false,
    stage: false,
    state: false,
    totalKwDc: false,
    projectType: false,
    solutionType: false,
    offtakeType: false
  });

  const toggleHeaderCaret = (key) => {
    setHeaderCarets((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const goFirst = () => setPage(1);
  const goLast = () => setPage(totalPages);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <section className="projects-card">
      <div className="projects-card__surface">
        <table>
          <thead>
            <tr className="project-table-row">
              <th>
                <div className="projects-th">
                  <span>Project Name</span>
                  <button
                    type="button"
                    className="projects-th__icon-btn"
                    onClick={() => toggleHeaderCaret('projectName')}
                    aria-pressed={headerCarets.projectName}
                  >
                    {headerCarets.projectName ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
              </th>
              <th>
                <div className="projects-th">
                  <span>Stage</span>
                  <button
                    type="button"
                    className="projects-th__icon-btn"
                    onClick={() => toggleHeaderCaret('stage')}
                    aria-pressed={headerCarets.stage}
                  >
                    {headerCarets.stage ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
              </th>
              <th>
                <div className="projects-th">
                  <span>State</span>
                  <button
                    type="button"
                    className="projects-th__icon-btn"
                    onClick={() => toggleHeaderCaret('state')}
                    aria-pressed={headerCarets.state}
                  >
                    {headerCarets.state ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
              </th>
              <th>
                <div className="projects-th">
                  <span>Total kW DC</span>
                  <button
                    type="button"
                    className="projects-th__icon-btn"
                    onClick={() => toggleHeaderCaret('totalKwDc')}
                    aria-pressed={headerCarets.totalKwDc}
                  >
                    {headerCarets.totalKwDc ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
              </th>
              <th>
                <div className="projects-th">
                  <span>Project Type</span>
                  <button
                    type="button"
                    className="projects-th__icon-btn"
                    onClick={() => toggleHeaderCaret('projectType')}
                    aria-pressed={headerCarets.projectType}
                  >
                    {headerCarets.projectType ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
              </th>
              <th>
                <div className="projects-th">
                  <span>Solution Type</span>
                  <button
                    type="button"
                    className="projects-th__icon-btn"
                    onClick={() => toggleHeaderCaret('solutionType')}
                    aria-pressed={headerCarets.solutionType}
                  >
                    {headerCarets.solutionType ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
              </th>
              <th>
                <div className="projects-th">
                  <span>Offtake Type</span>
                  <button
                    type="button"
                    className="projects-th__icon-btn"
                    onClick={() => toggleHeaderCaret('offtakeType')}
                    aria-pressed={headerCarets.offtakeType}
                  >
                    {headerCarets.offtakeType ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((project) => (
              <tr key={project.id} className="table-row">
                <td>{project.name}</td>
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
        <span>Show 
          <span className='number_arrow_container'> {shownCount} <BsFillCaretDownFill /></span>
           of {total}</span>
        <div className="table-pagination">
          <button className="table-pagination__arrows" aria-label="First page" onClick={goFirst} disabled={page === 1}>«</button>
          <button className="table-pagination__arrows" aria-label="Previous page" onClick={goPrev} disabled={page === 1}>‹</button>

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

          <button className="table-pagination__arrows" aria-label="Next page" onClick={goNext} disabled={page === totalPages}>›</button>
          <button className="table-pagination__arrows" aria-label="Last page" onClick={goLast} disabled={page === totalPages}>»</button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsTable;
