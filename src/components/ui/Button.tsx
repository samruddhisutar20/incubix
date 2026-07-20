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
    'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ' +
    'disabled:pointer-events-none disabled:opacity-50 select-none whitespace-nowrap active:translate-y-px'

  const variants: Record<string, string> = {
    primary:
      'bg-primary-600 text-white shadow-md shadow-primary-600/30 hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-600/40 active:bg-primary-700',
    secondary:
      'bg-secondary-600 text-white shadow-md shadow-secondary-600/20 hover:bg-secondary-500 active:bg-secondary-700',
    outline:
      'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800',
    ghost:
      'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/50 dark:hover:text-slate-200',
    danger:
      'bg-red-600 text-white shadow-md shadow-red-600/20 hover:bg-red-500 hover:shadow-lg hover:shadow-red-600/30 active:bg-red-700',
    success:
      'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 active:bg-emerald-700',
  }

  const sizes: Record<string, string> = {
    xs: 'h-8 px-2 text-xs gap-1.5',
    sm: 'h-9 px-3.5 text-sm gap-2',
    md: 'h-11 px-4 text-sm gap-2',
    lg: 'h-12 px-5 text-base gap-2.5',
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
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : null}
      {!loading && leftIcon && (
        <span className="shrink-0 flex items-center justify-center" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      {children && <span>{children}</span>}
      {!loading && rightIcon && (
        <span className="shrink-0 flex items-center justify-center" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  )
}
