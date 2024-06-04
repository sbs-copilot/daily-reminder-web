import plugin from 'tailwindcss/plugin'
import { GlobOptions, globSync } from 'glob'
import { CSSRuleObject } from 'tailwindcss/types/config'

export default function makePlugin({
  globOptionsByPattern = {
    './src/**/*.@(jpg|jpeg|png|gif|svg|webp)': { dot: true }
  },
  makeStyle = function (imagePath) {
    return { backgroundImage: `url('${imagePath}')` }
  },
  makeUtilityWithExtension = function (imagePath) {
    return imagePath.replace(/^src/, '')
  },
  makeUtilityWithoutExtension = function (imagePath) {
    return imagePath.replace(/^src|\.\w+$/g, '')
  },
  utilityPrefix = 'bg-'
} = {}) {
  return plugin(function ({ addUtilities, e }) {
    Object.entries(globOptionsByPattern).forEach(([pattern, globOptions]) => {
      const imagePaths = globSync(pattern, globOptions)
      // console.log('globOptionsByPattern==', imagePaths)
      const utilities = imagePaths.flatMap((imagePath) => {
        const style = typeof imagePath == 'string' && makeStyle?.(imagePath)

        if (style) {
          const withExtension =
            makeUtilityWithExtension && makeUtilityWithExtension?.(imagePath)
          const withoutExtension =
            makeUtilityWithoutExtension &&
            makeUtilityWithoutExtension?.(imagePath)
          // console.log(
          //   'xxxxxx',
          // filterBoolean([withExtension, withoutExtension]).map((utility) => {
          //   // console.log([`.${utilityPrefix || ''}${e(utility)}`, style])
          //   // console.log([`.${utilityPrefix || ''}${e(utility)}`, style])
          //   return [`.${utilityPrefix || ''}${e(utility)}`, style]
          // })
          // )
          return filterBoolean([withExtension, withoutExtension]).map(
            (utility) => [`.${utilityPrefix || ''}${e(utility)}`, style]
          )
        } else {
          return []
        }
      })
      // 两层数组
      const unit = utilities.reduce((acc, [key, value]) => {
        // console.log('xxxxx', value)
        return Object.assign(acc, { [key]: value })
      }, {})
      addUtilities(unit)
    })
  })
}

function filterBoolean(arr) {
  return arr.filter(Boolean)
}
