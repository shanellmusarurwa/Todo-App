'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import TodoForm from '@/components/TodoForm'
import { getTodoById } from '@/lib/api'

export default function EditTodoPage() {
  const params = useParams()
  const [todo, setTodo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await getTodoById(Number(params.id))
        setTodo(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTodo()
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!todo) return <div>Todo not found</div>

  return <TodoForm initialData={todo} isEdit={true} />
}