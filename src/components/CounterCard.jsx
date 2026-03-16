import useCounter from '../hooks/useCounter'

export default function CounterCard() {
  const { count, inc, dec } = useCounter(5)
  return (
    <div>
      <h3>Counter: {count}</h3>
      <button onClick={dec}>-</button>
      <button onClick={inc}>+</button>
    </div>
  )
}