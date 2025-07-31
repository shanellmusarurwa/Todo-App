'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TodoForm({ initialData = { title: '', completed: false }, isEdit = false }) {
  const [todo, setTodo] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setTodo({
      ...todo,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/todos` : '/api/todos'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isEdit ? { id: todo.id, ...todo } : todo),
      })

      if (!response.ok) throw new Error('Failed to save todo')
      
      router.push('/todos')
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          {isEdit ? 'Edit Task' : 'Create New Task'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={todo.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter task description"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={todo.completed}
              onChange={handleChange}
              className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
            />
            <label htmlFor="completed" className="ml-2 text-sm text-gray-700">
              Mark as completed
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => router.push('/todos')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-slow"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white transition-slow ${
                loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}