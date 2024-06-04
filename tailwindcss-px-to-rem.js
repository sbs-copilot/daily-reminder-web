const postcss = require("postcss")
const plugin = require("tailwindcss/plugin")
const regex = /(\d+(\.\d+)?)px/g
module.exports = (rootValue) => {
  return plugin.withOptions((data) => {
    return function ({addVariant, addBase, matchVariant}) {
      addVariant("rem", ({container}) => {
        let styles = []

        container.walkRules((rule) => {
          rule.walkDecls((decl) => {
            styles.push({
              value: decl.important ? decl.value + " !important" : decl.value,
              prop: decl.prop
            })
          })
          rule.removeAll()
          styles.forEach((style) => {
            const newStr = style.value.replace(regex, (match, p1) => {
              const newValue = parseInt(p1) / rootValue
              return `${newValue.toFixed(3)}rem`
            })
            rule.prepend(postcss.decl({prop: style.prop, value: `${newStr}`}))
          })
        })
      })
    }
  })
}
