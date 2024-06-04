const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
let env = {}
if (process.env.NODE_ENV === 'development') {
  env = require('dotenv').config({ path: '.env.development' })
} else {
  env = require('dotenv').config({ path: '.env.production' })
}
const fs = require('fs')
const base64 = require('base64-js')

function imageToBase64(path) {
  const imageData = fs.readFileSync(path)
  const base64Data = base64.fromByteArray(imageData)

  return base64Data
}
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    screens: {
      xsm: [{ min: '375px', max: '750px' }, { min: '375px' }],
      day: { raw: '(prefers-color-scheme: light)' },
      night: { raw: '(prefers-color-scheme: dark)' },
      ...defaultTheme.screens
    },
    extend: {
      animation: {
        blink: 'blink 1.2s infinite steps(1, start)'
      },
      keyframes: {
        blink: {
          '0%, 100%': { 'background-color': 'currentColor' },
          '50%': { 'background-color': 'transparent' }
        }
      }
    },
    fontFamily: {
      regular: ['OpenSans-Regular'],
      blacks: [],
      bold: ['OpenSans-Bold'],
      openSansExtraBold: ['OpenSans-ExtraBold']
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'primary-color': 'var(--u-primary)'
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      'primary-color': 'var(--u-primary)'
    }),
    borderStyles: {
      styles: true, // defaults to false
      colors: true // defaults to false
    }
  },
  plugins: [
    require('./tailwindcss-px-to-rem')(32),
    require('tailwindcss-border-styles')()
    // require('./tailwindcss-bg-to-cdn.cjs').default({
    //   makeStyle: function (imagePath) {
    //     if (env.parsed.NODE_ENV == 'production') {
    //       return {
    //         backgroundImage: `url(${imagePath.replace(
    //           /^src\/static/,
    //           env.parsed.VITE_CDN
    //         )})`
    //       }
    //     } else {
    //       return {
    //         backgroundImage: `url(data:image/png;base64,${imageToBase64(
    //           imagePath
    //         )})`
    //       }
    //     }
    //   }
    // })
    // require("@tailwindcss/container-queries"),
    // require("tailwindcss-border-styles")(),
    // plugin(({ matchVariant }) => {
    //   matchVariant(
    //     "group-status",
    //     (value, { modifier }) =>
    //       modifier
    //         ? `:merge(.group\\/${modifier})[data-status=${value}] &`
    //         : `:merge(.group)[data-status=${value}] &`,
    //     {
    //       values: {
    //         inactive: "inactive",
    //         active: "active",
    //       },
    //     }
    //   );
    // }),
    //  matchVariant("chat-box", (value, {container}) => {
    //   console.log("xxxx==", value)
    //   container.walkRules((rule) => {
    //     rule.walkDecls(declarationsRegex, (decl) => {})
    //   })
    // })
  ],
  corePlugins: {
    preflight: false
  }
}
