import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // Premium Tri-Color Palette
        black: "#0A0A0A",
        white: "#FFFFFF",
        cyan: {
          DEFAULT: "#00E5FF",
          bright: "#66F2FF",
          dark: "#0096B4",
        },
        
        // Surface Hierarchy
        base: "#0A0A0A",
        surface: "#0F0F0F",
        elevated: "#141414",
        card: "#191919",
        
        // Semantic Colors
        success: "#00FFA3",
        danger: "#FF3D71",
        warn: "#FFB800",
        
        // Legacy Compatibility
        accent: {
          DEFAULT: "#00E5FF",
          dim: "#0096B4",
          glow: "rgba(0, 229, 255, 0.15)",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.1)",
          bright: "rgba(255, 255, 255, 0.2)",
        },
        info: "#00E5FF",
        purple: "#9D4EDD",
      },
      
      boxShadow: {
        "cyan-glow": "0 0 20px rgba(0, 229, 255, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)",
        "cyan-strong": "0 0 30px rgba(0, 229, 255, 0.6), 0 0 60px rgba(0, 229, 255, 0.3)",
        "premium": "0 20px 60px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(0, 0, 0, 0.3)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
      
      animation: {
        // Legacy animations
        pulse2: "pulse2 2s ease-in-out infinite",
        spinSlow: "spinSlow 3s linear infinite",
        spinReverse: "spinReverse 3s linear infinite",
        vsPulse: "vsPulse 1.6s ease-in-out infinite",
        slideDown: "slideDown 0.2s ease both",
        popIn: "popIn 0.45s cubic-bezier(.175,.885,.32,1.275) both",
        cardPop: "cardPop 0.45s cubic-bezier(.175,.885,.32,1.275) both",
        fadeIn: "fadeIn 0.3s ease both",
        fightIn: "fightIn 0.4s ease both",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        timerBlink: "timerBlink 1s ease-in-out infinite",
        subIn: "subIn 0.28s ease both",
        subInR: "subInR 0.28s ease both",
        tBounce: "tBounce 1.2s ease-in-out infinite",
        confetti: "confettiFall linear both",
        barFill: "barFill 5s cubic-bezier(.4,0,.2,1) both",
        
        // New Premium animations
        "fade-in": "fadeIn 0.4s ease-out both",
        "fade-in-up": "fadeInUp 0.5s ease-out both",
        "scale-in": "scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
        "slide-up": "slideUp 0.4s ease-out both",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      
      keyframes: {
        // All keyframes defined in index.css
      },
    },
  },
  plugins: [],
} satisfies Config;
