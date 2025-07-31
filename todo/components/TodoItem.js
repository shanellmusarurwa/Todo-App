'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function TodoItem({ todo, onDelete, onUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title || '')

  const handleToggle = async () => {
    try {
      setIsUpdating(true)
      await onUpdate(todo.id, { completed: !todo.completed })
    } catch (error) {
      console.error('Failed to update todo:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await onDelete(todo.id)
    } catch (error) {
      console.error('Failed to delete todo:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsUpdating(true)
      await onUpdate(todo.id, { title: editedTitle })
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update todo:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className={`flex items-center bg-white/90 p-4 rounded-lg shadow transition-slow hover:shadow-md ${
      todo.completed ? 'opacity-80' : ''
    }`}>
      
      <input
        type="checkbox"
        checked={todo.completed || false}
        onChange={handleToggle}
        disabled={isUpdating || isDeleting}
        className={`h-5 w-5 rounded mr-4 focus:ring-[#195b75] cursor-pointer ${
          todo.completed ? 'accent-[#195b75] border-[#195b75]' : 'border-gray-300'
        }`}
        style={{
          
          color: '#195b75'
        }}
      />
      
      <div className="flex-grow min-w-0">
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 mr-2"
              autoFocus
            />
            <button
              type="submit"
              disabled={isUpdating}
              className="text-green-600 hover:text-green-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-700 ml-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        ) : (
          <div className="flex items-center">
            <Link 
              href={`/todos/${todo.id}`}
              className={`block truncate relative ${
                todo.completed 
                  ? 'text-gray-400 after:absolute after:content-[""] after:left-0 after:top-1/2 after:w-full after:h-0.5 after:bg-[#923336]'
                  : 'text-gray-700'
              } hover:text-blue-500`}
              title={todo.title}
            >
              {todo.title}
            </Link>
          </div>
        )}
      </div>
      
      <div className="flex space-x-2 ml-2">
        {!isEditing && (
          <button
            onClick={() => {
              setEditedTitle(todo.title)
              setIsEditing(true)
            }}
            disabled={isUpdating || isDeleting}
            className="text-yellow-500 hover:text-yellow-600 transition-slow p-1 disabled:opacity-50"
            aria-label="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        )}
        <button 
          onClick={handleDelete}
          disabled={isUpdating || isDeleting || isEditing}
          className="text-red-500 hover:text-red-600 transition-slow p-1 disabled:opacity-50"
          aria-label="Delete"
        >
          {isDeleting ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}