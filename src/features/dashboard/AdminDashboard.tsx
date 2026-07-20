import React from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Users, Rocket, FileText, Megaphone, TrendingUp, ArrowUpRight
} from 'lucide-react'

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Title Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Incubator Command Center
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Overview of programs, startup portfolios, and mentorship cohorts.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Startups */}
        <Card className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
              Total Startups
            </span>
            <div className="rounded-lg bg-indigo-500/10 p-2.5 text-indigo-600 dark:text-indigo-400">
              <Rocket size={16} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold font-heading text-slate-900 dark:text-white">24</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              +12% <ArrowUpRight size={12} />
            </p>
          </div>
        </Card>

        {/* Active Mentors */}
        <Card className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
              Active Mentors
            </span>
            <div className="rounded-lg bg-teal-500/10 p-2.5 text-teal-600 dark:text-teal-400">
              <Users size={16} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold font-heading text-slate-900 dark:text-white">12</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              3 Onboarding
            </p>
          </div>
        </Card>

        {/* Applications */}
        <Card className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
              Applications
            </span>
            <div className="rounded-lg bg-amber-500/10 p-2.5 text-amber-600 dark:text-amber-400">
              <FileText size={16} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold font-heading text-slate-900 dark:text-white">48</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">
              18 Pending
            </p>
          </div>
        </Card>

        {/* Milestone Velocity */}
        <Card className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
              Milestone Velocity
            </span>
            <div className="rounded-lg bg-purple-500/10 p-2.5 text-purple-600 dark:text-purple-400">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold font-heading text-slate-900 dark:text-white">82%</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              +4% <ArrowUpRight size={12} />
            </p>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Admissions Overview */}
        <div className="lg:col-span-2">
          <Card title="Admissions Overview" subtitle="Pending cohort applications under review">
            <div className="divide-y divide-slate-100 dark:divide-slate-900/80 space-y-0">
              {[
                { name: 'Quantix AI', industry: 'Enterprise SaaS', applicant: 'Sarah Jenkins', score: 8.5 },
                { name: 'TerraCycle Tech', industry: 'CleanTech', applicant: 'Marcus Cole', score: 7.8 },
                { name: 'BioShield Meds', industry: 'HealthTech', applicant: 'Elena Rostova', score: 9.0 }
              ].map((app, idx) => (
                <div key={idx} className="flex items-center justify-between py-3">
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-slate-200 text-sm">
                      {app.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {app.industry} • {app.applicant}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {app.score}/10
                    </span>
                    <Button variant="outline" size="sm">
                      Evaluate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="flex flex-col gap-2">
              <Button className="w-full justify-start gap-2.5" variant="primary" size="sm">
                <FileText size={16} />
                <span>Create Program</span>
              </Button>
              <Button className="w-full justify-start gap-2.5" variant="secondary" size="sm">
                <Users size={16} />
                <span>Onboard Mentor</span>
              </Button>
              <Button className="w-full justify-start gap-2.5" variant="outline" size="sm">
                <Megaphone size={16} />
                <span>Announcement</span>
              </Button>
            </div>
          </Card>

          {/* Cohort Milestones Alert */}
          <Card title="Cohort Milestones" subtitle="Approaching deadlines">
            <div className="space-y-3">
              {[
                { startup: 'AeroLabs', title: 'Submit MVP Pitch Deck', days: '2 days left' },
                { startup: 'Nexus Corp', title: 'Financial Projection Forecast', days: '4 days left' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                      {item.startup}
                    </p>
                    <p className="text-xs font-semibold text-red-500 dark:text-red-400 whitespace-nowrap">
                      {item.days}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">
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
