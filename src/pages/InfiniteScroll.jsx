import { useEffect, useRef, useState } from 'react'
import { getPosts } from '../services/postService'

export default function InfiniteScroll() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const loadMoreRef = useRef(null)
  const limit = 10

  useEffect(() => {
    let ignore = false

    async function loadPosts() {
      setLoading(true)
      setError(null)

      try {
        const nextPosts = await getPosts(page, limit)

        if (ignore) {
          return
        }

        setPosts((prevPosts) =>
          page === 1 ? nextPosts : [...prevPosts, ...nextPosts],
        )
        setHasMore(nextPosts.length === limit)
      } catch (err) {
        if (!ignore) {
          setError(err)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    if (hasMore || page === 1) {
      loadPosts()
    }

    return () => {
      ignore = true
    }
  }, [page, hasMore])

  useEffect(() => {
    if (!loadMoreRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (entry.isIntersecting && hasMore && !loading && !error) {
          setPage((prevPage) => prevPage + 1)
        }
      },
      { threshold: 1 },
    )

    observer.observe(loadMoreRef.current)

    return () => observer.disconnect()
  }, [hasMore, loading, error])

  const handleRetry = () => {
    setError(null)
    setPosts([])
    setHasMore(true)
    setPage(1)
  }

  if (loading && posts.length === 0) {
    return <p>Loading posts...</p>
  }

  if (error && posts.length === 0) {
    return (
      <div>
        <p>Failed to load posts.</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Infinite Scroll Posts Demo</h2>

      <section className="section">
        <div className="mini-card">
          <p>
            This example loads posts page-by-page and automatically fetches the
            next page when you scroll to the bottom.
          </p>
          <ul className="list">
            <li>
              <strong>State used:</strong> <code>posts</code>, <code>page</code>,{' '}
              <code>loading</code>, <code>error</code>, <code>hasMore</code>
            </li>
            <li>
              <strong>Data fetch flow:</strong> when <code>page</code> changes,
              <code> getPosts(page, limit)</code> runs and appends new results.
            </li>
            <li>
              <strong>Observer trigger:</strong> an <code>IntersectionObserver</code>{' '}
              watches a tiny sentinel div at the bottom.
            </li>
            <li>
              <strong>Safety checks:</strong> next page loads only when sentinel
              is visible, not already loading, no error exists, and more data is
              expected.
            </li>
            <li>
              <strong>End condition:</strong> if returned items are fewer than
              <code> limit</code>, then <code>hasMore</code> becomes false.
            </li>
          </ul>
        </div>

        <pre>
          <code>{`const observer = new IntersectionObserver((entries) => {
  const [entry] = entries

  if (entry.isIntersecting && hasMore && !loading && !error) {
    setPage((prevPage) => prevPage + 1)
  }
})`}</code>
        </pre>

        {posts.map((p) => (
          <p key={p.id}>{p.title}</p>
        ))}

        {error && (
          <div>
            <p>Could not load more posts.</p>
            <button onClick={handleRetry}>Retry from start</button>
          </div>
        )}

        {loading && posts.length > 0 && <p>Loading more...</p>}

        {!hasMore && !error && posts.length > 0 && <p>No more posts.</p>}

        <div ref={loadMoreRef} style={{ height: 1 }} />
      </section>
    </div>
  )
}
