/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ['Merriweather', 'serif']
      },
      colors: {
        midnight: '#003C5A',
        lionsmane: '#FCF3E5',
        celeste: '#BDD4CE',
        herb: '#718C69',
        marigold: '#F4A258'
      }
    }
  },
  plugins: []
}
