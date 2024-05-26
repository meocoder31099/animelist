/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  // Component @/components/shared/Image.svelte need class object-... class, safelist to make sure it's available.
  safelist: [
    'object-bottom',
    'object-center',
    'object-left',
    'object-left-bottom',
    'object-left-top',
    'object-right',
    'object-right-bottom',
    'object-right-top',
    'object-top'
  ],
  
  theme: {
    extend: {
      width: {
        '100/29': '29%',
        '1/7': '14.3%',
        '1/8': '12%'
      },
      maxWidth: {
        'details': '1524px'
      },
      height:{
        'markdown': 'min(calc(100vh - 20rem), 840px)'
      },
      maxHeight: {
        'markdown': 'min(calc(100vh - 20rem), 840px)'
      },
      colors: {
        'background': {
          DEFAULT: '#000',
          100: '#121212'
        },
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3840px',
      },
      fontSize: {
        .95: ['0.925rem', '1.4']
      }
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
