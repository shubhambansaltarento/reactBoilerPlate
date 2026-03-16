import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function PropsDemo({ title, description }) {
  return (
    <div className="mini-card">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  )
}

export function EventDemo() {
  const [clicks, setClicks] = useState(0)

  return (
    <div className="mini-card">
      <button onClick={() => setClicks((value) => value + 1)}>Click me</button>
      <p>Total clicks: {clicks}</p>
    </div>
  )
}

export function ConditionalDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="mini-card">
      <button onClick={() => setIsLoggedIn((value) => !value)}>
        Toggle login
      </button>
      <p>{isLoggedIn ? 'Welcome back 👋' : 'Please log in'}</p>
    </div>
  )
}

export function ListDemo() {
  const frameworks = ['React', 'Vue', 'Angular', 'Svelte']

  return (
    <ul className="list">
      {frameworks.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function ControlledFormDemo() {
  const [name, setName] = useState('')

  return (
    <div className="mini-card">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Type your name"
      />
      <p>Hello, {name || 'Developer'}!</p>
    </div>
  )
}

export function EffectDemo() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((value) => value + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <p>Component mounted {seconds}s ago.</p>
}

export function MemoDemo() {
  const [number, setNumber] = useState(1)

  const factorial = useMemo(() => {
    const calc = (n) => (n <= 1 ? 1 : n * calc(n - 1))
    return calc(number)
  }, [number])

  return (
    <div className="mini-card">
      <input
        type="number"
        min="1"
        max="8"
        value={number}
        onChange={(event) => setNumber(Number(event.target.value || 1))}
      />
      <p>Factorial: {factorial}</p>
    </div>
  )
}

export function CallbackDemo() {
  const [count, setCount] = useState(0)

  const handleIncrement = useCallback(() => {
    setCount((value) => value + 1)
  }, [])

  return (
    <div className="mini-card">
      <button onClick={handleIncrement}>Increment</button>
      <p>Count: {count}</p>
    </div>
  )
}

export function RefDemo() {
  const inputRef = useRef(null)

  return (
    <div className="mini-card">
      <input ref={inputRef} placeholder="Press focus button" />
      <button onClick={() => inputRef.current?.focus()}>Focus input</button>
    </div>
  )
}

export function CustomHookDemo() {
  const [theme, setTheme] = useLocalStorage('rbp-theme', 'light')

  return (
    <div className="mini-card">
      <button onClick={() => setTheme((value) => (value === 'light' ? 'dark' : 'light'))}>
        Toggle theme
      </button>
      <p>Saved preference: {theme}</p>
    </div>
  )
}

function Child({ children }) {
  return <div className="mini-card">{children}</div>
}

export function CompositionDemo() {
  return (
    <Child>
      <h4>Reusable layout</h4>
      <p>This content is passed as children.</p>
    </Child>
  )
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong in child component.</p>
    }

    return this.props.children
  }
}

function CrashButton() {
  const [crash, setCrash] = useState(false)

  if (crash) {
    throw new Error('Crashed intentionally')
  }

  return <button onClick={() => setCrash(true)}>Trigger error boundary</button>
}

export function ErrorBoundaryDemo() {
  return (
    <ErrorBoundary>
      <CrashButton />
    </ErrorBoundary>
  )
}
