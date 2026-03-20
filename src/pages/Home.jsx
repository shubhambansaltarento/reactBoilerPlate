import { useState } from 'react'
import Editor from '@monaco-editor/react'

const starterSnippets = {
  javascript: `// JavaScript runner supports console.log output
const numbers = [1, 2, 3, 4]
const doubled = numbers.map((n) => n * 2)

console.log('Doubled:', doubled)
console.log('Sum:', doubled.reduce((acc, n) => acc + n, 0))`,
  typescript: `type User = {
  id: number
  name: string
}

const users: User[] = [
  { id: 1, name: 'Alex' },
  { id: 2, name: 'Sam' },
]

users.forEach((user) => {
  console.log(user.name)
})`,
  json: `{
  "name": "React Boilerplate",
  "features": ["Routing", "Redux", "Zustand", "Monaco"],
  "version": 1
}`,
  html: `<!doctype html>
<html>
  <head>
    <title>Practice</title>
  </head>
  <body>
    <h1>Hello from Monaco</h1>
  </body>
</html>`,
  css: `body {
  font-family: sans-serif;
  margin: 0;
}

h1 {
  color: #2563eb;
}`,
}

export default function Home() {
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState(starterSnippets.javascript)
  const [theme, setTheme] = useState('vs-dark')
  const [output, setOutput] = useState('Click "Run JavaScript" to execute code.')
  const [runError, setRunError] = useState('')

  const editorThemes = ['vs-dark', 'vs', 'hc-black']
  const editorLanguages = ['javascript', 'typescript', 'json', 'html', 'css']

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage)
    setCode(starterSnippets[nextLanguage])
    setRunError('')
    setOutput(
      nextLanguage === 'javascript'
        ? 'Click "Run JavaScript" to execute code.'
        : `Switched to ${nextLanguage}. JavaScript executor works only for javascript mode.`,
    )
  }

  const runJavaScript = () => {
    if (language !== 'javascript') {
      setRunError('Execution is available only when language is set to javascript.')
      return
    }

    const logs = []
    const customConsole = {
      log: (...args) => {
        logs.push(args.map((item) => String(item)).join(' '))
      },
    }

    try {
      setRunError('')
      const executor = new Function('console', code)
      executor(customConsole)
      setOutput(logs.length ? logs.join('\n') : 'Code executed with no console output.')
    } catch (error) {
      setOutput('Execution failed.')
      setRunError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

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
          <div className="row" style={{ flexWrap: 'wrap' }}>
            <label className="row">
              <strong>Language:</strong>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
              >
                {editorLanguages.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="row">
              <strong>Theme:</strong>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
              >
                {editorThemes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <button onClick={runJavaScript} disabled={language !== 'javascript'}>
              Run JavaScript
            </button>
          </div>

          <p style={{ marginTop: '0.75rem', color: '#6b7280', fontSize: '0.9em' }}>
            Edit code in multiple languages. JavaScript mode includes a basic
            executor that displays <code>console.log</code> output.
          </p>
        </div>

        <div className="editor-container" style={{ marginTop: '1rem' }}>
          <Editor
            height="500px"
            language={language}
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
            <strong>Output Console:</strong>
          </p>
          <pre>
            <code>{output}</code>
          </pre>
          {runError && (
            <p style={{ color: '#dc2626' }}>
              <strong>Error:</strong> {runError}
            </p>
          )}
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