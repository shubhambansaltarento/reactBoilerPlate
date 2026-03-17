import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

const productCatalog = [
  { id: 1, name: 'Keyboard', price: 69 },
  { id: 2, name: 'Mouse', price: 39 },
  { id: 3, name: 'Monitor', price: 249 },
  { id: 4, name: 'Desk Lamp', price: 29 },
  { id: 5, name: 'USB-C Hub', price: 59 },
  { id: 6, name: 'Webcam', price: 89 },
]

const refCodeExample = `function RefExample() {
  const inputRef = useRef(null)

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>
        Focus input
      </button>
    </>
  )
}`

const memoCodeExample = `const visibleItems = useMemo(() => {
  return items
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.price - b.price)
}, [items, search])`

const callbackCodeExample = `const onAdd = useCallback(() => {
  setCount((prev) => prev + 1)
}, [])

return <ChildButton onAdd={onAdd} />`

function UseRefDeepDive() {
  const inputRef = useRef(null)
  const previousValueRef = useRef('')
  const hiddenCounterRef = useRef(0)
  const [text, setText] = useState('')
  const [previousText, setPreviousText] = useState('')
  const [revealedCounter, setRevealedCounter] = useState(0)

  useEffect(() => {
    setPreviousText(previousValueRef.current)
    previousValueRef.current = text
  }, [text])

  return (
    <article className="deep-dive-card">
      <h3>useRef: stable mutable value + direct DOM access</h3>
      <p>
        <strong>What it does:</strong> stores a value in <code>.current</code>{' '}
        that persists between renders. Updating it does <strong>not</strong>
        trigger a re-render.
      </p>

      <div className="mini-card">
        <input
          ref={inputRef}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type and then click Focus"
        />
        <div className="row">
          <button onClick={() => inputRef.current?.focus()}>Focus input</button>
          <button onClick={() => setText('')}>Clear</button>
        </div>
        <p>Previous value tracked in ref: {previousText || '—'}</p>
        <div className="row">
          <button onClick={() => (hiddenCounterRef.current += 1)}>
            Increment hidden ref (no render)
          </button>
          <button onClick={() => setRevealedCounter(hiddenCounterRef.current)}>
            Reveal hidden value
          </button>
        </div>
        <p>Revealed hidden ref value: {revealedCounter}</p>
      </div>

      <div className="deep-dive-notes">
        <p>
          <strong>Use when:</strong> you need a mutable container for values like
          DOM nodes, timers, previous values, or instance-like variables.
        </p>
      </div>

      <pre>
        <code>{refCodeExample}</code>
      </pre>
    </article>
  )
}

function UseMemoDeepDive() {
  const [query, setQuery] = useState('')
  const [sortByPrice, setSortByPrice] = useState(true)
  const [theme, setTheme] = useState('light')
  const [computeCount, setComputeCount] = useState(1)

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
    setComputeCount((value) => value + 1)
  }

  const handleSortChange = (event) => {
    setSortByPrice(event.target.checked)
    setComputeCount((value) => value + 1)
  }

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = productCatalog.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery),
    )

    if (!sortByPrice) {
      return filtered
    }

    return [...filtered].sort((a, b) => a.price - b.price)
  }, [query, sortByPrice])

  return (
    <article className="deep-dive-card">
      <h3>useMemo: memoize expensive derived values</h3>
      <p>
        <strong>What it does:</strong> caches the result of a computation and
        recalculates only when dependencies change.
      </p>

      <div className="mini-card">
        <input
          value={query}
          onChange={handleQueryChange}
          placeholder="Filter products"
        />
        <label className="row">
          <input
            type="checkbox"
            checked={sortByPrice}
            onChange={handleSortChange}
          />
          Sort by price
        </label>
        <button
          onClick={() =>
            setTheme((value) => (value === 'light' ? 'dark' : 'light'))
          }
        >
          Toggle unrelated theme: {theme}
        </button>
        <p>Memo computation count: {computeCount}</p>
        <ul className="list">
          {visibleProducts.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>

      <div className="deep-dive-notes">
        <p>
          <strong>Observe:</strong> toggling theme re-renders the component but
          does not increase computation count, because dependencies are unchanged.
        </p>
      </div>

      <pre>
        <code>{memoCodeExample}</code>
      </pre>
    </article>
  )
}

const RenderAwareButton = memo(function RenderAwareButton({ label, onAdd }) {
  return (
    <div className="mini-card">
      <button onClick={onAdd}>{label}</button>
      <p>Memoized child receives callback and re-renders when props change.</p>
    </div>
  )
})

function UseCallbackDeepDive() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('light')
  const directHandlerRef = useRef(null)
  const memoizedHandlerRef = useRef(null)
  const [identityStats, setIdentityStats] = useState({ direct: 1, memoized: 1 })

  const directHandler = () => {
    setCount((value) => value + 1)
  }

  const memoizedHandler = useCallback(() => {
    setCount((value) => value + 1)
  }, [])

  const handleThemeToggle = () => {
    const directChanged = directHandlerRef.current !== directHandler
    const memoizedChanged = memoizedHandlerRef.current !== memoizedHandler

    directHandlerRef.current = directHandler
    memoizedHandlerRef.current = memoizedHandler

    setIdentityStats((value) => ({
      direct: value.direct + (directChanged ? 1 : 0),
      memoized: value.memoized + (memoizedChanged ? 1 : 0),
    }))

    setTheme((value) => (value === 'light' ? 'dark' : 'light'))
  }

  return (
    <article className="deep-dive-card">
      <h3>useCallback: memoize function identity</h3>
      <p>
        <strong>What it does:</strong> returns the same function reference until
        dependencies change, which helps memoized children skip unnecessary
        renders.
      </p>

      <div className="mini-card">
        <p>Parent count: {count}</p>
        <button onClick={handleThemeToggle}>
          Toggle parent theme: {theme}
        </button>
        <p>
          Callback identity changes after toggles — without useCallback:{' '}
          {identityStats.direct}, with useCallback: {identityStats.memoized}
        </p>
      </div>

      <div className="deep-dive-grid">
        <RenderAwareButton label="Without useCallback" onAdd={directHandler} />
        <RenderAwareButton label="With useCallback" onAdd={memoizedHandler} />
      </div>

      <div className="deep-dive-notes">
        <p>
          <strong>Observe:</strong> the first child re-renders whenever the
          parent re-renders because a new function is created. The memoized
          callback keeps identity stable.
        </p>
      </div>

      <pre>
        <code>{callbackCodeExample}</code>
      </pre>
    </article>
  )
}

export default function HookDeepDiveDemos() {
  return (
    <section className="section">
      <h2>Hook Deep Dive: useRef, useMemo, useCallback</h2>
      <p>
        Each example below is interactive so you can directly observe render
        behavior, memoization, and reference stability.
      </p>
      <div className="deep-dive-stack">
        <UseRefDeepDive />
        <UseMemoDeepDive />
        <UseCallbackDeepDive />
      </div>
    </section>
  )
}