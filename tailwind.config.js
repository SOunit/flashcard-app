module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      DEFAULT: "4px",
      md: "0.375rem",
      lg: "2.5rem",
      full: "9999px",
      large: "12px",
    },
    extend: {
      colors: {
        primary: "#2a9d8f",
        secondary: "#264653",
        neutral: "#e9c46a",
        accent: "#f4a261",
        danger: "#e76f51",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
    plugins: [],
  },
};
