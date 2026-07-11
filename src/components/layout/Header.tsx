import React, { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useAuthStore } from '@/store/authStore'
import { Sun, Moon, Menu, LogOut, User, ChevronDown } from 'lucide-react'
import { Button } from '../ui/Button'

interface HeaderProps {
  onToggleSidebar: () => void
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full glass-panel h-16 px-6 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50">
      {/* Left side: Hamburger on mobile, page title / branding */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden p-2"
        >
          <Menu size={20} />
        </Button>
        <div>
          <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-white my-0 flex items-center gap-2">
            Incubix 
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              {user?.role}
            </span>
          </h2>
        </div>
      </div>

      {/* Right side: Tools & Profile */}
      <div className="flex items-center gap-4">
        {/* Dark/Light mode toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="p-2 rounded-md"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </Button>

        {/* User profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-transparent hover:border-slate-200/50 dark:hover:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all focus:outline-none"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
              {user?.avatarInitials ?? user?.name.charAt(0)}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-tight">
                {user?.name}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 capitalize leading-none">
                {user?.designation || user?.startupName || user?.role}
              </span>
            </div>
            <ChevronDown size={12} className="text-slate-400" />
          </button>

          {isDropdownOpen && (
            <>
              {/* Click backdrop to close */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 shadow-xl py-1 z-20 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-900 text-[10px] text-slate-400 dark:text-slate-500 truncate">
                  {user?.email}
                </div>
                <div className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <User size={14} />
                  <span>My Profile</span>
                </div>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false)
                    logout()
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 text-xs text-red-600 dark:text-red-400 cursor-pointer"
                >
                  <LogOut size={14} />
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
