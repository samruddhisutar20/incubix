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
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[11px] font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftAddon && (
          <span className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center">
            {leftAddon}
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          className={[
            'w-full rounded-lg border bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white',
            'transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            error
              ? 'border-red-400 dark:border-red-700 focus:ring-red-400/20 focus:border-red-400'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700',
            disabled ? 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-900' : '',
            leftAddon ? 'pl-9' : 'px-3.5',
            rightAddon ? 'pr-9' : 'pr-3.5',
            'py-2.5',
            className,
          ].join(' ')}
          {...props}
        />
        {rightAddon && (
          <span className="absolute right-3 text-slate-400 dark:text-slate-500 flex items-center">
            {rightAddon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 font-medium flex items-center gap-1">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="text-xs text-slate-400 dark:text-slate-500">{helperText}</p>
      )}
    </div>
  )
}
