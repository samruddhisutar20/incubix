import React from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ArrowRight, Clock
} from 'lucide-react'

export const MentorDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white my-0 tracking-tight">
            Mentor Advisor Console
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Provide feedback, review milestones, and schedule advising office hours.
          </p>
        </div>
        <Button variant="primary" size="xs">
          Set Availability
        </Button>
      </div>

      {/* Grid splits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Assigned Startups list */}
        <div className="lg:col-span-2 space-y-4">
          <Card title="Assigned Startups Portfolio" subtitle="Startups under your supervision">
            <div className="space-y-3.5">
              {[
                { name: 'AeroLabs Technologies', founder: 'Alex Rivera', stage: 'MVP', completion: '64%', alert: '1 Pending Milestone Proof' },
                { name: 'Quantix AI', founder: 'Sarah Jenkins', stage: 'Ideation', completion: '20%', alert: 'Needs Office Hours Scheduling' }
              ].map((startup, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">
                        {startup.name}
                      </span>
                      <span className="text-[8px] uppercase tracking-wide px-1.5 py-0.5 rounded font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 select-none">
                        {startup.stage}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      Founder: {startup.founder} • Milestone Completion: {startup.completion}
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-1 flex items-center gap-1">
                      <span>⚠️</span> {startup.alert}
                    </span>
                  </div>
                  <div className="flex gap-2 self-start sm:self-center">
                    <Button variant="outline" size="xs">
                      View Progress
                    </Button>
                    <Button variant="primary" size="xs" className="flex items-center gap-1">
                      Advise
                      <ArrowRight size={12} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Office hours scheduler stub */}
          <Card title="Advising Slots Today" subtitle="Upcoming bookings">
            <div className="space-y-2.5">
              {[
                { time: '02:00 PM - 02:45 PM', startup: 'AeroLabs', title: 'Pitch Deck Review' },
                { time: '04:00 PM - 04:30 PM', startup: 'Quantix AI', title: 'Architecture Checkin' }
              ].map((slot, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-900/50 text-left">
                  <Clock size={14} className="text-slate-400 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {slot.time}
                    </span>
                    <span className="text-[9px] uppercase tracking-wide text-secondary-600 dark:text-secondary-400 font-bold mt-0.5">
                      {slot.startup}
                    </span>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-normal">
                      {slot.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick advice card */}
          <Card title="Quick Review Tips">
            <ul className="text-[11px] text-slate-400 dark:text-slate-500 space-y-2 pl-4 list-disc text-left leading-relaxed">
              <li>Review the completion proof link before joining the Google Meet session.</li>
              <li>Ask founders to fill out their weekly KPIs before Fridays.</li>
              <li>Encourage the use of the Kanban board to mark roadblocks.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
