/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        surface: {
          0: "#f8fafc",
          1: "#ffffff",
          2: "#f1f5f9",
          3: "#e2e8f0",
          4: "#cbd5e1",
        },
        brand: {
          DEFAULT: "#6366f1",
          dim: "#4f46e5",
          glow: "#818cf8",
        },
        accent: {
          green: "#10b981",
          amber: "#f59e0b",
          red: "#ef4444",
          blue: "#3b82f6",
        },
      },
    },
  },
  plugins: [],
}
