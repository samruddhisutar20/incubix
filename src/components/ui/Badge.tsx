import React from 'react'

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
type BadgeSize   = 'xs' | 'sm' | 'md'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default:   'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
  primary:   'bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300',
  secondary: 'bg-secondary-100 dark:bg-secondary-950/60 text-secondary-700 dark:text-secondary-300',
  success:   'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400',
  warning:   'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400',
  danger:    'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400',
  info:      'bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400',
  outline:   'border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-transparent',
}

const dotColors: Record<BadgeVariant, string> = {
  default:   'bg-slate-400',
  primary:   'bg-primary-500',
  secondary: 'bg-secondary-500',
  success:   'bg-emerald-500',
  warning:   'bg-amber-500',
  danger:    'bg-red-500',
  info:      'bg-sky-500',
  outline:   'bg-slate-400',
}

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'px-1.5 py-0.5 text-[9px] rounded gap-1',
  sm: 'px-2 py-0.5 text-[10px] rounded-md gap-1',
  md: 'px-2.5 py-1 text-xs rounded-md gap-1.5',
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center font-semibold tracking-wide uppercase whitespace-nowrap ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && (
        <span
          className={`inline-block w-1.5 h-1.5 rounded-full ${dotColors[variant]} shrink-0`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
