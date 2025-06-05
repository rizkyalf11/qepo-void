import type { Config } from "tailwindcss";

export default {
 content: {
    files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  },
 theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  plugins: [],
} satisfies Config;