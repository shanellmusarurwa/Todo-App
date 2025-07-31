'use client'
import { useParams } from 'next/navigation'
import { getTodoById } from '@/lib/api'
import TodoForm from '@/components/TodoForm'

export default async function EditTodoPage() {
  const params = useParams()
  const todo = await getTodoById(Number(params.id))

  if (!todo) return <div>Todo not found</div>

  return <TodoForm initialData={todo} isEdit={true} />
}