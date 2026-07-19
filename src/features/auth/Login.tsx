import { useState, type FormEvent } from "react";
import { BarChart3, Lightbulb, Rocket, Shield, Target, Users } from "lucide-react";
import { BackgroundFX } from "@/components/auth/BackgroundFX";
import { GlassCard } from "@/components/auth/GlassCard";
import { FeatureCard } from "@/components/auth/FeatureCard";
import { RoleCard } from "@/components/auth/RoleCard";
import { ScrollCue } from "@/components/auth/ScrollCue";
import type { AuthRole, RoleConfig } from "@/components/auth/types";

/**
 * ---------------------------------------------------------------
 * WIRING NOTE
 * ---------------------------------------------------------------
 * No existing project files were provided, so the handlers below
 * (`handleUseDemo`, `handleSubmit`) are stand-ins that show exactly
 * where your real logic plugs in. Replace the bodies of these two
 * functions with your existing Zustand actions / auth calls -
 * everything else in this file is presentation only.
 */

const ROLES: RoleConfig[] = [
  {
    id: "administrator",
    label: "Administrator",
    description: "Manage the platform",
    icon: <Shield size={22} strokeWidth={1.9} />,
  },
  {
    id: "founder",
    label: "Founder",
    description: "Build your startup",
    icon: <Lightbulb size={22} strokeWidth={1.9} />,
  },
  {
    id: "mentor",
    label: "Mentor",
    description: "Guide founders",
    icon: <Target size={22} strokeWidth={1.9} />,
  },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loadingRole, setLoadingRole] = useState<AuthRole | null>(null);

  // Replace with your existing demo-autofill logic, e.g.
  // const { fillDemoCredentials, login } = useAuthStore();
  const handleUseDemo = async (roleId: AuthRole) => {
    setLoadingRole(roleId);
    // fillDemoCredentials(roleId) -> setEmail/setPassword with demo values
    // await login(...)
    setLoadingRole(null);
  };

  // Replace with your existing submit handler, e.g. useAuthStore().login
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // login({ email, password, rememberMe })
  };

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#05060b] text-white">
      {/* ---------------- SECTION 1: HERO ---------------- */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 pb-28 pt-24 sm:px-6">
        <BackgroundFX variant="top" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <div className="mb-7 inline-flex items-center gap-2.5 motion-safe:animate-fade-up">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-purple-500 to-blue-500 font-display text-base font-bold">
              I
            </div>
            <span className="font-display text-lg font-semibold">Incubix</span>
          </div>

          <h1 className="mb-5 font-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.05] motion-safe:animate-fade-up [animation-delay:100ms]">
            Welcome to Incubix
          </h1>

          <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-slate-400 motion-safe:animate-fade-up [animation-delay:220ms]">
            Empowering founders, mentors and administrators to build, mentor
            and scale innovative startups.
          </p>

          <div className="mx-auto mb-12 grid w-full max-w-5xl auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 motion-safe:animate-fade-up [animation-delay:340ms]">
            <FeatureCard
              icon={<Rocket size={28} strokeWidth={1.8} />}
              title="Startup growth"
              description="Connect startups with real opportunities."
            />
            <FeatureCard
              icon={<Users size={28} strokeWidth={1.8} />}
              title="Expert mentorship"
              description="Collaborate with experienced mentors."
            />
            <FeatureCard
              icon={<BarChart3 size={28} strokeWidth={1.8} />}
              title="Smart dashboard"
              description="Track milestones and incubation programs."
            />
          </div>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("auth-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] bg-gradient-to-br from-purple-500 to-blue-500 px-9 py-3.5 text-[15px] font-semibold leading-none shadow-[0_8px_30px_-8px_rgba(124,92,255,0.5)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-6px_rgba(124,92,255,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 motion-safe:animate-fade-up [animation-delay:460ms]"
          >
            Get started
          </button>
        </div>

        <ScrollCue targetId="auth-section" />
      </section>

      {/* ---------------- SECTION 2: AUTHENTICATION ---------------- */}
      <section
        id="auth-section"
        className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-20 sm:px-6 sm:py-24"
      >
        <BackgroundFX variant="bottom" />

        <GlassCard
          hoverLift={false}
          className="relative z-10 w-full max-w-3xl p-6 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.6)] sm:p-8 lg:p-12 motion-safe:animate-fade-up"
        >
          <div className="mb-8 text-center">
            <h2 className="mb-2 font-display text-2xl font-semibold sm:text-[26px]">
              Sign in to your workspace
            </h2>
            <p className="text-sm text-slate-400">
              Choose your role or continue with email.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
            {ROLES.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                onUseDemo={handleUseDemo}
                isLoading={loadingRole === role.id}
              />
            ))}
          </div>

          <div className="mb-7 flex items-center gap-4 font-mono text-xs text-slate-500">
            <span className="h-px flex-1 bg-white/[0.15]" />
            OR
            <span className="h-px flex-1 bg-white/[0.15]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/[0.15] bg-white/[0.05] px-4 py-[14px] text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-purple-400 focus:bg-white/[0.07] focus:ring-2 focus:ring-purple-400/30"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/[0.15] bg-white/[0.05] px-4 py-[14px] text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-purple-400 focus:bg-white/[0.07] focus:ring-2 focus:ring-purple-400/30"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-1 text-[13px]">
              <label className="flex cursor-pointer items-center gap-2 text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-white/25 bg-transparent accent-purple-500"
                />
                Remember me
              </label>
              <a
                href="/forgot-password"
                className="shrink-0 text-blue-400 transition-colors hover:text-blue-300"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="mt-2 flex min-h-[52px] w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-purple-500 to-blue-500 px-6 text-[15px] font-semibold leading-none shadow-[0_8px_30px_-8px_rgba(124,92,255,0.5)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-6px_rgba(124,92,255,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Sign in
            </button>
          </form>
        </GlassCard>
      </section>
    </main>
  );
}