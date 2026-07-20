import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import {
  LayoutDashboard, Briefcase, FileSpreadsheet, Users, Megaphone, 
  Rocket, CheckSquare, Calendar, Folder, Clock, X, Terminal
} from 'lucide-react'
import { Button } from '../ui/Button'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuthStore()
  
  if (!user) return null

  const linksByRole = {
    admin: [
      { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/admin/programs', label: 'Programs', icon: Briefcase },
      { to: '/admin/applications', label: 'Applications', icon: FileSpreadsheet },
      { to: '/admin/mentors', label: 'Mentors', icon: Users },
      { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
    ],
    founder: [
      { to: '/founder/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/founder/profile', label: 'Startup Profile', icon: Rocket },
      { to: '/founder/milestones', label: 'Milestones', icon: CheckSquare },
      { to: '/founder/meetings', label: 'Meetings', icon: Calendar },
      { to: '/founder/documents', label: 'Documents', icon: Folder },
    ],
    mentor: [
      { to: '/mentor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/mentor/startups', label: 'Assigned Startups', icon: Rocket },
      { to: '/mentor/availability', label: 'Office Hours', icon: Clock },
    ]
  }

  const currentLinks = linksByRole[user.role] || []

  const roleLabel = user.role === 'admin' ? 'Administration' : user.role === 'founder' ? 'Founder workspace' : 'Mentor workspace'

  return (
    <>
      {/* Mobile Sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[17rem] flex-col border-r border-slate-200 bg-white shadow-xl shadow-slate-950/5 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
      >
        {/* Brand header - fixed height matching Header */}
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800 lg:px-6">
          <div className="flex items-center gap-3 select-none">
            <div className="rounded-lg bg-primary-600 p-2 text-white shadow-md shadow-primary-600/20">
              <Terminal size={18} />
            </div>
            <div className="min-w-0">
              <p className="block font-heading text-base font-bold tracking-tight text-slate-950 dark:text-white">Incubix</p>
              <p className="block text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">Venture OS</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <X size={16} />
          </Button>
        </div>

        {/* Navigation links - scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          {/* Section label */}
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {roleLabel}
          </p>

          {/* Navigation items */}
          <div className="space-y-1">
            {currentLinks.map((link) => {
              const Icon = link.icon
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/50 dark:hover:text-slate-200'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute -left-4 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-lg bg-primary-600" />
                      )}
                      <Icon size={18} className="shrink-0" />
                      <span className="truncate">{link.label}</span>
                    </>
                  )}
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* Footer info card - fixed */}
        <div className="shrink-0 border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Cohort 2026-B
            </p>
            <p className="mt-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
              Main Campus Center
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
