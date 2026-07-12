import React from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Users, Rocket, FileText, Megaphone, TrendingUp, ArrowUpRight
} from 'lucide-react'

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-1.5 text-left">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white my-0 tracking-tight">
          Incubator Command Center
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          Overview of programs, startup portfolios, and mentorship cohorts.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        <Card className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              Total Startups
            </span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
              <Rocket size={15} />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-heading text-slate-900 dark:text-white">24</span>
            <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-0.5">
              +12% <ArrowUpRight size={10} />
            </span>
          </div>
        </Card>

        <Card className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              Active Mentors
            </span>
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-500">
              <Users size={15} />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-heading text-slate-900 dark:text-white">12</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              3 Onboarding
            </span>
          </div>
        </Card>

        <Card className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              Applications
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <FileText size={15} />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-heading text-slate-900 dark:text-white">48</span>
            <span className="text-[10px] text-amber-500 font-semibold">
              18 Pending
            </span>
          </div>
        </Card>

        <Card className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              Milestone Velocity
            </span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <TrendingUp size={15} />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-heading text-slate-900 dark:text-white">82%</span>
            <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-0.5">
              +4% <ArrowUpRight size={10} />
            </span>
          </div>
        </Card>
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left lists */}
        <div className="lg:col-span-2 space-y-4">
          <Card title="Admissions Overview" subtitle="Pending cohort applications under review">
            <div className="divide-y divide-slate-100 dark:divide-slate-900/80">
              {[
                { name: 'Quantix AI', industry: 'Enterprise SaaS', applicant: 'Sarah Jenkins', score: 8.5 },
                { name: 'TerraCycle Tech', industry: 'CleanTech', applicant: 'Marcus Cole', score: 7.8 },
                { name: 'BioShield Meds', industry: 'HealthTech', applicant: 'Elena Rostova', score: 9.0 }
              ].map((app, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-slate-900 dark:text-slate-200 text-xs">
                      {app.name}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {app.industry} • Submitted by {app.applicant}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900/60 text-slate-600 dark:text-slate-400">
                      Score: {app.score}/10
                    </span>
                    <Button variant="outline" size="xs">
                      Evaluate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right lists */}
        <div className="space-y-4">
          <Card title="Quick Actions">
            <div className="flex flex-col gap-2">
              <Button className="w-full flex items-center justify-start gap-2.5" variant="primary" size="sm">
                <FileText size={14} />
                Create New Program
              </Button>
              <Button className="w-full flex items-center justify-start gap-2.5" variant="secondary" size="sm">
                <Users size={14} />
                Onboard Mentor
              </Button>
              <Button className="w-full flex items-center justify-start gap-2.5" variant="outline" size="sm">
                <Megaphone size={14} />
                Broadcast Announcement
              </Button>
            </div>
          </Card>

          <Card title="Cohort Milestones Alert" subtitle="Approaching deadlines">
            <div className="space-y-2.5">
              {[
                { startup: 'AeroLabs', title: 'Submit MVP Pitch Deck', days: '2 days left' },
                { startup: 'Nexus Corp', title: 'Financial Projection Forecast', days: '4 days left' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1.5 text-left p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900/60">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-primary-500 uppercase tracking-wider">{item.startup}</span>
                    <span className="text-red-500 font-semibold">{item.days}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5 leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
