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
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white my-0 tracking-tight">
            AeroLabs Workspace
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Track milestones, register for mentoring sessions, and upload certificates.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="xs">
            Edit Profile
          </Button>
          <Button variant="primary" size="xs">
            Launch Pitch Deck
          </Button>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Startup Overview Info */}
        <Card className="lg:col-span-2 flex flex-col justify-between gap-5 p-5">
          <div className="flex flex-col gap-3.5 text-left">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-base font-heading select-none">
                AL
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white my-0 tracking-tight">
                  AeroLabs Technologies
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                  Sector: Aerospace SaaS • Stage: MVP
                </p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              AeroLabs is developing an automated air-traffic safety integration platform that allows autonomous commercial drones to coordinate flights natively, avoiding regional airspace collision structures.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-900/80 pt-4.5">
            <div className="text-left">
              <span className="text-[9px] text-slate-450 dark:text-slate-500 uppercase tracking-wider font-bold">
                Program Status
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-1">
                <ShieldCheck size={13} className="text-emerald-500" />
                Incubated
              </p>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-slate-450 dark:text-slate-500 uppercase tracking-wider font-bold">
                Assigned Mentor
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                Dr. Sarah Chen
              </p>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-slate-450 dark:text-slate-500 uppercase tracking-wider font-bold">
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
          <div className="space-y-3.5">
            {[
              { title: 'MVP Wireframe Validation', date: 'Due Jul 15', status: 'In Progress' },
              { title: 'Setup Stripe Developer Account', date: 'Due Jul 20', status: 'Pending' },
              { title: 'Incorporate Entity as LLC', date: 'Completed', status: 'Completed' }
            ].map((milestone, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50 dark:border-slate-900/60 last:border-b-0">
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{milestone.title}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{milestone.date}</span>
                </div>
                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wide uppercase select-none ${
                  milestone.status === 'Completed' 
                    ? 'bg-emerald-100/80 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                    : milestone.status === 'In Progress'
                    ? 'bg-indigo-100/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
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
              <div key={idx} className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-900/50 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {meeting.title}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-semibold">
                    <Calendar size={11} className="text-slate-400" />
                    {meeting.date}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-none">
                  Mentor: <span className="font-semibold text-slate-600 dark:text-slate-300">{meeting.mentor}</span>
                </p>
                <div className="flex items-center justify-between mt-2 pt-2.5 border-t border-slate-200/40 dark:border-slate-900/40">
                  <code className="text-xs text-indigo-500 dark:text-indigo-400 select-all font-mono font-medium">{meeting.link}</code>
                  <Button variant="primary" size="xs">
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
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-slate-100 dark:border-slate-900/60 hover:border-slate-200 dark:hover:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-900/60 cursor-pointer transition-all duration-150 text-left">
                <div className="flex items-center gap-2.5">
                  <FileText size={14} className="text-slate-400" />
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium truncate max-w-[250px] sm:max-w-sm">
                    {doc.name}
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-medium">
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
