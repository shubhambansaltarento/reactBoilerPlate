import '../App.css'
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
} from '../components/ConceptDemos'
import {
  ContextDemo,
  LocalStateDemo,
  ReducerDemo,
  ZustandDemo,
} from '../components/StateDemos'

export default function BoilerPlate() {

    const coreConcepts = [
        {
          id: 'jsx-components',
          title: 'JSX + Components',
          description: 'Build UI with reusable function components and JSX syntax.',
          code: `function Welcome({ name }) {
      return <h4>Welcome, {name}</h4>
    }`,
          demo: (
            <PropsDemo
              title="Welcome Component"
              description="Props make components reusable."
            />
          ),
        },
        {
          id: 'props',
          title: 'Props',
          description: 'Pass data from parent to child components.',
          code: `<Card title="React" description="UI library" />`,
          demo: (
            <PropsDemo
              title="Card via Props"
              description="Parent controls the data."
            />
          ),
        },
        {
          id: 'events',
          title: 'Event Handling',
          description: 'Update UI in response to user actions.',
          code: `<button onClick={handleClick}>Click</button>`,
          demo: <EventDemo />,
        },
        {
          id: 'conditional',
          title: 'Conditional Rendering',
          description: 'Render different UI blocks based on conditions.',
          code: `{isLoggedIn ? <Dashboard /> : <Login />}`,
          demo: <ConditionalDemo />,
        },
        {
          id: 'lists-keys',
          title: 'Lists + Keys',
          description: 'Render collections efficiently using stable keys.',
          code: `items.map((item) => <li key={item.id}>{item.name}</li>)`,
          demo: <ListDemo />,
        },
        {
          id: 'forms',
          title: 'Controlled Forms',
          description: 'Keep form values inside React state.',
          code: `const [name, setName] = useState('')`,
          demo: <ControlledFormDemo />,
        },
        {
          id: 'effect',
          title: 'useEffect',
          description: 'Handle side-effects like subscriptions or timers.',
          code: `useEffect(() => {
      const id = setInterval(tick, 1000)
      return () => clearInterval(id)
    }, [])`,
          demo: <EffectDemo />,
        },
        {
          id: 'memo',
          title: 'useMemo',
          description: 'Memoize expensive calculations.',
          code: `const value = useMemo(() => expensiveFn(input), [input])`,
          demo: <MemoDemo />,
        },
        {
          id: 'callback',
          title: 'useCallback',
          description: 'Memoize callback function references.',
          code: `const onSave = useCallback(() => save(data), [data])`,
          demo: <CallbackDemo />,
        },
        {
          id: 'ref',
          title: 'useRef',
          description: 'Access DOM nodes or mutable values without rerenders.',
          code: `const inputRef = useRef(null)`,
          demo: <RefDemo />,
        },
        {
          id: 'custom-hook',
          title: 'Custom Hooks',
          description: 'Extract reusable stateful logic.',
          code: `const [value, setValue] = useLocalStorage('key', initialValue)`,
          demo: <CustomHookDemo />,
        },
        {
          id: 'composition',
          title: 'Composition (children)',
          description: 'Build flexible APIs with children composition.',
          code: `<Layout><Dashboard /></Layout>`,
          demo: <CompositionDemo />,
        },
        {
          id: 'error-boundary',
          title: 'Error Boundaries',
          description: 'Catch runtime render errors in part of the tree.',
          code: `<ErrorBoundary><Widget /></ErrorBoundary>`,
          demo: <ErrorBoundaryDemo />,
        },
      ]
    
      const stateConcepts = [
        {
          id: 'local-state',
          title: 'useState (Local State)',
          description: 'Simple and direct state for single components.',
          code: `const [count, setCount] = useState(0)`,
          demo: <LocalStateDemo />,
        },
        {
          id: 'use-reducer',
          title: 'useReducer',
          description: 'Reducer pattern for more complex state transitions.',
          code: `const [state, dispatch] = useReducer(reducer, initialState)`,
          demo: <ReducerDemo />,
        },
        {
          id: 'context-api',
          title: 'Context API',
          description: 'Share state globally without prop drilling.',
          code: `<CounterContext.Provider value={value}>{children}</CounterContext.Provider>`,
          demo: <ContextDemo />,
        },
        {
          id: 'zustand',
          title: 'Zustand Store',
          description: 'Lightweight external store for app-wide state.',
          code: `const useStore = create((set) => ({ count: 0 }))`,
          demo: <ZustandDemo />,
        },
      ]
    
      const renderConceptCard = (concept) => (
        <article className="concept-card" key={concept.id}>
          <h3>{concept.title}</h3>
          <p>{concept.description}</p>
          <pre>
            <code>{concept.code}</code>
          </pre>
          <div className="demo-box">{concept.demo}</div>
        </article>
      )

    return (    
       <main className="app-shell">
         <header className="header">
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
      </footer>

      </main>
    )
}