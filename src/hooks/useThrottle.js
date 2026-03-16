import { useEffect, useRef, useState } from 'react'

export default function useThrottle(value, delay = 500) {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastExecuted = useRef(null)
  const timeoutId = useRef(null)

  useEffect(() => {
    if (lastExecuted.current === null) {
      lastExecuted.current = Date.now()
      return
    }

    const remaining = delay - (Date.now() - lastExecuted.current)

    if (remaining <= 0) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
        timeoutId.current = null
      }
      timeoutId.current = setTimeout(() => {
        setThrottledValue(value)
        lastExecuted.current = Date.now()
        timeoutId.current = null
      }, 0)
      return
    }

    timeoutId.current = setTimeout(() => {
      setThrottledValue(value)
      lastExecuted.current = Date.now()
      timeoutId.current = null
    }, remaining)

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
        timeoutId.current = null
      }
    }
  }, [value, delay])

  return throttledValue
}
