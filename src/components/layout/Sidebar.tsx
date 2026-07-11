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
        className={`fixed inset-y-0 left-0 z-50 w-64 glass-panel border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="h-16 px-6 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary-600 text-white shadow-md shadow-indigo-600/20">
              <Terminal size={16} />
            </div>
            <span className="font-heading font-extrabold text-base text-slate-900 dark:text-white tracking-wide">
              Incubix
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md"
          >
            <X size={16} />
          </Button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {currentLinks.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-md shadow-indigo-600/15'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-800 dark:hover:text-slate-200'
                  }`
                }
              >
                <Icon size={15} />
                <span>{link.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Footer info card */}
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900/60 rounded-lg p-3 text-center">
            <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
              Cohort 2026-B
            </span>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold mt-1">
              Main Campus Center
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
