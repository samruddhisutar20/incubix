import React from 'react'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  name: string
  initials?: string
  src?: string
  size?: AvatarSize
  variant?: 'indigo' | 'teal' | 'violet' | 'rose' | 'amber' | 'emerald'
  className?: string
  online?: boolean
}

const sizeMap: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-8 h-8 text-[11px]',
  md: 'w-10 h-10 text-xs',
  lg: 'w-12 h-12 text-sm',
  xl: 'w-16 h-16 text-base',
}

const gradients: Record<string, string> = {
  indigo:  'from-primary-600 to-primary-400',
  teal:    'from-secondary-600 to-secondary-400',
  violet:  'from-violet-600 to-violet-400',
  rose:    'from-rose-600 to-rose-400',
  amber:   'from-amber-500 to-amber-400',
  emerald: 'from-emerald-600 to-emerald-400',
}

const dotSizes: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5 border',
  sm: 'w-2 h-2 border',
  md: 'w-2.5 h-2.5 border-2',
  lg: 'w-3 h-3 border-2',
  xl: 'w-4 h-4 border-2',
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  initials,
  src,
  size = 'md',
  variant = 'indigo',
  className = '',
  online,
}) => {
  const displayInitials = initials || name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className={`relative inline-flex shrink-0 select-none ${sizeMap[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeMap[size]} rounded-full object-cover ring-1 ring-slate-100 dark:ring-slate-900`}
        />
      ) : (
        <div
          className={`${sizeMap[size]} rounded-full bg-gradient-to-br ${gradients[variant]} flex items-center justify-center text-white font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ring-1 ring-slate-100 dark:ring-slate-900`}
          aria-label={name}
          title={name}
        >
          {displayInitials}
        </div>
      )}
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 ${dotSizes[size]} rounded-full ${online ? 'bg-emerald-500' : 'bg-slate-400'} border-slate-50 dark:border-slate-950`}
          aria-label={online ? 'Online' : 'Offline'}
        />
      )}
    </div>
  )
}
