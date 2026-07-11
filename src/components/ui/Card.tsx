import React from 'react'

/* ── KPI Stat Card ── */
interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  iconBg?: string
  subtitle?: string
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  iconBg = 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
  subtitle,
  className = '',
}) => {
  const changeColor =
    changeType === 'up'
      ? 'text-emerald-600 dark:text-emerald-400'
      : changeType === 'down'
      ? 'text-red-500 dark:text-red-400'
      : 'text-slate-500 dark:text-slate-400'

  const changeArrow = changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''

  return (
    <div
      className={`glass-card rounded-xl p-5 flex flex-col gap-4 group cursor-default ${className}`}
    >
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        <div className={`p-2.5 rounded-lg ${iconBg} transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold font-heading text-slate-900 dark:text-white tabular-nums">
          {value}
        </p>
        {(change || subtitle) && (
          <p className="text-xs mt-1 flex items-center gap-1.5">
            {change && (
              <span className={`font-semibold ${changeColor}`}>
                {changeArrow} {change}
              </span>
            )}
            {subtitle && (
              <span className="text-slate-400 dark:text-slate-500">{subtitle}</span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

/* ── Section Header ── */
interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
      {subtitle && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
)

/* ── Card Shell ── */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  headerActions?: React.ReactNode
  noPadding?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerActions,
  noPadding = false,
  className = '',
  ...props
}) => (
  <div className={`glass-card rounded-xl ${noPadding ? '' : 'p-5'} ${className}`} {...props}>
    {(title || headerActions) && (
      <div className={`flex items-start justify-between gap-3 ${noPadding ? 'px-5 pt-5' : ''} ${children ? 'pb-4 border-b border-slate-100 dark:border-slate-800/80 mb-4' : ''}`}>
        <div>
          {title && (
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-none">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        {headerActions && <div className="shrink-0 flex items-center gap-2">{headerActions}</div>}
      </div>
    )}
    <div className={noPadding && (title || headerActions) ? 'px-5 pb-5' : ''}>
      {children}
    </div>
  </div>
)
