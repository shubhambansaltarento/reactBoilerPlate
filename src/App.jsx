import {
  CallbackDemo,
  CompositionDemo,
  ConditionalDemo,
  ControlledFormDemo,
  CustomHookDemo,
  EffectDemo,
  ErrorBoundaryDemo,
  EventDemo,
  ListDemo,
  MemoDemo,
  PropsDemo,
  RefDemo,
} from './components/ConceptDemos'
import {
  ContextDemo,
  LocalStateDemo,
  ReducerDemo,
  ZustandDemo,
} from './components/StateDemos'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import BoilerPlate from './pages/BoilerPlate';
import TodoBox from './pages/TodoBox.jsx';
import ReduxCounter from './pages/ReduxCounter.jsx';


function App() {

  return (
    <main className="app-shell">
        <nav style={{ display: 'flex', gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/boilerplate">BoilerPlate</Link>
        <Link to="/todo">TodoBox</Link>
        <Link to="/redux-counter">ReduxCounter</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/boilerplate" element={<BoilerPlate />} />
        <Route path="/todo" element={<TodoBox />} />
        <Route path="/redux-counter" element={<ReduxCounter />} />
      </Routes>
      {/* <header className="header">
        <h1>React Boiler Plate</h1>
        <p>
          Ready-to-use examples for core React concepts and state management
          patterns.
        </p>
      </header>

      <section className="section">
        <h2>Core React Concepts</h2>
        <div className="concept-grid">{coreConcepts.map(renderConceptCard)}</div>
      </section>

      <section className="section">
        <h2>State Management Concepts</h2>
        <div className="concept-grid">{stateConcepts.map(renderConceptCard)}</div>
      </section>

      <footer className="footer">
        <p>
          Start from this boilerplate and expand modules based on your project
          needs.
        </p>
      </footer> */}
    </main>
  )
}

export default App
