import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        'serif': ['Lora', 'ui-serif', 'system-serif'],
        'sans': ['Barlow', 'ui-sans-serif', 'system-sans-serif']
      }
    }
  },

  plugins: [typography]
};
