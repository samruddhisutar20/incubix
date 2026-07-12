import React from 'react'
import { Terminal } from 'lucide-react'
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-5 px-4 animate-in fade-in duration-300">
      {/* Icon */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900/60">
        <Terminal size={24} className="text-primary-500" />
      </div>

      {/* Badge */}
      <span className="px-2.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400">
        {phase}
      </span>

      {/* Text */}
      <div className="flex flex-col gap-1.5 max-w-sm">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white my-0 tracking-tight">
          {title}
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-400 leading-relaxed">
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
