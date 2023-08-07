/** @type {import('tailwindcss').Config} */
function withOpacityValue(variable) {
  return `var(${variable})`;
}
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
