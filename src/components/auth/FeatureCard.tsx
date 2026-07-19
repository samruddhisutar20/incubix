import type { ReactNode } from "react";
import { GlassCard } from "./GlassCard";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <GlassCard className="flex h-full min-h-[150px] flex-col p-7 text-left">
      <div className="mb-4 text-2xl" aria-hidden="true">
        {icon}
      </div>
      <h3 className="mb-2 text-[15px] font-semibold text-white">{title}</h3>
      <p className="text-[13px] leading-relaxed text-slate-400">{description}</p>
    </GlassCard>
  );
}
