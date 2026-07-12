import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footerActions?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footerActions,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }
    
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative w-full max-w-lg rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200 text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900/80 pb-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={16} />
          </Button>
        </div>
        
        {/* Body */}
        <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {children}
        </div>
        
        {/* Footer */}
        {footerActions && (
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-900/80 pt-3">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  )
}
