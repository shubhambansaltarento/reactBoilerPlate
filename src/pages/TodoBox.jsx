import { useState } from 'react'
import { useTodoStore } from '../store/useToDoStore'

export default function TodoBox() {
  const [text, setText] = useState('')
  const { todos, addTodo } = useTodoStore()
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => { addTodo(text); setText('') }}>Add</button>
      {todos.map((t) => <p key={t.id}>{t.text}</p>)}
    </div>
  )
}