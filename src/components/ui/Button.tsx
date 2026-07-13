import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ' +
    'disabled:pointer-events-none disabled:opacity-50 select-none whitespace-nowrap active:translate-y-px'

  const variants: Record<string, string> = {
    primary:
      'bg-primary-600 text-white shadow-[0_10px_24px_-10px_rgba(79,70,229,0.6)] hover:bg-primary-500 hover:shadow-[0_14px_30px_-10px_rgba(79,70,229,0.5)]',
    secondary:
      'bg-secondary-600 text-white shadow-[0_8px_20px_-10px_rgba(13,148,136,0.45)] hover:bg-secondary-500',
    outline:
      'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800',
    ghost:
      'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white',
    danger:
      'bg-red-600 text-white hover:bg-red-500 active:bg-red-700 ' +
      'shadow-[0_1px_2px_0_rgba(220,38,38,0.15)] hover:shadow-[0_4px_12px_0_rgba(220,38,38,0.2)]',
    success:
      'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 ' +
      'shadow-[0_1px_2px_0_rgba(16,185,129,0.15)]',
  }

  const sizes: Record<string, string> = {
    xs: 'h-8 px-3 text-xs gap-1.5',
    sm: 'h-9 px-3.5 text-sm',
    md: 'h-11 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-3.5 w-3.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : leftIcon ? (
        <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
      ) : null}
      {children}
      {!loading && rightIcon && (
        <span className="shrink-0" aria-hidden="true">{rightIcon}</span>
      )}
    </button>
  )
}
