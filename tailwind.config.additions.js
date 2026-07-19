/**
 * Merge this into your existing tailwind.config.js theme.extend block.
 * Nothing here overwrites existing keys — safe to merge as-is.
 */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(30px, -30px) scale(1.06)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        float: "float 18s ease-in-out infinite",
        "fade-up": "fade-up 0.8s ease both",
        bob: "bob 2.2s ease-in-out infinite",
      },
    },
  },
};
