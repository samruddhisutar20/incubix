import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          {/* Content Wrapper with proper padding and max-width */}
          <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {/* Centered content container */}
            <div className="mx-auto w-full max-w-7xl animate-in fade-in duration-300">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
