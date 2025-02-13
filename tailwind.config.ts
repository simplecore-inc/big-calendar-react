import animatePlugin from "tailwindcss-animate";

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        manrope: "var(--font-manrope)",
        lexend: "var(--font-lexend)",
        inter: "var(--font-inter)",
      },

      fontSize: {
        xxs: ["0.625rem", "1rem"],
      },

      maxWidth: {
        "8xl": "90rem",
      },

      screens: {
        xs: "460px",
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },

      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        18: "4.5rem",
      },

      colors: {
        ring: "var(--ring)",

        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
          1000: "var(--primary-1000)",
        },

        gray: {
          25: "var(--gray-25)",
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
          950: "var(--gray-950)",
          1000: "var(--gray-1000)",
        },

        error: {
          25: "var(--error-25)",
          50: "var(--error-50)",
          100: "var(--error-100)",
          200: "var(--error-200)",
          300: "var(--error-300)",
          400: "var(--error-400)",
          500: "var(--error-500)",
          600: "var(--error-600)",
          700: "var(--error-700)",
          800: "var(--error-800)",
          900: "var(--error-900)",
          950: "var(--error-950)",
          1000: "var(--error-1000)",
        },

        warning: {
          25: "var(--warning-25)",
          50: "var(--warning-50)",
          100: "var(--warning-100)",
          200: "var(--warning-200)",
          300: "var(--warning-300)",
          400: "var(--warning-400)",
          500: "var(--warning-500)",
          600: "var(--warning-600)",
          700: "var(--warning-700)",
          800: "var(--warning-800)",
          900: "var(--warning-900)",
          950: "var(--warning-950)",
          1000: "var(--warning-1000)",
        },

        success: {
          25: "var(--success-25)",
          50: "var(--success-50)",
          100: "var(--success-100)",
          200: "var(--success-200)",
          300: "var(--success-300)",
          400: "var(--success-400)",
          500: "var(--success-500)",
          600: "var(--success-600)",
          700: "var(--success-700)",
          800: "var(--success-800)",
          900: "var(--success-900)",
          950: "var(--success-950)",
          1000: "var(--success-1000)",
        },

        info: {
          25: "var(--info-25)",
          50: "var(--info-50)",
          100: "var(--info-100)",
          200: "var(--info-200)",
          300: "var(--info-300)",
          400: "var(--info-400)",
          500: "var(--info-500)",
          600: "var(--info-600)",
          700: "var(--info-700)",
          800: "var(--info-800)",
          900: "var(--info-900)",
          950: "var(--info-950)",
          1000: "var(--info-1000)",
        },

        b: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
          tertiary: "var(--border-tertiary)",
        },

        bg: {
          primary: "var(--bg-primary)",
          "primary-hover": "var(--bg-primary-hover)",
          secondary: "var(--bg-secondary)",
          "secondary-hover": "var(--bg-secondary-hover)",
          tertiary: "var(--bg-tertiary)",
          quaternary: "var(--bg-quaternary)",

          active: "var(--bg-active)",
          disabled: "var(--bg-disabled)",
          tooltip: "var(--bg-tooltip)",
        },

        t: {
          "brand-primary": "var(--text-brand-primary)",
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          "secondary-hover": "var(--text-secondary-hover)",
          tertiary: "var(--text-tertiary)",
          "tertiary-hover": "var(--text-tertiary-hover)",
          quaternary: "var(--text-quaternary)",
          quinary: "var(--text-quinary)",

          tooltip: "var(--text-tooltip)",
          disabled: "var(--text-disabled)",
          placeholder: "var(--text-placeholder)",
        },
      },

      borderColor: {
        DEFAULT: "var(--border-secondary)",
      },

      width: {
        104: "26rem",
        108: "27rem",
        112: "28rem",
        128: "32rem",
        144: "36rem",
        148: "37rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
        208: "52rem",
      },

      height: {
        104: "26rem",
        108: "27rem",
        112: "28rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
        208: "52rem",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animatePlugin],
} as const;

export default config;
