import React from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Calendar, FileText, ShieldCheck
} from 'lucide-react'

export const FounderDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white my-0">
            AeroLabs Workspace
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track milestones, register for mentoring sessions, and upload certificates.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
          <Button variant="primary" size="sm">
            Launch Pitch Deck
          </Button>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Startup Overview Info */}
        <Card className="lg:col-span-2 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-lg">
                AL
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white my-0">
                  AeroLabs Technologies
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Sector: Aerospace SaaS • Stage: MVP
                </p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              AeroLabs is developing an automated air-traffic safety integration platform that allows autonomous commercial drones to coordinate flights natively, avoiding regional airspace collision structures.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-slate-200/50 dark:border-slate-800/50 pt-4">
            <div className="text-left">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                Program Status
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-1">
                <ShieldCheck size={14} className="text-emerald-500" />
                Incubated
              </p>
            </div>
            <div className="text-left">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                Assigned Mentor
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                Dr. Sarah Chen
              </p>
            </div>
            <div className="text-left">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                Cohorts
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                2026-B
              </p>
            </div>
          </div>
        </Card>

        {/* Milestone Tracker widget */}
        <Card title="Upcoming Milestones" subtitle="Sprint progress">
          <div className="space-y-4">
            {[
              { title: 'MVP Wireframe Validation', date: 'Due Jul 15', status: 'In Progress' },
              { title: 'Setup Stripe Developer Account', date: 'Due Jul 20', status: 'Pending' },
              { title: 'Incorporate Entity as LLC', date: 'Completed', status: 'Completed' }
            ].map((milestone, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 dark:border-slate-900 last:border-b-0">
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{milestone.title}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{milestone.date}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                  milestone.status === 'Completed' 
                    ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                    : milestone.status === 'In Progress'
                    ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
                }`}>
                  {milestone.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Lower grid block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next meetings */}
        <Card title="Upcoming Mentorship Meetings" subtitle="Direct sync sessions scheduled">
          <div className="space-y-3">
            {[
              { title: 'Pitch Deck Revision Sync', date: 'Thursday, July 14 • 10:00 AM', mentor: 'Dr. Sarah Chen', link: 'meet.google.com/xyz-abc-123' }
            ].map((meeting, idx) => (
              <div key={idx} className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900/60 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {meeting.title}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-semibold">
                    <Calendar size={12} />
                    {meeting.date}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-none">
                  Mentor: <span className="font-semibold">{meeting.mentor}</span>
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                  <code className="text-xs text-indigo-500 select-all font-mono">{meeting.link}</code>
                  <Button variant="primary" size="sm">
                    Join Session
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Resources card */}
        <Card title="Incubator Documents & Resources" subtitle="Platform guides, handbooks, templates">
          <div className="space-y-2">
            {[
              { name: 'Incubator Program Rules and Guidelines.pdf', size: '2.4 MB' },
              { name: 'Financial Projection Stepper Workbook.xlsx', size: '4.1 MB' },
              { name: 'Seed Pitch Presentation Mock Template.pptx', size: '8.7 MB' }
            ].map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/60 cursor-pointer transition-colors text-left">
                <div className="flex items-center gap-2.5">
                  <FileText size={16} className="text-slate-400" />
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate max-w-[250px] sm:max-w-sm">
                    {doc.name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  {doc.size}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
