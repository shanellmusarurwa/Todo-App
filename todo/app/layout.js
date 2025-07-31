'use client'
import { useEffect } from 'react'
import './globals.css'

export default function RootLayout({ children }) {
  useEffect(() => {
    // Set background image client-side only
    document.body.style.backgroundImage = "url('/starry.jpeg')"
    document.body.className = "min-h-screen bg-gray-900 bg-cover bg-center"
    
    // Remove extension-added attributes
    document.body.removeAttribute('cz-shortcut-listen')
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="min-h-screen  bg-black/20">
          {/* Main Layout Container */}
          <div className="min-h-screen flex flex-col">
            {/* Header with glass effect */}
            <header className="backdrop-blur-md bg-white/80 shadow-sm">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
                <p className="text-sm text-gray-600">
                  Manage your tasks efficiently
                </p>
              </div>
            </header>

            {/* Centered Main Content */}
            <main className="flex-grow flex items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-md">
                {children}
              </div>
            </main>

            {/* Footer with glass effect */}
            <footer className="backdrop-blur-md bg-white/80 border-t border-gray-200/50 py-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
                <p>© {new Date().getFullYear()} Todo App. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}