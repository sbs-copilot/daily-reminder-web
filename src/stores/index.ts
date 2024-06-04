import type {App} from "vue"
// import piniaPersist from 'pinia-plugin-persist-uni'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import * as Pinia from "pinia"

const store = Pinia.createPinia()

export const setupStore = (app: App<Element>) => {
  store.use(piniaPluginPersistedstate)
  app.use(store)


}

export {store, Pinia}
