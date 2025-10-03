import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px", 
        disabledOpacity: 0.45, 
        fontSize: {
          tiny: "0.875rem",   // 14px - Increased for seniors
          small: "1rem",      // 16px - Increased for seniors
          medium: "1.125rem", // 18px - Increased for seniors
          large: "1.25rem",   // 20px - Increased for seniors
        },
        lineHeight: {
          tiny: "1.25rem", 
          small: "1.5rem", 
          medium: "1.75rem", 
          large: "2rem", 
        },
        radius: {
          small: "8px",  // Slightly rounded corners
          medium: "12px", // More rounded for better visual distinction
          large: "16px",  // Larger radius for main containers
        },
        borderWidth: {
          small: "1px", 
          medium: "2px", // Increased for better visibility
          large: "3px",  // Increased for better visibility
        },
      },
      themes: {
        light: {
          colors: {
            background: {
              DEFAULT: "#F9FAFB" // Soft off-white background
            },
            content1: {
              DEFAULT: "#FFFFFF",
              foreground: "#11181C"
            },
            content2: {
              DEFAULT: "#f4f4f5",
              foreground: "#27272a"
            },
            content3: {
              DEFAULT: "#e4e4e7",
              foreground: "#3f3f46"
            },
            content4: {
              DEFAULT: "#d4d4d8",
              foreground: "#52525b"
            },
            divider: {
              DEFAULT: "rgba(17, 17, 17, 0.15)"
            },
            focus: {
              DEFAULT: "#4F46E5" // Indigo for focus states
            },
            foreground: {
              50: "#fafafa",
              100: "#f4f4f5",
              200: "#e4e4e7",
              300: "#d4d4d8",
              400: "#a1a1aa",
              500: "#71717a",
              600: "#52525b",
              700: "#3f3f46",
              800: "#27272a",
              900: "#18181b",
              DEFAULT: "#11181C"
            },
            overlay: {
              DEFAULT: "#000000"
            },
            danger: {
              50: "#fee7ef",
              100: "#fdd0df",
              200: "#faa0bf",
              300: "#f871a0",
              400: "#f54180",
              500: "#f31260",
              600: "#c20e4d",
              700: "#920b3a",
              800: "#610726",
              900: "#310413",
              DEFAULT: "#f31260",
              foreground: "#ffffff"
            },
            default: {
              50: "#fafafa",
              100: "#f4f4f5",
              200: "#e4e4e7",
              300: "#d4d4d8",
              400: "#a1a1aa",
              500: "#71717a",
              600: "#52525b",
              700: "#3f3f46",
              800: "#27272a",
              900: "#18181b",
              DEFAULT: "#d4d4d8",
              foreground: "#000"
            },
            primary: {
              50: "#eef2ff",
              100: "#e0e7ff",
              200: "#c7d2fe",
              300: "#a5b4fc",
              400: "#818cf8",
              500: "#6366f1",
              600: "#4f46e5", // Indigo as primary color - calming and trustworthy
              700: "#4338ca",
              800: "#3730a3",
              900: "#312e81",
              DEFAULT: "#4f46e5",
              foreground: "#fff"
            },
            secondary: {
              50: "#f0fdfa",
              100: "#ccfbf1",
              200: "#99f6e4",
              300: "#5eead4",
              400: "#2dd4bf",
              500: "#14b8a6", // Teal as secondary color - calming and reassuring
              600: "#0d9488",
              700: "#0f766e",
              800: "#115e59",
              900: "#134e4a",
              DEFAULT: "#14b8a6",
              foreground: "#fff"
            },
            success: {
              50: "#e8faf0",
              100: "#d1f4e0",
              200: "#a2e9c1",
              300: "#74dfa2",
              400: "#45d483",
              500: "#17c964",
              600: "#12a150",
              700: "#0e793c",
              800: "#095028",
              900: "#052814",
              DEFAULT: "#17c964",
              foreground: "#000"
            },
            warning: {
              50: "#fefce8",
              100: "#fdedd3",
              200: "#fbdba7",
              300: "#f9c97c",
              400: "#f7b750",
              500: "#f5a524",
              600: "#c4841d",
              700: "#936316",
              800: "#62420e",
              900: "#312107",
              DEFAULT: "#f5a524",
              foreground: "#000"
            }
          }
        },
        dark: {
          colors: {
            background: {
              DEFAULT: "#121212" // Softer dark background
            },
            content1: {
              DEFAULT: "#1E1E1E", // Softer dark content
              foreground: "#ECEDEE"
            },
            content2: {
              DEFAULT: "#2D2D2D",
              foreground: "#ECEDEE"
            },
            content3: {
              DEFAULT: "#3D3D3D",
              foreground: "#ECEDEE"
            },
            content4: {
              DEFAULT: "#4D4D4D",
              foreground: "#ECEDEE"
            },
            divider: {
              DEFAULT: "rgba(255, 255, 255, 0.15)"
            },
            focus: {
              DEFAULT: "#818cf8" // Lighter indigo for focus states in dark mode
            },
            foreground: {
              50: "#18181b",
              100: "#27272a",
              200: "#3f3f46",
              300: "#52525b",
              400: "#71717a",
              500: "#a1a1aa",
              600: "#d4d4d8",
              700: "#e4e4e7",
              800: "#f4f4f5",
              900: "#fafafa",
              DEFAULT: "#ECEDEE"
            },
            overlay: {
              DEFAULT: "#000000"
            },
            danger: {
              50: "#310413",
              100: "#610726",
              200: "#920b3a",
              300: "#c20e4d",
              400: "#f31260",
              500: "#f54180",
              600: "#f871a0",
              700: "#faa0bf",
              800: "#fdd0df",
              900: "#fee7ef",
              DEFAULT: "#f31260",
              foreground: "#ffffff"
            },
            default: {
              50: "#18181b",
              100: "#27272a",
              200: "#3f3f46",
              300: "#52525b",
              400: "#71717a",
              500: "#a1a1aa",
              600: "#d4d4d8",
              700: "#e4e4e7",
              800: "#f4f4f5",
              900: "#fafafa",
              DEFAULT: "#3f3f46",
              foreground: "#fff"
            },
            primary: {
              50: "#312e81",
              100: "#3730a3",
              200: "#4338ca",
              300: "#4f46e5",
              400: "#6366f1",
              500: "#818cf8",
              600: "#a5b4fc",
              700: "#c7d2fe",
              800: "#e0e7ff",
              900: "#eef2ff",
              DEFAULT: "#818cf8", // Lighter indigo for dark mode
              foreground: "#000"
            },
            secondary: {
              50: "#134e4a",
              100: "#115e59",
              200: "#0f766e",
              300: "#0d9488",
              400: "#14b8a6",
              500: "#2dd4bf",
              600: "#5eead4",
              700: "#99f6e4",
              800: "#ccfbf1",
              900: "#f0fdfa",
              DEFAULT: "#2dd4bf", // Lighter teal for dark mode
              foreground: "#000"
            },
            success: {
              50: "#052814",
              100: "#095028",
              200: "#0e793c",
              300: "#12a150",
              400: "#17c964",
              500: "#45d483",
              600: "#74dfa2",
              700: "#a2e9c1",
              800: "#d1f4e0",
              900: "#e8faf0",
              DEFAULT: "#17c964",
              foreground: "#000"
            },
            warning: {
              50: "#312107",
              100: "#62420e",
              200: "#936316",
              300: "#c4841d",
              400: "#f5a524",
              500: "#f7b750",
              600: "#f9c97c",
              700: "#fbdba7",
              800: "#fdedd3",
              900: "#fefce8",
              DEFAULT: "#f5a524",
              foreground: "#000"
            }
          }
        }
      }
    })
  ]
}
