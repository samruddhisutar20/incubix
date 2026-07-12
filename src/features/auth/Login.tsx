import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, DEMO_ACCOUNTS } from '@/store/authStore'
import type { UserRole } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Terminal, Shield, Rocket, GraduationCap,
  Eye, EyeOff, Copy, CheckCircle, AlertCircle,
  ChevronRight,
} from 'lucide-react'

// ─── Role icon & colour config ────────────────────────────────────────────────
const roleConfig: Record<UserRole, { icon: React.ReactNode; accent: string; label: string }> = {
  admin: {
    icon: <Shield size={14} />,
    accent: 'text-violet-500 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-900/60 hover:border-violet-400/60',
    label: 'Incubator Admin',
  },
  founder: {
    icon: <Rocket size={14} />,
    accent: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/60 hover:border-indigo-400/60',
    label: 'Startup Founder',
  },
  mentor: {
    icon: <GraduationCap size={14} />,
    accent: 'text-teal-500 bg-teal-50 dark:bg-teal-950/40 b// ─── Demo Accounts Panel ──────────────────────────────────────────────────────
interface DemoAccountCardProps {
  onAutofill: (email: string, password: string) => void
}

const DemoAccountsPanel: React.FC<DemoAccountCardProps> = ({ onAutofill }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (value: string, key: string) => {
    navigator.clipboard.writeText(value)
    setCopiedField(key)
    setTimeout(() => setCopiedField(null), 1500)
  }

  return (
    <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/10 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-550 select-none">
          Demo Accounts
        </span>
        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-900" />
      </div>

      {DEMO_ACCOUNTS.map((account) => {
        const cfg = roleConfig[account.role]
        return (
          <div
            key={account.role}
            className={`flex flex-col gap-2 p-3 rounded-lg border ${cfg.accent} transition-all duration-150`}
          >
            {/* Role badge + Use button */}
            <div className="flex items-center justify-between">
              <span className={`flex items-center gap-1.5 text-[10px] font-semibold tracking-wide ${cfg.accent.split(' ')[0]}`}>
                {cfg.icon}
                {cfg.label}
              </span>
              <button
                type="button"
                onClick={() => onAutofill(account.email, account.password)}
                className="flex items-center gap-0.5 text-[9px] font-bold text-primary-600 dark:text-primary-400 hover:underline transition-all cursor-pointer"
              >
                Use Account
                <ChevronRight size={9} />
              </button>
            </div>

            {/* Credentials grid */}
            <div className="grid grid-cols-1 gap-1.5">
              {/* Email */}
              <div className="flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 bg-white/60 dark:bg-slate-950/30 border border-slate-150/60 dark:border-slate-900/60">
                <span className="text-[9px] text-slate-400 dark:text-slate-500 w-12 shrink-0">Email</span>
                <span className="text-[10px] font-mono font-medium text-slate-700 dark:text-slate-350 flex-1 truncate">
                  {account.email}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(account.email, `${account.role}-email`)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {copiedField === `${account.role}-email`
                    ? <CheckCircle size={11} className="text-emerald-500" />
                    : <Copy size={11} />}
                </button>
              </div>

              {/* Password */}
              <div className="flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 bg-white/60 dark:bg-slate-950/30 border border-slate-150/60 dark:border-slate-900/60">
                <span className="text-[9px] text-slate-400 dark:text-slate-500 w-12 shrink-0">Password</span>
                <span className="text-[10px] font-mono font-medium text-slate-700 dark:text-slate-350 flex-1">
                  {account.password}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(account.password, `${account.role}-pass`)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {copiedField === `${account.role}-pass`
                    ? <CheckCircle size={11} className="text-emerald-500" />
                    : <Copy size={11} />}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Login Page ───────────────────────────────────────────────────────────────
export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { loginWithCredentials } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Autofill from Demo Accounts panel
  const handleAutofill = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    setIsLoading(true)
    const result = await loginWithCredentials(email, password)
    setIsLoading(false)

    if (!result.success) {
      setError(result.error ?? 'Login failed. Please try again.')
      return
    }

    // Redirect based on the role stored in authStore after successful login
    const role = useAuthStore.getState().user?.role
    if (role) navigate(`/${role}/dashboard`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md flex flex-col gap-5 animate-in fade-in duration-300">

        {/* ── Brand ── */}
        <div className="flex flex-col items-center gap-1.5 text-center select-none">
          <div className="p-2.5 rounded-xl bg-primary-600 text-white shadow-lg shadow-indigo-600/15">
            <Terminal size={18} />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mt-1 mb-0">
            Incubix
          </h1>
          <p className="text-xs text-slate-450 dark:text-slate-500 font-medium">
            Startup Incubation & Innovation Platform
          </p>
        </div>

        {/* ── Login Card ── */}
        <div className="glass-card rounded-xl p-6 flex flex-col gap-5">
          <div className="text-center">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight my-0">
              Sign in to your workspace
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 font-medium">
              Use a demo account below or enter credentials manually.
            </p>
          </div>

          {/* ── Demo Accounts Panel ── */}
          <DemoAccountsPanel onAutofill={handleAutofill} />

          {/* ── Divider ── */}
          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-900" />
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap">
              Or sign in manually
            </span>
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-900" />
          </div>

          {/* ── Login Form ── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <Input
              label="Email Address"
              id="login-email"
              type="email"
              placeholder="name@incubix.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null) }}
              autoComplete="email"
              disabled={isLoading}
            />

            {/* Password with show/hide toggle */}
            <div className="relative">
              <Input
                label="Password"
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null) }}
                autoComplete="current-password"
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-[30px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-350 transition-colors cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* ── Error Banner ── */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/40 text-red-600 dark:text-red-400 text-[11px] font-semibold animate-in fade-in duration-150">
                <AlertCircle size={14} className="shrink-0 text-red-500" />
                {error}
              </div>
            )}

            {/* ── Submit ── */}
            <Button
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center gap-1.5 relative mt-1"
              disabled={isLoading}
              size="sm"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Authenticating…
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>

        {/* ── Footer note ── */}
        <p className="text-center text-[9px] text-slate-400 dark:text-slate-600 select-none">
          MVP Demo · No real backend · Authentication via mock credentials
        </p>
      </div>
    </div>
  )
}
