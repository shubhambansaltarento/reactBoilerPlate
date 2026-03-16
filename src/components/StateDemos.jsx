import { createContext, useContext, useReducer, useState } from 'react'
import { useCounterStore } from '../store/counterStore'

export function LocalStateDemo() {
  const [count, setCount] = useState(0)

  return (
    <div className="mini-card">
      <div className="row">
        <button onClick={() => setCount((value) => value - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount((value) => value + 1)}>+</button>
      </div>
      <p>Best for isolated component state.</p>
    </div>
  )
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}

export function ReducerDemo() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div className="mini-card">
      <div className="row">
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <span>{state.count}</span>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      </div>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <p>Great for predictable complex updates.</p>
    </div>
  )
}

const CounterContext = createContext(null)

function CounterProvider({ children }) {
  const [count, setCount] = useState(0)

  const value = {
    count,
    increment: () => setCount((state) => state + 1),
  }

  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
}

function CounterViewer() {
  const { count } = useContext(CounterContext)
  return <p>Context count: {count}</p>
}

function CounterActions() {
  const { increment } = useContext(CounterContext)
  return <button onClick={increment}>Increment from nested component</button>
}

export function ContextDemo() {
  return (
    <CounterProvider>
      <div className="mini-card">
        <CounterViewer />
        <CounterActions />
      </div>
    </CounterProvider>
  )
}

export function ZustandDemo() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="mini-card">
      <div className="row">
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
      <button onClick={reset}>Reset</button>
      <p>External store shared without prop drilling.</p>
    </div>
  )
}
