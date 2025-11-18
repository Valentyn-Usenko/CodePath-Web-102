import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CreateCrewmate from './components/CreateCrewmate'
import CrewList from './components/CrewList'
import CrewDetail from './components/CrewDetail'
import EditCrewmate from './components/EditCrewmate'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div id="app-root">
        <header className="app-header">
          <h1>Crewmate Team Builder</h1>
          <nav>
            <Link to="/">All Crewmates</Link>
            <Link to="/create">Create Crewmate</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<CrewList />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/crewmate/:id" element={<CrewDetail />} />
            <Route path="/crewmate/:id/edit" element={<EditCrewmate />} />
          </Routes>
        </main>

        <footer className="app-footer"></footer>
      </div>
    </BrowserRouter>
  )
}

export default App
