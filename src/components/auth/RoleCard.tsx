import type { RoleConfig } from "./types";
import { GlassCard } from "./GlassCard";

interface RoleCardProps {
  role: RoleConfig;
  onUseDemo: (roleId: RoleConfig["id"]) => void;
  isLoading?: boolean;
}

/**
 * Displays a single role (Administrator / Founder / Mentor).
 * "Use demo" calls back to the existing autofill handler — this
 * component owns no auth logic itself, just presentation.
 */
export function RoleCard({ role, onUseDemo, isLoading }: RoleCardProps) {
  return (
    <GlassCard className="flex h-full min-h-[190px] flex-col items-center p-5 text-center sm:p-6">
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.15] bg-gradient-to-br from-purple-500/25 to-blue-500/25 text-xl"
        aria-hidden="true"
      >
        {role.icon}
      </div>
      <p className="mb-1.5 text-sm font-semibold text-white">{role.label}</p>
      <p className="mb-5 flex-1 text-xs leading-relaxed text-slate-400">
        {role.description}
      </p>
      <button
        type="button"
        onClick={() => onUseDemo(role.id)}
        disabled={isLoading}
        aria-label={`Use demo ${role.label} account`}
        className="flex min-h-[42px] w-full items-center justify-center whitespace-nowrap rounded-lg border border-white/[0.15] bg-white/[0.04] px-3 py-2.5 font-mono text-[11px] leading-none tracking-wide text-slate-200 transition-colors hover:bg-white/[0.1] hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Signing in…" : "Use demo"}
      </button>
    </GlassCard>
  );
}
