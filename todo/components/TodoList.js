'use client'
import { useState, useEffect } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/lib/api'
import TodoItem from '@/components/TodoItem'

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos()
        setTodos(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTodos()
  }, [])

  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        const task = {
          title: newTask,
          completed: false,
          userId: 1 
        }
        const createdTask = await createTodo(task)
        setTodos([createdTask, ...todos])
        setNewTask('')
      } catch (err) {
        setError(err.message)
      }
    }
  }

  const handleUpdate = async (id, updates) => {
    try {
      const updatedTodo = await updateTodo(id, updates)
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="p-4 text-center">Loading...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/10 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Todo List</h2>
        
        
        <div className="flex mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="+ New task"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="bg-sky-950 hover:bg-sky-900 text-white px-4 py-2 rounded-r-lg transition-slow"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  )
}