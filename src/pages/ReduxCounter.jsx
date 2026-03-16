import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../hooks/useDebounce'
import useThrottle from '../hooks/useThrottle'
import { decrement, increment } from '../redux/counterSlice'

export default function ReduxCounter() {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const [throttleInput, setThrottleInput] = useState('')
  const throttledValue = useThrottle(throttleInput, 500)

  return (
    <section>
      <h2>Redux Counter</h2>
      <p>Current Count: {count}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => dispatch(decrement())}>- Decrement</button>
        <button onClick={() => dispatch(increment())}>+ Increment</button>
      </div>

      <hr style={{ margin: '20px 0' }} />

      <h3>Debounce Example (500ms)</h3>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Type to see debounced value"
      />
      <p>Immediate Value: {search}</p>
      <p>Debounced Value: {debouncedSearch}</p>

      <hr style={{ margin: '20px 0' }} />

      <h3>Throttle Example (500ms)</h3>
      <input
        value={throttleInput}
        onChange={(event) => setThrottleInput(event.target.value)}
        placeholder="Type to see throttled value"
      />
      <p>Immediate Value: {throttleInput}</p>
      <p>Throttled Value: {throttledValue}</p>
    </section>
  )
}
