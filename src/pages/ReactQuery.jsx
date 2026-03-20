import { useState } from 'react'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

const fetchPosts = async (page) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }

  return res.json()
}

const createPost = async (payload) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error('Failed to create post')
  }

  return res.json()
}

const querySnippet = `const { data, isLoading, isError, error, isFetching } = useQuery({
  queryKey: ['posts', page],
  queryFn: () => fetchPosts(page),
  staleTime: 10_000,
})`

const mutationSnippet = `const queryClient = useQueryClient()

const addPostMutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  },
})`

export default function ReactQuery() {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page),
    staleTime: 10_000,
  })

  const addPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleCreatePost = () => {
    addPostMutation.mutate({
      title: `Post created at ${new Date().toLocaleTimeString()}`,
      body: 'Created from React Query mutation demo.',
      userId: 1,
    })
  }

  return (
    <div>
      <h2>React Query Demo</h2>

      <section className="section">
        <div className="mini-card">
          <p>
            This page demonstrates <strong>server-state management</strong> with
            React Query.
          </p>
          <ul className="list">
            <li>
              <strong>useQuery:</strong> fetches and caches paginated post data.
            </li>
            <li>
              <strong>queryKey:</strong> includes page number to cache each page
              separately.
            </li>
            <li>
              <strong>useMutation:</strong> sends create-post requests.
            </li>
            <li>
              <strong>invalidateQueries:</strong> refreshes related cached data
              after mutation success.
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h3>Live Query Functionality</h3>
        <div className="mini-card">
          <div className="row">
            <button
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={page === 1 || isFetching}
            >
              Prev
            </button>
            <span>Page: {page}</span>
            <button onClick={() => setPage((value) => value + 1)} disabled={isFetching}>
              Next
            </button>
            <button onClick={() => queryClient.invalidateQueries({ queryKey: ['posts'] })}>
              Manual Refetch
            </button>
          </div>

          <div className="row">
            <button
              onClick={handleCreatePost}
              disabled={addPostMutation.isPending}
            >
              {addPostMutation.isPending ? 'Creating...' : 'Create Post (Mutation)'}
            </button>
            {addPostMutation.isSuccess && <span>Post created successfully.</span>}
            {addPostMutation.isError && <span>Failed to create post.</span>}
          </div>
        </div>

        {isLoading && <p>Loading posts...</p>}
        {isError && <p>Error: {error.message}</p>}
        {!isLoading && !isError && (
          <div className="mini-card" style={{ marginTop: '0.75rem' }}>
            {isFetching && <p>Refreshing data...</p>}
            {data?.map((post) => (
              <article key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h3>Code Snippets</h3>
        <div className="concept-grid">
          <article className="concept-card">
            <h3>Query Example</h3>
            <pre>
              <code>{querySnippet}</code>
            </pre>
          </article>

          <article className="concept-card">
            <h3>Mutation Example</h3>
            <pre>
              <code>{mutationSnippet}</code>
            </pre>
          </article>
        </div>
      </section>
    </div>
  )
}