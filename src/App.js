import Sidebar from './components/Sidebar/Sidebar';
import ProjectsHeader from './components/ProjectsHeader/ProjectsHeader';
import ProjectsTable from './components/ProjectsTable/ProjectsTable';
import Footer from './components/Footer/Footer';
import { defaultFilters, projects } from './data/projects';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-panel">
        <ProjectsHeader filters={defaultFilters} />
        <ProjectsTable data={projects} />
        <Footer />
      </main>
    </div>
  );
}

export default App;
