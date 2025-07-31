'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TodoForm from '@/components/TodoForm';
import { getTodos } from '@/lib/api';

export default function EditTodoPage() {
  const params = useParams();
  const router = useRouter();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      const todos = await getTodos();
      const foundTodo = todos.find(t => t.id.toString() === params.id);
      if (!foundTodo) router.push('/todos');
      setTodo(foundTodo);
    };
    fetchTodo();
  }, [params.id, router]);

  if (!todo) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <TodoForm initialData={todo} isEdit={true} />
    </div>
  );
}