/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-1': 'var(--color-brand--1)',
        'brand-1-hover': 'var(--color-brand--1--hover)',
        'brand-2': 'var(--color-brand--2)',
        'brand-2-hover': 'var(--color-brand--2--hover)',
        'brand-3': 'var(--color-brand--3)',
        'brand-4': 'var(--color-brand--4)',
        'dark-0': 'var(--color-dark--0)',
        'dark-1': 'var(--color-dark--1)',
        'dark-2': 'var(--color-dark--2)',
        'light-1': 'var(--color-light--1)',
        'light-2': 'var(--color-light--2)',
        'light-3': 'var(--color-light--3)',
      },
      fontFamily: {
        'figtree': ['Figtree', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.5rem', // Adaugă dimensiunea personalizată, de exemplu 10px
      },
    },
  },
  variants: {},
  plugins: [],
};
