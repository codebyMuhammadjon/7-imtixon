/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /**
       * Custom utility classes that extend Tailwind's default theme.
       * These are added to provide additional styling options for the project.
       */

      // Custom color palette (can be expanded as needed)
      colors: {
        // Primary brand colors
        primary: {
          orange: "#E44B26", // Main brand color for buttons, links, accents
        },
      },

      /**
       * Custom scrollbar utility classes.
       * Provides a way to hide scrollbars while keeping scrolling functionality.
       * Used on elements like product carousels or horizontal lists.
       *
       * Usage: class="scrollbar-hide"
       */
      // Note: scrollbar-hide is handled via CSS in index.css using @layer directive
    },
  },
  plugins: [],
};
