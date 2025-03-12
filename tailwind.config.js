/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  darkMode: "class", // Enable dark mode toggle functionality
  theme: {
    extend: {
      animation: {
        "fade-in-left": "fadeInLeft 1.2s ease-out forwards",
        "fade-in-up": "fadeInUp 1.2s ease-out",
      },

      keyframes: {
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"], // Example font family (optional)
    },
  },
  plugins: [
    require("flowbite/plugin"), // add this line
  ],
};
