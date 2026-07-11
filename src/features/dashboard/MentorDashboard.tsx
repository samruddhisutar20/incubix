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
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white my-0">
            Mentor Advisor Console
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Provide feedback, review milestones, and schedule advising office hours.
          </p>
        </div>
        <Button variant="primary" size="sm">
          Set Availability
        </Button>
      </div>

      {/* Grid splits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Assigned Startups list */}
        <div className="lg:col-span-2 space-y-4">
          <Card title="Assigned Startups Portfolio" subtitle="Startups under your supervision">
            <div className="space-y-4">
              {[
                { name: 'AeroLabs Technologies', founder: 'Alex Rivera', stage: 'MVP', completion: '64%', alert: '1 Pending Milestone Proof' },
                { name: 'Quantix AI', founder: 'Sarah Jenkins', stage: 'Ideation', completion: '20%', alert: 'Needs Office Hours Scheduling' }
              ].map((startup, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-950 dark:text-white text-sm">
                        {startup.name}
                      </span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500">
                        {startup.stage}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      Founder: {startup.founder} • Milestone Completion: {startup.completion}
                    </span>
                    <span className="text-[10px] text-amber-500 font-semibold mt-1">
                      ⚠️ {startup.alert}
                    </span>
                  </div>
                  <div className="flex gap-2 self-start sm:self-center">
                    <Button variant="outline" size="sm">
                      View Progress
                    </Button>
                    <Button variant="primary" size="sm" className="flex items-center gap-1">
                      Advise
                      <ArrowRight size={14} />
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
            <div className="space-y-3">
              {[
                { time: '02:00 PM - 02:45 PM', startup: 'AeroLabs', title: 'Pitch Deck Review' },
                { time: '04:00 PM - 04:30 PM', startup: 'Quantix AI', title: 'Architecture Checkin' }
              ].map((slot, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900/60 text-left">
                  <Clock size={16} className="text-slate-400 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {slot.time}
                    </span>
                    <span className="text-[10px] text-secondary-500 font-bold">
                      {slot.startup}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                      {slot.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick advice card */}
          <Card title="Quick Review Tips">
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 pl-4 list-disc text-left">
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
