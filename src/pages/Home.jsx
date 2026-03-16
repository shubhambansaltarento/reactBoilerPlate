import { useEffect, useRef, useState } from 'react'
import { getPosts } from '../services/postService'

export default function Home() {
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
      <h2>Home Page</h2>
      {posts.map((p) => <p key={p.id}>{p.title}</p>)}

      {error && (
        <div>
          <p>Could not load more posts.</p>
          <button onClick={handleRetry}>Retry from start</button>
        </div>
      )}

      {loading && posts.length > 0 && <p>Loading more...</p>}

      {!hasMore && !error && posts.length > 0 && <p>No more posts.</p>}

      <div ref={loadMoreRef} style={{ height: 1 }} />
    </div>
  )
}