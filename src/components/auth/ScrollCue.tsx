interface ScrollCueProps {
  targetId: string;
}

export function ScrollCue({ targetId }: ScrollCueProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to sign in"
      className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-400 transition-colors hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 motion-safe:animate-bob"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
        Scroll
      </span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </button>
  );
}
