import { createSSRApp } from 'vue'
// import * as Pinia from 'pinia'
import App from './App.vue'
import uviewPlus from 'uview-plus'
import { setupStore, Pinia } from './stores'
import router from '@/router'

export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  // app.use(Pinia.createPinia())
  setupStore(app)

  uni.$u.setConfig({
    // 修改$u.config对象的属性
    config: {
      // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
      unit: 'rpx'
    },
    // 修改$u.props对象的属性
    props: {
      // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
      radio: {
        size: 15
      },
      textarea: {
        backgroundColor: '#27282F',
        minHeight: '200px'
      }
      // 其他组件属性配置
      // ......
    }
  })
  return {
    app,
    router,
    Pinia
  }
}
