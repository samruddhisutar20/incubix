import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftAddon,
  rightAddon,
  className = '',
  id,
  disabled,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`

  return (
    <div className="flex w-full flex-col gap-2 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftAddon && (
          <span className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center">
            {leftAddon}
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          className={[
            'h-11 w-full rounded-xl border bg-white text-sm text-slate-900 shadow-sm',
            'transition-all duration-200 placeholder:text-slate-400 focus:outline-none',
            'focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-600',
            error
              ? 'border-red-400 text-red-700 focus:ring-red-400/15 dark:text-red-200'
              : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600',
            disabled ? 'cursor-not-allowed bg-slate-50 opacity-60 dark:bg-slate-950' : '',
            leftAddon ? 'pl-11' : 'px-4',
            rightAddon ? 'pr-11' : 'pr-4',
            className,
          ].join(' ')}
          {...props}
        />
        {rightAddon && (
          <span className="absolute right-3.5 flex items-center text-slate-400 dark:text-slate-500">
            {rightAddon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-400 font-medium mt-1">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">{helperText}</p>
      )}
    </div>
  )
}
