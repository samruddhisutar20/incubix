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
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 px-4">
      {/* Icon */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/20 dark:to-secondary-950/20 border border-slate-200/50 dark:border-slate-800/50">
        <Terminal size={32} className="text-primary-500" />
      </div>

      {/* Badge */}
      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
        {phase}
      </span>

      {/* Text */}
      <div className="flex flex-col gap-2 max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white my-0">
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
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
