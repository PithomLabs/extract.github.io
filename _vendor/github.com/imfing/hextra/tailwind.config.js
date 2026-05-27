const colors = require('tailwindcss/colors')

const makePrimaryColor =
  l =>
    ({ opacityValue }) => {
      let result = "hsl(var(--primary-hue) var(--primary-saturation) ";
        if (l <= 50) {
          // Interpolate between lower values
          result+= `calc(calc(var(--primary-lightness) / 50) * ${l})`;
        }
        else {
          // Interpolate between higher values
          result+= `calc(var(--primary-lightness) + calc(calc(100% - var(--primary-lightness)) / 50) * ${l - 50})`;
        }

      result += (opacityValue ? ` / ${opacityValue})` : ')');
      return result;
    }

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'hx-',
  content: [
    './**/hugo_stats.json',
  ],
  safelist: [
    'max-w-screen-xl',
    'max-w-[90rem]',
    'max-w-full'
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem'
    },
    letterSpacing: {
      tight: '-0.015em'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      gray: colors.gray,
      slate: colors.slate,
      neutral: colors.neutral,
      red: colors.red,
      orange: colors.orange,
      green: colors.green,
      indigo: colors.indigo,
      blue: colors.blue,
      yellow: colors.yellow,
      amber: colors.amber,
      primary: {
        50: makePrimaryColor(97),
        100: makePrimaryColor(94),
        200: makePrimaryColor(86),
        300: makePrimaryColor(77),
        400: makePrimaryColor(66),
        500: makePrimaryColor(50),
        600: makePrimaryColor(45),
        700: makePrimaryColor(39),
        750: makePrimaryColor(35),
        800: makePrimaryColor(32),
        900: makePrimaryColor(24)
      }
    },
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0a0f',
          secondary: '#12121a',
          tertiary: '#1a1a28',
        },
        accent: {
          DEFAULT: '#4fc3f7',
          hover: '#29b6f6',
          glow: 'rgba(79, 195, 247, 0.2)',
        },
        glass: {
          DEFAULT: 'rgba(18, 18, 26, 0.6)',
          header: 'rgba(18, 18, 26, 0.8)',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(79, 195, 247, 0.2)',
        'glow-lg': '0 0 40px rgba(79, 195, 247, 0.3)',
      },
    }
  },
  darkMode: ['class', 'html[class~="dark"]']
};
