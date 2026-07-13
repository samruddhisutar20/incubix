import React, { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useAuthStore } from '@/store/authStore'
import { Sun, Moon, Menu, LogOut, User, ChevronDown, Command } from 'lucide-react'
import { Button } from '../ui/Button'

interface HeaderProps {
  onToggleSidebar: () => void
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex h-[72px] w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-6 lg:px-8">
      {/* Left side: Hamburger on mobile, page title / branding */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5"
        >
          <Menu size={16} />
        </Button>
        <div className="hidden sm:block">
          <p className="text-xs font-medium text-slate-400">Workspace</p>
          <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight text-slate-900 dark:text-white">
            {user?.startupName || 'Incubix'}
            <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">{user?.role}</span>
          </h2>
        </div>
      </div>

      {/* Right side: Tools & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-900 lg:flex">
          <Command size={14} />
          <span>Quick search</span>
          <kbd className="ml-4 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] dark:border-slate-700 dark:bg-slate-800">⌘ K</kbd>
        </div>
        {/* Dark/Light mode toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="h-9 w-9 p-0"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
        </Button>

        {/* User profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 transition-all duration-150 hover:border-slate-200 hover:bg-slate-50 focus:outline-none dark:hover:border-slate-800 dark:hover:bg-slate-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-primary-600 to-secondary-500 text-[10px] font-semibold text-white shadow-sm select-none">
              {user?.avatarInitials ?? user?.name.charAt(0)}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 leading-tight">
                {user?.name}
              </span>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 capitalize leading-none mt-0.5">
                {user?.designation || user?.startupName || user?.role}
              </span>
            </div>
            <ChevronDown size={11} className="text-slate-400" />
          </button>

          {isDropdownOpen && (
            <>
              {/* Click backdrop to close */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 z-20 mt-2 w-56 animate-in fade-in slide-in-from-top-2 rounded-2xl border border-slate-200 bg-white py-1.5 text-left shadow-xl dark:border-slate-800 dark:bg-slate-950">
                <div className="px-3.5 py-1.5 border-b border-slate-50 dark:border-slate-900/80 text-[10px] font-medium text-slate-400 dark:text-slate-500 truncate">
                  {user?.email}
                </div>
                <div className="px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-900/80 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer transition-colors duration-150">
                  <User size={13} className="text-slate-400" />
                  <span>My Profile</span>
                </div>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false)
                    logout()
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-red-50/50 dark:hover:bg-red-950/20 flex items-center gap-2 text-xs text-red-600 dark:text-red-400 cursor-pointer border-none bg-transparent transition-colors duration-150"
                >
                  <LogOut size={13} className="text-red-400" />
                  <span>Sign out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
