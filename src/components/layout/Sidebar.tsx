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
        className={`fixed inset-y-0 left-0 z-50 flex w-[17rem] flex-col border-r border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-950/10 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950/95 lg:static lg:w-72 lg:translate-x-0 lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="flex h-[72px] items-center justify-between border-b border-slate-200/80 px-5 dark:border-slate-800 lg:px-6">
          <div className="flex items-center gap-3 select-none">
            <div className="rounded-xl bg-primary-600 p-2 text-white shadow-lg shadow-primary-600/25">
              <Terminal size={17} />
            </div>
            <div>
              <span className="block font-heading text-base font-bold tracking-tight text-slate-950 dark:text-white">Incubix</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">Venture OS</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md"
          >
            <X size={14} />
          </Button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5 lg:px-4">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{roleLabel}</p>
          {currentLinks.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                  }`
                }
              >
                {({ isActive }) => <>
                  {isActive && <span className="absolute left-0 h-5 w-1 rounded-r-full bg-primary-600" />}
                  <Icon size={17} className="shrink-0" />
                <span>{link.label}</span>
                </>}
              </NavLink>
            )
          })}
        </nav>

        {/* Footer info card */}
        <div className="border-t border-slate-200/80 p-4 dark:border-slate-800">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Cohort 2026-B
            </span>
            <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
              Main Campus Center
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
