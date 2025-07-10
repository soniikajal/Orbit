module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      transitionDuration: {
        '1500': '1500ms',
        '1800': '1800ms',
        '2000': '2000ms',
        '2200': '2200ms',
        '2800': '2800ms',
        '3500': '3500ms',
      },
      transitionDelay: {
        '300': '300ms',
        '800': '800ms',
        '1200': '1200ms',
        '2000': '2000ms',
        '2200': '2200ms',
        '3500': '3500ms',
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      colors: {
        global: {
          background1: "var(--global-bg-1)",
          background2: "var(--global-bg-2)",
          background3: "var(--global-bg-3)",
          background4: "var(--global-bg-4)",
          background5: "var(--global-bg-5)",
          background6: "var(--global-bg-6)",
          text1: "var(--global-text-1)",
          text2: "var(--global-text-2)",
          text3: "var(--global-text-3)",
          text4: "var(--global-text-4)",
          text5: "var(--global-text-5)"
        },
        header: {
          background1: "var(--header-bg-1)"
        },
        edittext: {
          text1: "var(--edittext-text-1)"
        }
      }
    }
  },
  plugins: []
};