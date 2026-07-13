import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, DEMO_ACCOUNTS } from '@/store/authStore'
import type { UserRole } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
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
      'text-violet-200 bg-violet-500/10 border-violet-500/20 dark:bg-violet-500/10 dark:border-violet-500/30',
    label: 'Incubator Admin',
  },
  founder: {
    icon: <Rocket size={14} />,
    accent:
      'text-indigo-200 bg-indigo-500/10 border-indigo-500/20 dark:bg-indigo-500/10 dark:border-indigo-500/30',
    label: 'Startup Founder',
  },
  mentor: {
    icon: <GraduationCap size={14} />,
    accent:
      'text-teal-200 bg-teal-500/10 border-teal-500/20 dark:bg-teal-500/10 dark:border-teal-500/30',
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
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-center">
        <div className="w-full max-w-[1100px] animate-[fadeIn_0.45s_ease-out]">
          <div className="grid gap-6 rounded-[2rem] border border-slate-800/70 bg-slate-950/95 p-6 shadow-[0_45px_130px_-40px_rgba(0,0,0,0.72)] backdrop-blur-xl lg:grid-cols-2 lg:p-8">
            <div className="relative flex min-h-[760px] flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900/95 p-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="pointer-events-none absolute -right-16 top-16 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />
              <div className="pointer-events-none absolute left-0 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="pointer-events-none absolute right-0 bottom-10 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-3xl" />

              <div className="relative z-10 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-200">
                  <Shield size={14} />
                  Secure workspace access
                </div>
                <div className="space-y-5">
                  <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                    Welcome back to Incubix.
                  </h1>
                  <p className="max-w-lg text-lg leading-8 text-slate-300">
                    A modern incubator workspace built for founders, mentors, and administrators. Fast access, clear insights, and a polished onboarding experience.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_-46px_rgba(99,102,241,0.35)] transition-transform duration-200 hover:-translate-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-200">
                          <Rocket size={20} />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-white">Launch faster</h2>
                          <p className="mt-1 text-sm leading-6 text-slate-400">Get into the product with demo-ready accounts and instant previews.</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-slate-800/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">
                        Demo
                      </span>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_-46px_rgba(99,102,241,0.28)] transition-transform duration-200 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-200">
                        <Shield size={20} />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white">Secure by design</h2>
                        <p className="mt-1 text-sm leading-6 text-slate-400">Role-based access and polished sign-in flows for every team member.</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_-46px_rgba(99,102,241,0.28)] transition-transform duration-200 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-200">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white">Instant clarity</h2>
                        <p className="mt-1 text-sm leading-6 text-slate-400">A refined dashboard-ready UI with clear priorities and fast entry points.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-center gap-8 rounded-[2rem] border border-slate-800/70 bg-slate-950/95 p-8 shadow-[0_22px_72px_-28px_rgba(0,0,0,0.68)] lg:p-10">
              <div className="space-y-4 text-center lg:text-left">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Secure access</p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Sign in to your workspace</h2>
                <p className="max-w-md text-base leading-8 text-slate-400">
                  Choose a demo account or enter your credentials manually to unlock the Incubix experience.
                </p>
              </div>

              <DemoAccountsPanel onAutofill={handleAutofill} />

              <div className="relative flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-slate-500">
                <div className="h-px flex-1 bg-slate-800/90" />
                <span>Or sign in manually</span>
                <div className="h-px flex-1 bg-slate-800/90" />
              </div>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
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
                      className="text-slate-400 transition-colors hover:text-primary-600 dark:hover:text-primary-300"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                {error ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm font-semibold text-red-200">
                    <AlertCircle size={18} className="shrink-0 text-red-300" />
                    {error}
                  </div>
                ) : null}

                <Button type="submit" variant="primary" size="md" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      Sign In
                      <ChevronRight size={18} />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
