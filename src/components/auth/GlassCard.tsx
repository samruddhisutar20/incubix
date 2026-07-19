import type { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverLift?: boolean;
}

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Base frosted-glass surface. Kept intentionally subtle: soft blur,
 * thin translucent border, no heavy glow. Used for feature cards,
 * role cards, and the main sign-in panel.
 */
export function GlassCard({
  children,
  hoverLift = true,
  className,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cx(
        "min-w-0 rounded-2xl border border-white/[0.15] bg-white/[0.08] backdrop-blur-xl backdrop-saturate-150",
        "transition-all duration-300",
        hoverLift &&
          "hover:bg-white/[0.12] hover:border-white/25 hover:-translate-y-0.5",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
