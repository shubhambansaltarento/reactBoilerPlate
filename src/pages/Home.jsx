import { useState } from 'react'
import Editor from '@monaco-editor/react'

export default function Home() {
  const [code, setCode] = useState(`// Practice React concepts here!
// Example: Write a simple component

function Counter() {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}`)

  const [theme, setTheme] = useState('vs-dark')

  const editorThemes = ['vs-dark', 'vs', 'hc-black']

  return (
    <div>
      <h2>Welcome to React Boilerplate</h2>

      <section className="section">
        <h3>Quick Learning Guide</h3>
        <div className="mini-card">
          <p>
            This boilerplate covers essential React patterns. Use the tabs above
            to explore different concepts and patterns.
          </p>
          <ul className="list">
            <li>
              <strong>Hooks Deep Dive:</strong> Learn useRef, useMemo, and
              useCallback with interactive demos.
            </li>
            <li>
              <strong>Infinite Scroll:</strong> See pagination and
              IntersectionObserver in action.
            </li>
            <li>
              <strong>BoilerPlate:</strong> Comprehensive overview of all core
              React concepts.
            </li>
            <li>
              <strong>TodoBox:</strong> State management example with Zustand.
            </li>
            <li>
              <strong>Redux Counter:</strong> Redux Toolkit example.
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h3>Code Practice Area</h3>
        <div className="mini-card">
          <label className="row">
            <strong>Theme:</strong>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
            >
              {editorThemes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <p style={{ marginTop: '0.75rem', color: '#6b7280', fontSize: '0.9em' }}>
            Edit the code below to practice React. This is a sandbox for learning
            and experimenting.
          </p>
        </div>

        <div className="editor-container" style={{ marginTop: '1rem' }}>
          <Editor
            height="500px"
            language="javascript"
            theme={theme}
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
              padding: { top: 16 },
            }}
          />
        </div>

        <div className="mini-card" style={{ marginTop: '1rem' }}>
          <p>
            <strong>Tips:</strong>
          </p>
          <ul className="list">
            <li>Write React components and experiment with hooks.</li>
            <li>Use Ctrl+S (Cmd+S on Mac) to auto-save.</li>
            <li>Explore syntax highlighting and code suggestions.</li>
            <li>Visit other pages to see working examples of these patterns.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}