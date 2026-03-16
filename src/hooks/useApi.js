import { useCallback, useEffect, useState } from 'react'

export default function useApi(apiFn, initialData = null) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await apiFn()
      setData(result)
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiFn])

  useEffect(() => {
    fetchData().catch(() => {})
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
