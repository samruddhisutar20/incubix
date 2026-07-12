import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, DEMO_ACCOUNTS } from '@/store/authStore'
import type { UserRole } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Terminal,
  Shield,
  Rocket,
  GraduationCap,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from 'lucide-react'

const roleConfig: Record<UserRole, { icon: React.ReactNode; accent: string; label: string }> = {
  admin: {
    icon: <Shield size={14} />,
    accent:
      'text-violet-600 bg-violet-50/80 border-violet-200 dark:bg-violet-950/40 dark:border-violet-900/70',
    label: 'Incubator Admin',
  },
  founder: {
    icon: <Rocket size={14} />,
    accent:
      'text-indigo-600 bg-indigo-50/80 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-900/70',
    label: 'Startup Founder',
  },
  mentor: {
    icon: <GraduationCap size={14} />,
    accent:
      'text-teal-600 bg-teal-50/80 border-teal-200 dark:bg-teal-950/40 dark:border-teal-900/70',
    label: 'Mentor',
  },
}

interface DemoAccountsPanelProps {
  onAutofill: (email: string, password: string) => void
}

const DemoAccountsPanel: React.FC<DemoAccountsPanelProps> = ({ onAutofill }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(key)
      window.setTimeout(() => setCopiedField(null), 1500)
    } catch {
      setCopiedField(null)
    }
  }

  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/20">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          Demo Accounts
        </span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="flex flex-col gap-2.5">
        {DEMO_ACCOUNTS.map((account) => {
          const config = roleConfig[account.role]
          const emailKey = `${account.role}-email`
          const passKey = `${account.role}-password`

          return (
            <div
              key={account.role}
              className={`rounded-lg border p-3 ${config.accent} transition-all duration-150`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
                  {config.icon}
                  {config.label}
                </span>
                <button
                  type="button"
                  onClick={() => onAutofill(account.email, account.password)}
                  className="flex items-center gap-1 text-[10px] font-semibold text-primary-600 transition-colors hover:text-primary-500 dark:text-primary-400"
                >
                  Use Account
                  <ChevronRight size={12} />
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2 rounded-md border border-white/70 bg-white/70 px-2.5 py-1.5 dark:border-slate-900/70 dark:bg-slate-950/40">
                  <span className="w-12 shrink-0 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                    Email
                  </span>
                  <span className="flex-1 truncate text-[10px] font-mono font-medium text-slate-700 dark:text-slate-300">
                    {account.email}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(account.email, emailKey)}
                    className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                    aria-label={`Copy ${account.email}`}
                  >
                    {copiedField === emailKey ? (
                      <CheckCircle size={12} className="text-emerald-500" />
                    ) : (
                      <Copy size={12} />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 rounded-md border border-white/70 bg-white/70 px-2.5 py-1.5 dark:border-slate-900/70 dark:bg-slate-950/40">
                  <span className="w-12 shrink-0 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                    Pass
                  </span>
                  <span className="flex-1 truncate text-[10px] font-mono font-medium text-slate-700 dark:text-slate-300">
                    {account.password}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(account.password, passKey)}
                    className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                    aria-label={`Copy password for ${account.role}`}
                  >
                    {copiedField === passKey ? (
                      <CheckCircle size={12} className="text-emerald-500" />
                    ) : (
                      <Copy size={12} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { loginWithCredentials, isLoading } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAutofill = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setError(null)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    const result = await loginWithCredentials(email, password)

    if (!result.success) {
      setError(result.error ?? 'Login failed. Please try again.')
      return
    }

    const role = useAuthStore.getState().user?.role
    if (role) {
      navigate(`/${role}/dashboard`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="rounded-2xl bg-primary-600 p-3 text-white shadow-lg shadow-primary-600/20">
            <Terminal size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Incubix</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Startup incubation and innovation platform
            </p>
          </div>
        </div>

        <div className="grid w-full max-w-4xl gap-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-600 dark:border-primary-900/60 dark:bg-primary-950/40 dark:text-primary-400">
                <Shield size={12} />
                Secure workspace access
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Welcome back</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Sign in with a demo account to explore the admin, founder, or mentor experience. Everything is mocked for fast onboarding.
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/40">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <Terminal size={16} className="text-primary-500" />
                Demo-ready experience
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                  Fast account switching and autofill
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                  Clear validation with inline error feedback
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                  Role-based redirect after authentication
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold tracking-tight">Sign in to your workspace</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Pick a demo account or enter credentials manually.
              </p>
            </div>

            <DemoAccountsPanel onAutofill={handleAutofill} />

            <div className="relative flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Or sign in manually
              </span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
              <Input
                label="Email Address"
                id="login-email"
                type="email"
                placeholder="name@incubix.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setError(null)
                }}
                autoComplete="email"
                disabled={isLoading}
              />

              <Input
                label="Password"
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setError(null)
                }}
                autoComplete="current-password"
                disabled={isLoading}
                rightAddon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />

              {error ? (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-semibold text-red-600 dark:border-red-900/60 dark:bg-red-950/20 dark:text-red-400">
                  <AlertCircle size={14} className="shrink-0" />
                  {error}
                </div>
              ) : null}

              <Button type="submit" variant="primary" size="sm" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ChevronRight size={14} />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
