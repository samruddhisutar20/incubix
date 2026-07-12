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
    'inline-flex items-center justify-center gap-1.5 font-medium rounded-lg transition-all duration-150 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 ' +
    'disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap'

  const variants: Record<string, string> = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-500 active:bg-primary-700 ' +
      'shadow-[0_1px_2px_0_rgba(79,70,229,0.15)] hover:shadow-[0_4px_12px_0_rgba(79,70,229,0.2)] ' +
      'dark:focus-visible:ring-offset-slate-950',
    secondary:
      'bg-secondary-600 text-white hover:bg-secondary-500 active:bg-secondary-700 ' +
      'shadow-[0_1px_2px_0_rgba(13,148,136,0.15)] hover:shadow-[0_4px_12px_0_rgba(13,148,136,0.2)]',
    outline:
      'border border-slate-200 dark:border-slate-800 bg-transparent ' +
      'text-slate-700 dark:text-slate-300 ' +
      'hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700',
    ghost:
      'bg-transparent text-slate-600 dark:text-slate-400 ' +
      'hover:bg-slate-100/80 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200',
    danger:
      'bg-red-600 text-white hover:bg-red-500 active:bg-red-700 ' +
      'shadow-[0_1px_2px_0_rgba(220,38,38,0.15)] hover:shadow-[0_4px_12px_0_rgba(220,38,38,0.2)]',
    success:
      'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 ' +
      'shadow-[0_1px_2px_0_rgba(16,185,129,0.15)]',
  }

  const sizes: Record<string, string> = {
    xs: 'px-2 py-1 text-[10px] rounded-md gap-1',
    sm: 'px-3 py-1.5 text-xs rounded-md',
    md: 'px-4 py-2 text-xs rounded-lg',
    lg: 'px-5 py-2.5 text-sm rounded-lg',
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
