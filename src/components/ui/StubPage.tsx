import React from 'react'
import { Sparkles, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'

interface StubPageProps {
  title: string
  description: string
  phase?: string
}

export const StubPage: React.FC<StubPageProps> = ({
  title,
  description,
  phase = 'Coming Soon',
}) => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[68vh] flex-col items-center justify-center gap-5 px-4 text-center animate-in fade-in duration-300">
      {/* Icon */}
      <div className="relative rounded-3xl border border-primary-100 bg-primary-50 p-5 text-primary-600 shadow-sm dark:border-primary-500/15 dark:bg-primary-500/10 dark:text-primary-300">
        <Terminal size={24} className="text-primary-500" />
        <Sparkles size={14} className="absolute -right-1 -top-1 text-amber-400" />
      </div>

      {/* Badge */}
      <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-400">
        {phase}
      </span>

      {/* Text */}
      <div className="flex max-w-md flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      {/* Actions */}
      <Button variant="outline" onClick={() => navigate(-1)}>
        ← Go Back
      </Button>
    </div>
  )
}
